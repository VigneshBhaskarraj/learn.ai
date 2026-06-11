// Supabase Edge Function: career-consult
// Holds the Gemini API key server-side so the static GitHub Pages app never sees it.
//
// Deploy:
//   supabase functions deploy career-consult --no-verify-jwt
//   supabase secrets set GEMINI_API_KEY=<your key>
//   supabase secrets set ALLOWED_ORIGINS=https://<you>.github.io   (optional, comma-separated)
//
// Abuse resistance:
//   - The client sends STRUCTURED ANSWERS, never a raw prompt. The prompt is
//     built here, so the function cannot be used as a generic Gemini proxy.
//   - All inputs are validated against whitelists and length caps.
//   - Origin allowlist + best-effort per-IP rate limit (10/hour per instance).
//
// NOTE: the prompt builder and role catalog mirror js/gemini.js and
// js/data/careers.js in the web app. If you change one, change both.

const GEMINI_MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const DEFAULT_ORIGINS = [
  'https://vigneshbhaskarraj.github.io',
  'http://localhost:8123',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
];

// ---- questionnaire vocabulary (ids -> labels), mirrors js/data/careers.js ----
const VOCAB = {
  responsibilities: {
    automation: 'Building automations / integrations (RPA, workflows, scripts)',
    coding: 'Writing application code',
    people: 'Managing people / resources',
    delivery: 'Managing projects / delivery',
    requirements: 'Gathering requirements & writing specs',
    process: 'Analyzing business processes',
    data: 'Analyzing data / reporting',
    testing: 'Testing & quality assurance',
    advisory: 'Advising clients / stakeholders',
    architecture: 'Designing solutions / architecture',
    operations: 'Running operations / support',
  },
  enjoys: {
    building: 'Building things that work',
    leading: 'Leading and growing people',
    advising: 'Advising and influencing decisions',
    analyzing: 'Analyzing problems and data',
    quality: 'Making things reliable and correct',
    designing: 'Designing systems end-to-end',
    teaching: 'Explaining and enabling others',
  },
  experience: { '0-3': '0–3 years', '4-8': '4–8 years', '9-15': '9–15 years', '15+': '15+ years' },
  techComfort: {
    none: 'Not technical',
    lowcode: 'Low-code / tools (RPA studios, Power Platform, configuration)',
    scripting: 'Scripting (Python/JS basics, SQL, APIs)',
    engineer: 'Professional developer',
  },
  direction: {
    technical: 'Stay hands-on technical',
    architecture: 'Toward architecture',
    leadership: 'Toward leadership',
    advisory: 'Toward advisory',
    open: 'Open to anything',
  },
};

