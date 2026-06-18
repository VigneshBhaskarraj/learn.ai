// Career Consult — "Where do YOU fit in the AI era?"
// Questionnaire → one Gemini call (or offline estimate) → 3 tailored pivot roles.
import { careerQuestions, localCareerEstimate } from './data/careers.js';
import { trackById, projectById, personaLabel } from './data/index.js';
import { getState, setGeminiKey, setCareerResult, clearCareerResult, setProfile } from './storage.js';
import { consultCareer, consultCareerViaProxy, CareerConsultError } from './gemini.js';
import { consultProxyUrl } from './config.js';

// Draft answers live in memory while the form is open.
const draft = {
  currentRole: '',
  experience: null,
  responsibilities: [],
  responsibilitiesOther: '',
  techComfort: null,
  enjoys: [],
  domain: '',
  direction: null,
};
let formOpen = false;
let busy = false;

const draftReady = () =>
  draft.currentRole.trim() && draft.experience && draft.responsibilities.length > 0 && draft.techComfort && draft.enjoys.length > 0 && draft.direction;

// ctx is provided by app.js: { shell, esc, toast, go, rerender }
export function viewCareer(ctx) {
  const st = getState();
  if (busy) return renderLoading(ctx);
  if (formOpen) return renderForm(ctx);
  if (st.career?.result) return renderResult(ctx, st.career);
  return renderIntro(ctx);
}

// ---------- intro ----------
function renderIntro(ctx) {
  const { shell } = ctx;
  shell('career', `
    <div class="career-hero">
      <div class="career-hero-emoji">🧭</div>
      <h1 class="page-title">Where do <span class="grad">you</span> fit in the AI era?</h1>
      <p class="page-sub">Roles are shifting — but careers are not disappearing, they are pivoting. Answer a few questions about what you actually do today, and get <strong>three realistic AI-era roles</strong> you can grow into: why you fit, what is transferable, the honest gaps, and a 90-day preparation plan wired into your learning path here.</p>
    </div>
    <div class="card">
      <h3>How it works</h3>
      <ul class="ob-points">
        <li>📝 <strong>5-minute questionnaire</strong> — your role, responsibilities, strengths and direction</li>
        <li>✨ <strong>One AI inference</strong> — your answers are analyzed by learn.ai's secure AI service (no setup needed) or a built-in offline estimator</li>
        <li>🎯 <strong>3 tailored roles</strong> — fit scores, transferable skills, gaps, 90-day plan, readiness signals</li>
        <li>🌿 <strong>Wired into your tree</strong> — each role links to the track and projects here that prepare you for it</li>
      </ul>
      <button class="btn btn-primary btn-big" id="career-start">Start my career consult</button>
      <p class="fineprint">Your answers stay on this device. If you use Gemini, they are sent only to Google's API with your own key.</p>
    </div>
    <div class="card">
      <h3>Why this matters now</h3>
      <p class="hint">AI absorbs the routine layer of roles, not the roles themselves — but that means the <em>shape</em> of roles is changing. An RPA developer becomes an agentic automation engineer. A QA lead becomes an eval engineer. The people who pivot early carry their domain knowledge with them — and that combination is exactly what the market pays for.</p>
    </div>
  `);
  document.getElementById('career-start').addEventListener('click', () => {
    const profile = getState().profile;
    // Prefill the role from their onboarding choice (incl. second hat) so
    // hybrid leaders don't have to retype — fully editable.
    if (!draft.currentRole.trim() && profile) {
      const primary = personaLabel(profile.persona);
      const hat = profile.persona2 || profile.persona2Custom ? personaLabel(profile.persona2, profile.persona2Custom) : '';
      draft.currentRole = hat ? `${primary} — also ${hat}` : primary;
    }
    formOpen = true;
    ctx.rerender();
  });
}

// ---------- questionnaire ----------
function chipset(name, options, selected, multi) {
  return `<div class="chips select-chips" data-chipset="${name}">
    ${options.map((o) => `<button type="button" class="chip ${selected.includes(o.id) ? 'selected' : ''}" data-chip="${o.id}" ${o.blurb ? `title="${o.blurb}"` : ''}>${o.label}</button>`).join('')}
  </div>`;
}

