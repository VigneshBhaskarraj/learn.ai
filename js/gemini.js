// Career consult inference: binds the questionnaire answers + role catalog into
// ONE Gemini API call with a strict JSON response schema.
// Zero dependencies. Timeout + single retry on transient failures. Typed errors
// so the UI can speak human.

import { careerQuestions, roleCatalog } from './data/careers.js';

export const GEMINI_MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const TIMEOUT_MS = 45000;

export class CareerConsultError extends Error {
  constructor(kind, message) {
    super(message);
    this.kind = kind; // 'key' | 'rate' | 'network' | 'response'
  }
}

const label = (list, id) => list.find((o) => o.id === id)?.label || id;

// ---- prompt: every answer bound in, catalog as grounding, persona/projects as link targets ----
export function buildCareerPrompt(answers) {
  const resp = (answers.responsibilities || []).map((id) => label(careerQuestions.responsibilities, id));
  const joys = (answers.enjoys || []).map((id) => label(careerQuestions.enjoys, id));

  const catalog = roleCatalog
    .map(
      (r) =>
        `- ${r.title} [track:${r.track}] [projects:${r.projects.join(',')}]\n  What: ${r.tagline}\n  Demand: ${r.demand}\n  Core skills: ${r.coreSkills.join('; ')}\n  Natural entry from: ${r.naturalFrom}`
    )
    .join('\n');

  return `You are a pragmatic, honest career advisor for consulting and IT professionals navigating the AI era. You combine the realism of Andrej Karpathy (build to understand, no hype), Andrew Ng (foundations + projects + habit) and Ethan Mollick (learn AI through use). You never inflate fit scores and you never invent demand that does not exist.

THE PERSON
- Current role (their own words): ${answers.currentRole || 'not stated'}
- Years of experience: ${label(careerQuestions.experience, answers.experience)}
- Day-to-day responsibilities: ${resp.join('; ') || 'not stated'}${answers.responsibilitiesOther ? '; Also: ' + answers.responsibilitiesOther : ''}
- Technical comfort: ${label(careerQuestions.techComfort, answers.techComfort)}
- What they enjoy most: ${joys.join('; ') || 'not stated'}
- Industry / domain: ${answers.domain || 'not stated'}
- Desired direction: ${label(careerQuestions.direction, answers.direction)}

ROLE CATALOG (well-understood AI-era roles in consulting/IT; ground your recommendations here — you may adapt a title or, at most once, go outside the catalog if the person's profile truly demands it)
${catalog}

TASK
Recommend exactly 3 AI-era roles this person can realistically pivot to, ordered by fit. For each role:
1. fitScore (0-100): honest, evidence-based. Reserve 85+ for near-direct overlaps. If their profile is a stretch, score it like it is.
2. whyYouFit: 3-4 bullets that reference THEIR specific responsibilities and current role by name — make them feel seen, not template-matched.
3. transferableSkills: concrete skills they ALREADY have that this role needs (from their answers, including their current role's domain knowledge).
4. gaps: the honest list of what they must build, most important first.
5. first90Days: 4-6 concrete preparation steps, ordered. Practical: what to learn, what to build, what to volunteer for at work, what to show whom. Where relevant, point at their learn.ai persona track and projects.
6. readinessSignals: 3 observable signs they are ready to apply/move (things a person can verify about themselves, not feelings).
7. suggestedTrack: the learn.ai track id that best prepares them — one of: po, dev, ba, qa, lead. Use the catalog's [track:] hints.
8. suggestedProjects: 1-2 learn.ai project ids from: p1..p6. Use the catalog's [projects:] hints.

Also produce:
- summary: 3-4 sentences addressed to the person ("you"), connecting their current work to the AI era: what is genuinely changing about their role, why their experience still matters, and the single most important move to make first. Specific to them, zero platitudes.
- honestNote: one candid sentence about the biggest risk or misconception this specific person should watch out for in their pivot.

Tone: direct, warm, concrete. No corporate filler. British or US spelling both fine.`;
}