const CATALOG = `- Agentic Automation Engineer [track:dev] [projects:p4,p5]
  What: Evolve deterministic automation (RPA/workflows) into AI agents that handle the unstructured 80%.
  Demand: Very high — every RPA estate is being upgraded with LLM intelligence.
  Core skills: LLM APIs & prompting; agent loops & tool calling; workflow vs agent judgment; guardrails & human-in-the-loop; evals
  Natural entry from: RPA developers, workflow/integration developers, low-code builders
- AI Engineer (LLM Applications) [track:dev] [projects:p4,p5]
  What: Build production features on top of models: RAG, structured outputs, agents, evals as CI.
  Demand: Very high — the defining engineering role of the decade.
  Core skills: LLM API engineering; RAG architecture; prompts as code; evals & observability; cost/latency optimization
  Natural entry from: Software developers, integration engineers
- AI Solution Architect [track:dev] [projects:p3,p4]
  What: Design end-to-end AI solutions: model selection, RAG/agent architecture, integration, governance.
  Demand: High and rising — enterprises need people who can see the whole board.
  Core skills: AI capability mapping; architecture patterns (RAG, agents, MCP); vendor strategy; security incl. prompt injection; governance design
  Natural entry from: Solution architects, senior automation leads, technical team leads
- AI Product Owner / AI PM [track:po] [projects:p3,p5]
  What: Own AI features end-to-end: feasibility, eval-based acceptance criteria, trust UX, token economics.
  Demand: High — every product team adding AI needs an owner who understands probabilistic features.
  Core skills: AI use-case feasibility; evals as acceptance criteria; failure-path design; AI UX; cost-per-use economics
  Natural entry from: Product owners, BAs close to product
- AI Business Analyst / AI Consultant [track:ba] [projects:p2,p6]
  What: Mine processes for AI opportunities, redesign workflows with humans in the loop, build honest business cases.
  Demand: High — clients ask "where should we use AI?" daily.
  Core skills: task-level opportunity mining; workflow redesign; honest ROI math; vendor diligence; data readiness & governance
  Natural entry from: Business analysts, process consultants, RPA process analysts
- Eval & AI Quality Engineer [track:qa] [projects:p5,p4]
  What: Own the measurement of AI systems: golden datasets, rubrics, LLM-judges, red-teaming.
  Demand: Exploding with almost no incumbents.
  Core skills: golden set & rubric design; LLM-judge calibration; red-teaming; statistical thinking; regression discipline
  Natural entry from: QA engineers, test leads
- AI Delivery Lead / AI Program Manager [track:lead] [projects:p2,p6]
  What: Run AI portfolios with discipline: pilot contracts, wave sequencing, honest economics, adoption.
  Demand: High — 40% of AI projects fail on execution, not capability.
  Core skills: pilot & portfolio discipline; AI economics; adoption psychology; enabling governance; vendor strategy
  Natural entry from: Delivery managers, RPA CoE managers, team leads
- AI Governance & Risk Specialist [track:lead] [projects:p6,p2]
  What: Make AI adoption safe and compliant: policy, risk-tier intake, audit trails, EU AI Act readiness.
  Demand: Growing fast — regulation is tightening.
  Core skills: risk-tier frameworks; policy & intake design; human-oversight standards; incident paths; audit
  Natural entry from: Compliance-minded BAs, QA leads, delivery managers in regulated industries
- Data & AI Analyst [track:ba] [projects:p1,p2]
  What: Use AI to supercharge analysis — and analyze AI itself: adoption metrics, eval dashboards, baselines.
  Demand: Solid — every AI program needs someone who measures honestly.
  Core skills: AI-assisted analysis; prompting for data work; measurement design; storytelling with evidence
  Natural entry from: Data analysts, reporting specialists, operations analysts`;

// ---- validation ----
function sanitize(raw: unknown) {
  if (typeof raw !== 'object' || raw === null) return null;
  const a = raw as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.slice(0, max).trim() : '');
  const pick = (v: unknown, table: Record<string, string>) => (typeof v === 'string' && v in table ? v : null);
  const pickMany = (v: unknown, table: Record<string, string>, max: number) =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x in table).slice(0, max) : [];

  const answers = {
    currentRole: str(a.currentRole, 120),
    experience: pick(a.experience, VOCAB.experience),
    responsibilities: pickMany(a.responsibilities, VOCAB.responsibilities, 11),
    responsibilitiesOther: str(a.responsibilitiesOther, 160),
    techComfort: pick(a.techComfort, VOCAB.techComfort),
    enjoys: pickMany(a.enjoys, VOCAB.enjoys, 3),
    domain: str(a.domain, 80),
    direction: pick(a.direction, VOCAB.direction),
  };
  if (!answers.currentRole || !answers.experience || !answers.techComfort || !answers.direction) return null;
  if (answers.responsibilities.length === 0 || answers.enjoys.length === 0) return null;
  return answers;
}