function renderForm(ctx) {
  const { shell, esc } = ctx;
  const st = getState();
  const hasKey = Boolean(st.settings?.geminiKey);
  const q = careerQuestions;

  shell('career', `
    <a class="back" href="#/career" id="career-cancel">← Career</a>
    <h1 class="page-title">Your career consult</h1>
    <p class="page-sub">Be honest and specific — the quality of the analysis depends on it. Like briefing a smart colleague.</p>

    <div class="card cform">
      <label class="field"><span>1 · What is your current role? (your own words)</span>
        <input id="cq-role" type="text" maxlength="120" placeholder="e.g. RPA Developer — I also manage our automation team's resourcing" value="${esc(draft.currentRole)}"/>
      </label>

      <div class="cq"><span class="cq-label">2 · Years of professional experience</span>
        ${chipset('experience', q.experience, [draft.experience].filter(Boolean), false)}</div>

      <div class="cq"><span class="cq-label">3 · What fills your working week? (pick all that apply)</span>
        ${chipset('responsibilities', q.responsibilities, draft.responsibilities, true)}
        <input id="cq-resp-other" type="text" maxlength="160" placeholder="Anything else worth knowing? (optional)" value="${esc(draft.responsibilitiesOther)}"/></div>

      <div class="cq"><span class="cq-label">4 · Technical comfort</span>
        ${chipset('techComfort', q.techComfort, [draft.techComfort].filter(Boolean), false)}</div>

      <div class="cq"><span class="cq-label">5 · What do you enjoy most? (pick up to 3)</span>
        ${chipset('enjoys', q.enjoys, draft.enjoys, true)}</div>

      <label class="field"><span>6 · Industry / domain you know best (optional)</span>
        <input id="cq-domain" type="text" maxlength="80" placeholder="e.g. insurance, banking operations, retail supply chain" value="${esc(draft.domain)}"/>
      </label>

      <div class="cq"><span class="cq-label">7 · Which direction pulls you?</span>
        ${chipset('direction', q.direction, [draft.direction].filter(Boolean), false)}</div>
    </div>

    <div class="card" id="key-card">
      <h3>✨ Analysis engine</h3>
      ${consultProxyUrl()
        ? `<p class="hint">Powered by learn.ai's secure AI service — <b>no setup needed</b>. Your answers are analyzed and mapped onto your learning path.</p>`
        : hasKey
        ? `<p class="hint">API key connected (stored only on this device). <button class="btn-link" id="key-remove">Remove key</button></p>`
        : `<p class="hint">For a fully personalized analysis, paste a <b>free Google AI Studio API key</b> — create one in ~30 seconds at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>. It is stored only on this device and sent only to Google. No key? Use the offline estimate instead.</p>
           <label class="field"><span>API key</span><input id="cq-key" type="password" placeholder="AIza..." autocomplete="off"/></label>`}
    </div>

    <button class="btn btn-primary btn-big" id="career-run">🔮 Get my 3 AI-era roles</button>
    <button class="btn btn-ghost btn-big" id="career-run-offline" style="margin-top:10px">Use offline estimate (no key needed)</button>
    <p class="fineprint" id="career-form-hint"></p>
  `);

  // chip wiring
  document.querySelectorAll('[data-chipset]').forEach((set) => {
    const name = set.dataset.chipset;
    const multi = name === 'responsibilities' || name === 'enjoys';
    set.querySelectorAll('[data-chip]').forEach((chip) =>
      chip.addEventListener('click', () => {
        const v = chip.dataset.chip;
        if (multi) {
          const arr = draft[name];
          const i = arr.indexOf(v);
          if (i >= 0) arr.splice(i, 1);
          else if (name !== 'enjoys' || arr.length < 3) arr.push(v);
          chip.classList.toggle('selected', arr.includes(v));
        } else {
          draft[name] = v;
          set.querySelectorAll('.chip').forEach((c) => c.classList.toggle('selected', c.dataset.chip === v));
        }
      })
    );
  });
  const bindText = (id, key) => document.getElementById(id)?.addEventListener('input', (e) => (draft[key] = e.target.value));
  bindText('cq-role', 'currentRole');
  bindText('cq-resp-other', 'responsibilitiesOther');
  bindText('cq-domain', 'domain');

  document.getElementById('career-cancel').addEventListener('click', (e) => {
    e.preventDefault();
    formOpen = false;
    ctx.rerender();
  });
  document.getElementById('key-remove')?.addEventListener('click', () => {
    setGeminiKey('');
    ctx.rerender();
  });

  const hint = document.getElementById('career-form-hint');
  const ensureReady = () => {
    if (draftReady()) return true;
    hint.textContent = 'Please answer questions 1–5 and 7 (domain is optional) — the analysis needs them.';
    hint.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  };

  document.getElementById('career-run').addEventListener('click', async () => {
    if (!ensureReady()) return;
    if (consultProxyUrl()) return runConsult(ctx, { proxy: consultProxyUrl() });
    const keyInput = document.getElementById('cq-key');
    if (keyInput?.value.trim()) setGeminiKey(keyInput.value);
    const key = getState().settings?.geminiKey;
    if (!key) {
      hint.textContent = 'Paste a Gemini API key above — or choose the offline estimate.';
      return;
    }
    await runConsult(ctx, { key });
  });

  document.getElementById('career-run-offline').addEventListener('click', () => {
    if (!ensureReady()) return;
    const answers = { ...draft };
    setCareerResult(answers, localCareerEstimate(answers), 'offline');
    formOpen = false;
    ctx.rerender();
    ctx.toast('Offline estimate ready — run the AI analysis any time for the full version.', '🧭');
  });
}

async function runConsult(ctx, engine) {
  busy = true;
  ctx.rerender();
  const answers = { ...draft };
  try {
    const result = engine.proxy
      ? await consultCareerViaProxy(answers, engine.proxy)
      : await consultCareer(answers, engine.key);
    setCareerResult(answers, result, 'gemini');
    formOpen = false;
    ctx.toast('Your career consult is ready.', '✨');
  } catch (err) {
    formOpen = true;
    const msg = err instanceof CareerConsultError ? err.message : 'Something went wrong — please try again.';
    ctx.toast(msg, '⚠️');
  } finally {
    busy = false;
    ctx.rerender();
  }
}

function renderLoading(ctx) {
  ctx.shell('career', `
    <div class="career-loading card">
      <div class="seedling-pulse">🧭</div>
      <h1 class="page-title">Analyzing your profile…</h1>
      <p class="hint">Mapping your experience and strengths onto AI-era roles. Usually under 15 seconds.</p>
      <div class="loading-bar"><div class="loading-fill"></div></div>
    </div>
  `);
}

// ---------- result ----------
function fitRing(score) {
  const r = 26, c = 2 * Math.PI * r;
  return `<svg class="fit-ring" width="64" height="64" viewBox="0 0 64 64">
    <circle cx="32" cy="32" r="${r}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="6"/>
    <circle cx="32" cy="32" r="${r}" fill="none" stroke="${score >= 80 ? 'var(--accent)' : score >= 65 ? 'var(--gold)' : '#e2a14f'}" stroke-width="6" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - score / 100)).toFixed(1)}" transform="rotate(-90 32 32)"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" class="fit-text">${score}</text>
  </svg>`;
}

function renderResult(ctx, career) {
  const { shell, esc } = ctx;
  const { result, answers, source, ts } = career;
  const when = ts ? new Date(ts).toLocaleDateString() : '';

  const roleCards = result.roles.map((role, i) => {
    const track = role.suggestedTrack ? trackById(role.suggestedTrack) : null;
    const projects = (role.suggestedProjects || []).map((id) => projectById(id)).filter(Boolean);
    return `<div class="card role-card">
      <div class="role-head">
        <div class="role-rank">#${i + 1}</div>
        <div class="role-title"><h2>${esc(role.title)}</h2><p>${esc(role.tagline || '')}</p></div>
        ${fitRing(role.fitScore)}
      </div>
      <div class="role-section"><h4>💪 Why you fit</h4><ul>${role.whyYouFit.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <details class="role-fold"><summary>🎒 You already bring <span class="fold-count">${role.transferableSkills.length}</span></summary>
        <div class="chips">${role.transferableSkills.map((x) => `<span class="chip">${esc(x)}</span>`).join('')}</div></details>
      <details class="role-fold"><summary>🧗 Honest gaps to close <span class="fold-count">${role.gaps.length}</span></summary>
        <ul>${role.gaps.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>
      <details class="role-fold" ${i === 0 ? 'open' : ''}><summary>📅 Your first 90 days <span class="fold-count">${role.first90Days.length} steps</span></summary>
        <ol>${role.first90Days.map((x) => `<li>${esc(x)}</li>`).join('')}</ol></details>
      <details class="role-fold"><summary>✅ You're ready when… <span class="fold-count">${role.readinessSignals.length}</span></summary>
        <ul>${role.readinessSignals.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>
      ${track || projects.length ? `<div class="role-links">
        ${track ? `<button class="btn btn-primary" data-switch-track="${track.id}">🌿 Prepare with the ${esc(track.label)} track</button>` : ''}
        ${projects.map((p) => `<a class="btn btn-ghost" href="#/project/${p.id}">${p.emoji} ${esc(p.title)}</a>`).join('')}
      </div>` : ''}
    </div>`;
  }).join('');

  shell('career', `
    <h1 class="page-title">Your AI-era career map</h1>
    <p class="page-sub">For: <b>${esc(answers.currentRole || 'you')}</b> · ${source === 'gemini' ? `✨ AI analysis` : '⚙️ offline estimate'} · ${when}</p>
    <div class="card consult-summary"><h3>The picture</h3><p>${esc(result.summary)}</p>
      <div class="honest-note">🪞 <b>Honest note:</b> ${esc(result.honestNote)}</div></div>
    ${roleCards}
    <div class="btn-row" style="margin-top:6px">
      <button class="btn btn-ghost" id="career-redo">↻ Redo the consult</button>
      <button class="btn btn-danger" id="career-clear">Clear result</button>
    </div>
    ${source === 'offline' ? '<p class="fineprint">This was the rule-based offline estimate. Redo with the AI analysis for a fully tailored version.</p>' : ''}
  `);

  document.querySelectorAll('[data-switch-track]').forEach((b) =>
    b.addEventListener('click', () => {
      setProfile({ ...getState().profile, persona: b.dataset.switchTrack });
      ctx.toast('Track switched — your branch now grows toward this role.', '🌿');
      ctx.go('/path');
    })
  );
  document.getElementById('career-redo').addEventListener('click', () => {
    Object.assign(draft, career.answers || {});
    formOpen = true;
    ctx.rerender();
  });
  document.getElementById('career-clear').addEventListener('click', () => {
    clearCareerResult();
    ctx.rerender();
  });
}