// ---- strict response schema (Gemini structured output) ----
const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    summary: { type: 'STRING' },
    roles: {
      type: 'ARRAY',
      minItems: 3,
      maxItems: 3,
      items: {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          fitScore: { type: 'INTEGER' },
          tagline: { type: 'STRING' },
          whyYouFit: { type: 'ARRAY', items: { type: 'STRING' } },
          transferableSkills: { type: 'ARRAY', items: { type: 'STRING' } },
          gaps: { type: 'ARRAY', items: { type: 'STRING' } },
          first90Days: { type: 'ARRAY', items: { type: 'STRING' } },
          readinessSignals: { type: 'ARRAY', items: { type: 'STRING' } },
          suggestedTrack: { type: 'STRING' },
          suggestedProjects: { type: 'ARRAY', items: { type: 'STRING' } },
        },
        required: ['title', 'fitScore', 'tagline', 'whyYouFit', 'transferableSkills', 'gaps', 'first90Days', 'readinessSignals', 'suggestedTrack', 'suggestedProjects'],
      },
    },
    honestNote: { type: 'STRING' },
  },
  required: ['summary', 'roles', 'honestNote'],
};

export function validateCareerResult(r) {
  if (!r || typeof r.summary !== 'string' || !Array.isArray(r.roles) || r.roles.length < 3 || typeof r.honestNote !== 'string') return false;
  return r.roles.slice(0, 3).every(
    (role) =>
      typeof role.title === 'string' &&
      Number.isFinite(role.fitScore) &&
      ['whyYouFit', 'transferableSkills', 'gaps', 'first90Days', 'readinessSignals'].every((k) => Array.isArray(role[k]) && role[k].length > 0)
  );
}

function normalize(r) {
  const validTracks = new Set(['po', 'dev', 'ba', 'qa', 'lead']);
  const validProjects = new Set(['p1', 'p2', 'p3', 'p4', 'p5', 'p6']);
  r.roles = r.roles.slice(0, 3).map((role) => ({
    ...role,
    fitScore: Math.max(0, Math.min(100, Math.round(role.fitScore))),
    suggestedTrack: validTracks.has(role.suggestedTrack) ? role.suggestedTrack : null,
    suggestedProjects: (role.suggestedProjects || []).filter((p) => validProjects.has(p)).slice(0, 2),
  }));
  return r;
}

async function callOnce(key, prompt, signal) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 8192,
        // 2.5-class models think by default and thought tokens eat the output
        // budget — structured extraction task, thinking off.
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    }),
  });

  if (res.status === 400 || res.status === 401 || res.status === 403) {
    throw new CareerConsultError('key', 'Gemini rejected the API key. Double-check it (and that the Generative Language API is enabled for it).');
  }
  if (res.status === 429) {
    throw new CareerConsultError('rate', 'Gemini rate limit reached. The free tier allows a few requests per minute — wait a moment and try again.');
  }
  if (!res.ok) {
    throw new CareerConsultError('network', `Gemini returned HTTP ${res.status}. Usually transient — try again.`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') || '';
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new CareerConsultError('response', 'Gemini returned malformed JSON.');
  }
  if (!validateCareerResult(parsed)) {
    throw new CareerConsultError('response', 'Gemini response did not match the expected shape.');
  }
  return normalize(parsed);
}

// The ONE call (with a single automatic retry on transient failures only).
export async function consultCareer(answers, key) {
  if (!key) throw new CareerConsultError('key', 'No API key provided.');
  const prompt = buildCareerPrompt(answers);

  for (let attempt = 0; attempt < 2; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      return await callOnce(key, prompt, ctrl.signal);
    } catch (err) {
      const e = err.name === 'AbortError' ? new CareerConsultError('network', 'The request timed out.') : err;
      const retriable = e instanceof CareerConsultError && (e.kind === 'network' || e.kind === 'response');
      if (attempt === 0 && retriable) continue;
      throw e instanceof CareerConsultError ? e : new CareerConsultError('network', 'Could not reach Gemini. Check your connection.');
    } finally {
      clearTimeout(timer);
    }
  }
}

// Platform-provided inference: POST the structured answers to the Supabase
// Edge Function, which holds the Gemini key server-side and builds the
// prompt itself (see supabase/functions/career-consult/index.ts).
export async function consultCareerViaProxy(answers, proxyUrl) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(proxyUrl, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });
    if (res.status === 429) throw new CareerConsultError('rate', 'The platform AI is at capacity right now — try again in a few minutes, or use your own key.');
    if (!res.ok) throw new CareerConsultError('network', 'The platform AI service had a hiccup — try again, or use your own key.');
    const parsed = await res.json();
    if (!validateCareerResult(parsed)) throw new CareerConsultError('response', 'The platform AI returned an unexpected response.');
    return normalize(parsed);
  } catch (err) {
    if (err instanceof CareerConsultError) throw err;
    if (err.name === 'AbortError') throw new CareerConsultError('network', 'The request timed out.');
    throw new CareerConsultError('network', 'Could not reach the platform AI service. Check your connection.');
  } finally {
    clearTimeout(timer);
  }
}