function buildPrompt(answers: NonNullable<ReturnType<typeof sanitize>>) {
  const resp = answers.responsibilities.map((id) => VOCAB.responsibilities[id as keyof typeof VOCAB.responsibilities]);
  const joys = answers.enjoys.map((id) => VOCAB.enjoys[id as keyof typeof VOCAB.enjoys]);

  return `You are a pragmatic, honest career advisor for consulting and IT professionals navigating the AI era. You combine the realism of Andrej Karpathy (build to understand, no hype), Andrew Ng (foundations + projects + habit) and Ethan Mollick (learn AI through use). You never inflate fit scores and you never invent demand that does not exist.

THE PERSON
- Current role (their own words): ${answers.currentRole}
- Years of experience: ${VOCAB.experience[answers.experience as keyof typeof VOCAB.experience]}
- Day-to-day responsibilities: ${resp.join('; ')}${answers.responsibilitiesOther ? '; Also: ' + answers.responsibilitiesOther : ''}
- Technical comfort: ${VOCAB.techComfort[answers.techComfort as keyof typeof VOCAB.techComfort]}
- What they enjoy most: ${joys.join('; ')}
- Industry / domain: ${answers.domain || 'not stated'}
- Desired direction: ${VOCAB.direction[answers.direction as keyof typeof VOCAB.direction]}

ROLE CATALOG (well-understood AI-era roles in consulting/IT; ground your recommendations here — you may adapt a title or, at most once, go outside the catalog if the person's profile truly demands it)
${CATALOG}

TASK
Recommend exactly 3 AI-era roles this person can realistically pivot to, ordered by fit. For each role:
1. fitScore (0-100): honest, evidence-based. Reserve 85+ for near-direct overlaps.
2. whyYouFit: 3-4 bullets that reference THEIR specific responsibilities and current role by name.
3. transferableSkills: concrete skills they ALREADY have that this role needs.
4. gaps: the honest list of what they must build, most important first.
5. first90Days: 4-6 concrete preparation steps, ordered. Where relevant, point at their learn.ai persona track and projects.
6. readinessSignals: 3 observable signs they are ready to move.
7. suggestedTrack: one of: po, dev, ba, qa, lead (use the catalog's [track:] hints).
8. suggestedProjects: 1-2 ids from p1..p6 (use the catalog's [projects:] hints).

Also produce:
- summary: 3-4 sentences addressed to the person ("you"), connecting their current work to the AI era. Specific to them, zero platitudes.
- honestNote: one candid sentence about the biggest risk or misconception this specific person should watch for.

BREVITY (important): every bullet under 15 words; each first90Days step under 18 words; summary exactly 3 sentences; tagline under 12 words. Dense and specific beats long.

Tone: direct, warm, concrete. No corporate filler.`;
}

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

// ---- best-effort per-instance rate limit ----
const RATE_LIMIT = 10; // requests per window per IP
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  h.count += 1;
  return h.count > RATE_LIMIT;
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = (Deno.env.get('ALLOWED_ORIGINS')?.split(',').map((s) => s.trim()).filter(Boolean)) || DEFAULT_ORIGINS;
  const ok = origin && (allowed.includes('*') || allowed.includes(origin));
  return {
    'Access-Control-Allow-Origin': ok ? origin! : allowed[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Content-Type': 'application/json',
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = corsHeaders(origin);

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Rate limit reached — try again in a while.' }), { status: 429, headers });
  }

  const key = Deno.env.get('GEMINI_API_KEY');
  if (!key) return new Response(JSON.stringify({ error: 'Server not configured.' }), { status: 500, headers });

  let answers;
  try {
    answers = sanitize(await req.json());
  } catch {
    answers = null;
  }
  if (!answers) return new Response(JSON.stringify({ error: 'Invalid answers payload.' }), { status: 400, headers });

  const upstream = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: buildPrompt(answers) }] }],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 8192,
        // 2.5-class models think by default and thought tokens eat the output
        // budget — this is a structured extraction task, thinking off.
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    }),
  });

  if (upstream.status === 429) {
    return new Response(JSON.stringify({ error: 'The AI service is at capacity — try again shortly.' }), { status: 429, headers });
  }
  if (!upstream.ok) {
    return new Response(JSON.stringify({ error: 'AI service error.' }), { status: 502, headers });
  }

  const data = await upstream.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') || '';
  try {
    const result = JSON.parse(text);
    return new Response(JSON.stringify(result), { status: 200, headers });
  } catch {
    return new Response(JSON.stringify({ error: 'AI returned a malformed response.' }), { status: 502, headers });
  }
});
