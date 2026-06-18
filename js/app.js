// learn.ai — main application: hash router, views, quiz engine, celebrations.
import { foundation, tracks, personas, levels, personaById, personaLabel, trackForPersona, pathFor, moduleById, lessonById, projectById, projectsFor } from './data/index.js';
import { getState, setProfile, completeLesson, recordQuiz, setProjectCheck, setProjectStep, setProjectNotes, setCelebratedStage, touchActivity, exportState, importState, resetAll, todayKey, progressStyle, setProgressStyle, recordReview, reviewDoneToday, introSeen, markIntroSeen } from './storage.js';
import { lessonDone, quizState, moduleProgress, projectState, projectStatus, nextStep, overallStats, xpLevel, treeStats, styleCopy, reviewPool, sampleReview, nextMilestone } from './progress.js';
import { renderTree } from './tree.js';
import { renderDashboardMini, renderDashboardFull, completionRing, pathCompletionPct } from './dashboard.js';
import { viewCareer } from './career.js';
import { viewReport } from './report.js';
import { speechSupported, htmlToSpeech, speak, speakDialogue, buildLessonDialogue, togglePause, stop as speechStop, speechState } from './speech.js';
import { buildModuleDeck, openDeck } from './deck.js';

// Resolved label for the learner's optional second hat (id or custom text).
function secondHat(profile) {
  if (!profile || (!profile.persona2 && !profile.persona2Custom)) return '';
  return personaLabel(profile.persona2, profile.persona2Custom);
}

const $ = (sel, el = document) => el.querySelector(sel);
const app = $('#app');
let deferredInstall = null;

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function go(route) {
  location.hash = route;
}

function toast(msg, emoji = '✨') {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span>${emoji}</span> ${esc(msg)}`;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 2600);
}

// ---- celebrations: fire when the tree reaches a new stage ----
function maybeCelebrate() {
  const stats = treeStats();
  const st = getState();
  if (stats.stage > (st.celebratedStage ?? 0) || (stats.stage === 0 && st.celebratedStage === -1)) {
    setCelebratedStage(stats.stage);
    showCelebration(stats);
  }
}

function showCelebration(stats) {
  const copy = styleCopy(progressStyle());
  const overlay = document.createElement('div');
  overlay.className = 'celebrate-overlay';
  overlay.innerHTML = `
    <div class="celebrate-card">
      <div class="celebrate-burst">${'<i></i>'.repeat(14)}</div>
      <div class="celebrate-tree"></div>
      <h2>${esc(copy.stageNames[stats.stage])}</h2>
      <p>${esc(copy.stageMessages[stats.stage])}</p>
      <div class="celebrate-actions">
        <button class="btn btn-primary" data-close>${progressStyle() === 'dashboard' ? 'Keep going' : 'Keep growing'}</button>
        ${stats.stage > 0 ? `<button class="btn btn-ghost" data-share>Share 📤</button>` : ''}
      </div>
    </div>`;
  document.body.appendChild(overlay);
  if (progressStyle() === 'dashboard') {
    $('.celebrate-tree', overlay).innerHTML = `<div class="dash-mini">${completionRing(pathCompletionPct(), 150, 'complete')}</div>`;
  } else {
    renderTree($('.celebrate-tree', overlay), stats, { mini: true });
  }
  requestAnimationFrame(() => overlay.classList.add('show'));
  overlay.addEventListener('click', (e) => {
    if (e.target.closest('[data-share]')) {
      shareProgress(copy.stageNames[stats.stage]);
      return;
    }
    if (e.target === overlay || e.target.closest('[data-close]')) {
      overlay.classList.remove('show');
      setTimeout(() => overlay.remove(), 300);
    }
  });
}

async function shareProgress(milestone) {
  const text = `I just reached "${milestone}" on learn.ai — a free, curated path into AI for professionals. 🌳`;
  const url = 'https://vigneshbhaskarraj.github.io/learn.ai/';
  try {
    if (navigator.share) {
      await navigator.share({ title: 'learn.ai', text, url });
    } else {
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast('Copied to clipboard — paste it anywhere.', '📤');
    }
  } catch { /* user cancelled the share sheet */ }
}

// ---- shared UI bits ----
function progressRing(pct, size = 44) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct);
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="4"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--accent)" stroke-width="4"
      stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"
      transform="rotate(-90 ${size / 2} ${size / 2})"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" class="ring-text">${Math.round(pct * 100)}%</text>
  </svg>`;
}

function moduleCard(mod, locked = false) {
  const p = moduleProgress(mod);
  const pct = (p.lessonsDone + (p.quizPassed ? 1 : 0)) / (p.lessonsTotal + 1);
  return `<a class="card module-card ${p.complete ? 'complete' : ''} ${locked ? 'locked' : ''}" href="#/module/${mod.id}">
    <div class="module-emoji">${mod.emoji}</div>
    <div class="module-info">
      <h3>${esc(mod.title)} ${p.complete ? '<span class="check">✓</span>' : ''}</h3>
      <p>${esc(mod.tagline)}</p>
      <div class="meta">${mod.lessons.length} lessons · knowledge check · ~${mod.minutes} min</div>
    </div>
    <div class="module-ring">${progressRing(pct)}</div>
  </a>`;
}

function navBar(active) {
  const copy = styleCopy(progressStyle());
  const items = [
    ['home', '🏠', 'Home'],
    ['path', '🗺️', 'Path'],
    ['tree', copy.navIcon, copy.navLabel],
    ['projects', progressStyle() === 'dashboard' ? '🎖️' : '🍎', 'Projects'],
    ['career', '🧭', 'Career'],
    ['profile', '👤', 'Profile'],
  ];
  return `<nav class="nav">
    ${items.map(([id, icon, label]) => `<a href="#/${id}" class="nav-item ${active === id ? 'active' : ''}"><span class="nav-icon">${icon}</span><span class="nav-label">${label}</span></a>`).join('')}
  </nav>`;
}

function header() {
  const s = overallStats();
  const lvl = xpLevel(s.xp, progressStyle());
  return `<header class="topbar">
    <a class="brand" href="#/home"><span class="brand-mark">🌳</span> learn<span class="brand-dot">.</span>ai</a>
    <div class="topbar-stats">
      <span class="pill" title="Daily learning streak${getState().streak.shields ? ` · ${getState().streak.shields} streak shield(s) — a shield saves your streak if you miss a day` : ''}">🔥 ${s.streak}${getState().streak.shields ? ` <span class="shield">🛡️${getState().streak.shields}</span>` : ''}</span>
      <span class="pill" title="Experience points">⭐ ${s.xp} · ${esc(lvl.name)}</span>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="app-footer">🌳 <b>learn.ai</b> · grow into the AI era · © 2026 · crafted with care by Vignesh Bhaskarraj</footer>`;
}

function shell(active, content) {
  app.innerHTML = `${header()}<main class="main">${content}${footer()}</main>${navBar(active)}`;
  window.scrollTo(0, 0);
}

// ---- onboarding ----
const ob = { step: 0, name: '', persona: null, persona2: null, persona2Custom: '', p2custOpen: false, level: null, style: null };

function viewOnboarding() {
  const steps = [obWelcome, obPersona, obLevel, obStyle, obReady];
  app.innerHTML = `<main class="main onboarding">
    <div class="ob-progress">${steps.map((_, i) => `<span class="${i <= ob.step ? 'on' : ''}"></span>`).join('')}</div>
    ${steps[ob.step]()}
  </main>`;
  wireOnboarding();
  window.scrollTo(0, 0);
}

function obWelcome() {
  return `<div class="ob-card">
    <div class="ob-hero"><div class="ob-tree"></div></div>
    <h1>Grow your understanding of AI.<br/><span class="grad">From a seed to a banyan.</span></h1>
    <p class="lede">AI can feel overwhelming — endless headlines, jargon, and the nagging question: <em>am I being left behind?</em> You're not. This is a calm, curated path from "what even is AI?" to genuine professional confidence — built on the learning philosophy of Andrej Karpathy, Andrew Ng and Ethan Mollick: <strong>real understanding, deliberate practice, and learning by building.</strong></p>
    <ul class="ob-points">
      <li>🌍 <strong>A shared foundation</strong> — six modules that demystify AI for any role</li>
      <li>🌿 <strong>Your personal branch</strong> — a track curated for the work you actually do</li>
      <li>🧠 <strong>Knowledge checks</strong> — because real learning requires retrieval, not just reading</li>
      <li>🍎 <strong>Projects</strong> — hands-on builds that turn knowledge into proof</li>
    </ul>
    <label class="field"><span>What should we call you?</span>
      <input id="ob-name" type="text" maxlength="40" placeholder="Your name" autocomplete="given-name" value="${esc(ob.name)}"/>
    </label>
    <button class="btn btn-primary btn-big" id="ob-next">Get started →</button>
    <p class="fineprint">Your progress is saved on this device. No account needed.</p>
  </div>`;
}

function obPersona() {
  const others = personas.filter((p) => p.id !== ob.persona);
  return `<div class="ob-card">
    <h1>What's your main role${ob.name ? ', ' + esc(ob.name) : ''}?</h1>
    <p class="lede">Everyone shares the same foundation. Your role curates the rest — the specialist content, the reading lens, the projects, the career guidance.</p>
    <div class="choice-grid persona-grid">
      ${personas.map((p) => `<button class="choice ${ob.persona === p.id ? 'selected' : ''}" data-persona="${p.id}">
        <span class="choice-emoji">${p.emoji}</span>
        <span class="choice-label">${esc(p.label)}</span>
        <span class="choice-blurb">${esc(p.blurb)}</span>
      </button>`).join('')}
    </div>
    ${ob.persona ? `
    <div class="second-hat">
      <div class="sh-head">🎩 Wear a second hat? <span>Optional — many leaders do (e.g. delivery <em>and</em> data protection).</span></div>
      <div class="chips select-chips">
        ${others.map((p) => `<button class="chip ${ob.persona2 === p.id ? 'selected' : ''}" data-persona2="${p.id}">${p.emoji} ${esc(p.label)}</button>`).join('')}
        <button class="chip ${ob.persona2Custom || ob.p2custOpen ? 'selected' : ''}" data-persona2-custom>✏️ Something else</button>
      </div>
      ${ob.p2custOpen || ob.persona2Custom ? `<input id="ob-persona2-custom" type="text" maxlength="60" placeholder="Type your second role, e.g. Data Protection Officer" value="${esc(ob.persona2Custom || '')}"/>` : ''}
      ${ob.persona2 || ob.persona2Custom ? `<button class="btn-link sh-clear" id="ob-clear-hat">Clear second hat</button>` : ''}
    </div>` : ''}
    <button class="btn btn-primary btn-big" id="ob-next" ${ob.persona ? '' : 'disabled'}>Continue</button>
  </div>`;
}

function obLevel() {
  return `<div class="ob-card">
    <h1>Where are you starting from?</h1>
    <p class="lede">Honest answer — there's no wrong one. Every banyan starts as a seed.</p>
    <div class="choice-grid levels">
      ${levels.map((l) => `<button class="choice ${ob.level === l.id ? 'selected' : ''}" data-level="${l.id}">
        <span class="choice-emoji">${l.emoji}</span>
        <span class="choice-label">${esc(l.label)}</span>
        <span class="choice-blurb">${esc(l.blurb)}</span>
      </button>`).join('')}
    </div>
    <button class="btn btn-primary btn-big" id="ob-next" ${ob.level ? '' : 'disabled'}>Continue</button>
  </div>`;
}

function obStyle() {
  return `<div class="ob-card">
    <h1>How should we show your progress?</h1>
    <p class="lede">Same learning, same tracking — pick the look that motivates you. You can switch anytime in your profile.</p>
    <div class="choice-grid">
      <button class="choice ${ob.style === 'tree' ? 'selected' : ''}" data-style="tree">
        <span class="choice-emoji">🌳</span>
        <span class="choice-label">Growth Tree</span>
        <span class="choice-blurb">A banyan that grows from a seed as you learn — branches for skills, fruits for projects. Visual and rewarding.</span>
      </button>
      <button class="choice ${ob.style === 'dashboard' ? 'selected' : ''}" data-style="dashboard">
        <span class="choice-emoji">📊</span>
        <span class="choice-label">Skills Dashboard</span>
        <span class="choice-blurb">A clean professional view — completion ring, certified-skill matrix, capstone badges. Boardroom-ready.</span>
      </button>
    </div>
    <button class="btn btn-primary btn-big" id="ob-next" ${ob.style ? '' : 'disabled'}>Continue</button>
  </div>`;
}

function obReady() {
  const track = trackForPersona(ob.persona);
  return `<div class="ob-card">
    <div class="ob-hero small"><div class="ob-tree"></div></div>
    <h1>Your path is ready${ob.name ? ', ' + esc(ob.name) : ''}.</h1>
    <p class="lede">Six foundation modules to build unshakeable AI understanding, then your <strong>${esc(track.label)}</strong> branch: <em>${esc(track.pitch)}</em> Finish with hands-on projects — each one a golden fruit on your banyan.</p>
    <div class="path-preview">
      <div class="pp-item">🌍 Foundation · 6 modules · 24 lessons</div>
      <div class="pp-item">${track.emoji} ${esc(track.label)} track · 2 modules · 6 lessons</div>
      ${ob.persona2 || ob.persona2Custom ? `<div class="pp-item">🎩 Second hat noted: ${esc(personaLabel(ob.persona2, ob.persona2Custom))} — your career guidance will account for it</div>` : ''}
      <div class="pp-item">🍎 Projects · hands-on, portfolio-ready</div>
    </div>
    <button class="btn btn-primary btn-big" id="ob-finish">${ob.style === 'dashboard' ? 'Start learning →' : 'Start growing 🌱'}</button>
  </div>`;
}

function wireOnboarding() {
  const treeEl = $('.ob-tree');
  if (treeEl) {
    if (ob.step === 4 && ob.style === 'dashboard') treeEl.innerHTML = `<div class="dash-mini">${completionRing(0, 130, 'ready')}</div>`;
    else renderTree(treeEl, { stage: ob.step === 4 ? 1 : 0, branches: [], leafScore: 0, fruits: 0 }, { mini: true });
  }
  const nameInput = $('#ob-name');
  if (nameInput) {
    nameInput.addEventListener('input', () => (ob.name = nameInput.value.trim()));
    nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#ob-next')?.click(); });
  }
  document.querySelectorAll('[data-persona]').forEach((b) =>
    b.addEventListener('click', () => {
      ob.persona = b.dataset.persona;
      if (ob.persona2 === ob.persona) ob.persona2 = null; // can't be your own second hat
      viewOnboarding();
    })
  );
  document.querySelectorAll('[data-persona2]').forEach((b) =>
    b.addEventListener('click', () => {
      ob.persona2 = ob.persona2 === b.dataset.persona2 ? null : b.dataset.persona2;
      ob.persona2Custom = '';
      ob.p2custOpen = false;
      viewOnboarding();
    })
  );
  $('[data-persona2-custom]')?.addEventListener('click', () => {
    ob.p2custOpen = !ob.p2custOpen;
    ob.persona2 = null;
    if (!ob.p2custOpen) ob.persona2Custom = '';
    viewOnboarding();
    $('#ob-persona2-custom')?.focus();
  });
  const p2custInput = $('#ob-persona2-custom');
  if (p2custInput) p2custInput.addEventListener('input', () => (ob.persona2Custom = p2custInput.value));
  $('#ob-clear-hat')?.addEventListener('click', () => {
    ob.persona2 = null;
    ob.persona2Custom = '';
    ob.p2custOpen = false;
    viewOnboarding();
  });
  document.querySelectorAll('[data-level]').forEach((b) =>
    b.addEventListener('click', () => { ob.level = b.dataset.level; viewOnboarding(); })
  );
  document.querySelectorAll('[data-style]').forEach((b) =>
    b.addEventListener('click', () => { ob.style = b.dataset.style; viewOnboarding(); })
  );
  $('#ob-next')?.addEventListener('click', () => { ob.step += 1; viewOnboarding(); });
  $('#ob-finish')?.addEventListener('click', () => {
    setProfile({ name: ob.name || 'Learner', persona: ob.persona, persona2: ob.persona2, persona2Custom: ob.persona2Custom.trim(), level: ob.level });
    setProgressStyle(ob.style || 'tree');
    touchActivity();
    setCelebratedStage(-1); // so the "seed planted" celebration fires
    go('/home');
    setTimeout(maybeCelebrate, 350);
  });
}

// ---- home ----
function viewHome() {
  const st = getState();
  const s = overallStats();
  const style = progressStyle();
  const copy = styleCopy(style);
  const lvl = xpLevel(s.xp, style);
  const next = nextStep();
  const stats = treeStats();
  const hour = new Date().getHours();
  const hello = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  let continueCard = '';
  if (next?.type === 'lesson') {
    continueCard = `<a class="card continue-card" href="#/lesson/${next.module.id}/${next.lesson.id}">
      <div class="cc-label">Continue learning</div>
      <h3>${next.module.emoji} ${esc(next.lesson.title)}</h3>
      <p>${esc(next.module.title)} · ~${next.lesson.minutes} min</p>
      <span class="cc-go">Resume →</span></a>`;
  } else if (next?.type === 'quiz') {
    continueCard = `<a class="card continue-card quiz" href="#/quiz/${next.module.id}">
      <div class="cc-label">Knowledge check ready</div>
      <h3>🧠 ${esc(next.module.title)}</h3>
      <p>Pass the check to grow a new branch on your tree.</p>
      <span class="cc-go">Take the check →</span></a>`;
  } else if (next?.type === 'project') {
    continueCard = `<a class="card continue-card project" href="#/project/${next.project.id}">
      <div class="cc-label">Project time</div>
      <h3>${next.project.emoji} ${esc(next.project.title)}</h3>
      <p>${esc(next.project.blurb)}</p>
      <span class="cc-go">Open the brief →</span></a>`;
  } else if (next?.type === 'done') {
    continueCard = `<div class="card continue-card"><div class="cc-label">Path complete</div>
      <h3>🌳 Your banyan is flourishing</h3><p>Every module, check and project — done. Revisit anything, or share what you've grown with your team.</p></div>`;
  }

  // last 7 days activity dots
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const k = todayKey(d);
    const active = Boolean(st.activity[k]);
    days.push(`<div class="day ${active ? 'on' : ''}" title="${k}"><span>${'SMTWTFS'[d.getDay()]}</span></div>`);
  }

  const xpPct = lvl.next ? (s.xp - lvl.floor) / (lvl.next.at - lvl.floor) : 1;

  // Today card: daily goal (lesson + review) — specific goals + retrieval practice
  const lessonToday = Object.values(st.lessons).some((ts) => String(ts).startsWith(todayKey()));
  const reviewToday = reviewDoneToday();
  const canReview = reviewPool().length > 0;
  const ms = nextMilestone(style);
  const todayCard = `<section class="card today-card">
    <h3>🎯 Today</h3>
    <div class="goal-row ${lessonToday ? 'done' : ''}"><span class="goal-check">${lessonToday ? '✓' : '○'}</span><span class="goal-label">Learn one lesson</span>${lessonToday ? '<span class="goal-done-tag">done</span>' : `<a class="goal-go" href="${next?.type === 'lesson' ? `#/lesson/${next.module.id}/${next.lesson.id}` : '#/path'}">Go →</a>`}</div>
    <div class="goal-row ${reviewToday ? 'done' : ''}">
      <span class="goal-check">${reviewToday ? '✓' : '○'}</span>
      <span class="goal-label">Daily review <span class="goal-sub">3 quick questions — proven to lock in memory</span></span>
      ${reviewToday ? '<span class="goal-done-tag">done</span>' : canReview ? '<a class="goal-go" href="#/review">Start →</a>' : '<span class="goal-sub">unlocks after your first knowledge check</span>'}
    </div>
    ${lessonToday && (reviewToday || !canReview) ? '<div class="goal-complete">Goal complete — see you tomorrow 🌅</div>' : ''}
    ${ms ? `<div class="milestone-line"><div class="milestone-bar"><div class="milestone-fill" style="width:${Math.round(ms.pct * 100)}%"></div></div><span class="milestone-text">Next: <b>${esc(ms.target)}</b> · ${esc(ms.detail)}</span></div>` : ''}
  </section>`;

  shell('home', `
    <div class="home-grid">
      <section class="hero-card card">
        <div class="hero-text">
          <h1>${hello}, ${esc(st.profile.name)} 🌿</h1>
          <p class="stage-name">${esc(copy.stageNames[stats.stage])} — ${esc(copy.stageMessages[stats.stage])}</p>
          <div class="xp-bar"><div class="xp-fill" style="width:${Math.round(xpPct * 100)}%"></div></div>
          <div class="xp-meta">⭐ ${s.xp} XP · ${esc(lvl.name)}${lvl.next ? ` · ${lvl.next.at - s.xp} XP to ${esc(lvl.next.name)}` : ' · max level'}</div>
        </div>
        <a class="hero-tree" href="#/tree" title="View your progress"><div id="mini-tree"></div></a>
      </section>
      ${continueCard}
      ${todayCard}
      <section class="card stat-card">
        <h3>This week</h3>
        <div class="week">${days.join('')}</div>
        <div class="stat-row">
          <div class="stat"><b>${s.streak}</b><span>day streak 🔥</span></div>
          <div class="stat"><b>${s.lessonsDone}/${s.lessonsTotal}</b><span>lessons</span></div>
          <div class="stat"><b>${s.modsComplete.length}/${s.modsTotal}</b><span>modules</span></div>
          <div class="stat"><b>${s.projectsDone}</b><span>${copy.projectWord}</span></div>
        </div>
      </section>
      <section class="card wisdom-card">
        <h3>Why this works</h3>
        <p>"${esc(dailyWisdom().text)}"</p>
        <div class="wisdom-by">— ${esc(dailyWisdom().by)}</div>
      </section>
      <a class="card career-teaser" href="#/career">
        <div class="cc-label">Career consult</div>
        ${st.career?.result
          ? `<h3>🧭 Your top AI-era role: ${esc(st.career.result.roles[0].title)}</h3><p>Fit ${st.career.result.roles[0].fitScore}/100 — review your map and 90-day plan.</p>`
          : `<h3>🧭 Where do you fit in the AI era?</h3><p>5 questions → 3 realistic pivot roles with fit scores, gaps and a 90-day plan.</p>`}
        <span class="cc-go">Open Career →</span>
      </a>
    </div>
  `);
  if (style === 'dashboard') renderDashboardMini($('#mini-tree'));
  else renderTree($('#mini-tree'), stats, { mini: true });
}

const WISDOM = [
  { text: 'Learning is not supposed to be fun. The primary feeling should be that of effort — the mental equivalent of sweating.', by: 'Andrej Karpathy' },
  { text: 'If you cultivate the habit of learning a little bit every week, you can make significant progress with what feels like less effort.', by: 'Andrew Ng' },
  { text: 'Always invite AI to the table. You cannot learn its jagged frontier from articles — only from use.', by: 'Ethan Mollick' },
  { text: 'What I cannot create, I do not understand.', by: 'Richard Feynman' },
  { text: 'Assume this is the worst AI you will ever use. The capability you build today compounds.', by: 'Ethan Mollick' },
  { text: 'The most dramatic optimization to your learning is to build things end to end yourself.', by: 'Andrej Karpathy' },
  { text: 'AI is the new electricity — it will transform every industry. The people who understand both the technology and the domain lead that transformation.', by: 'Andrew Ng' },
];

function dailyWisdom() {
  const day = Math.floor(Date.now() / 86400000);
  return WISDOM[day % WISDOM.length];
}

// ---- path ----
function viewPath() {
  const st = getState();
  const track = trackForPersona(st.profile.persona);
  const s = overallStats();
  const copy = styleCopy(progressStyle());
  const dash = progressStyle() === 'dashboard';
  const { recommended } = projectsFor(st.profile.persona);

  shell('path', `
    <h1 class="page-title">Your learning path</h1>
    <p class="page-sub">${dash ? 'Foundation first — the core every professional needs. Then your specialist track, then the capstones.' : 'Foundation first — the roots every professional needs. Then your specialist branch, then the fruit.'}</p>
    <section class="path-section">
      <div class="section-head"><h2>${copy.pathFoundation}</h2><span class="section-meta">${foundation.filter((m) => moduleProgress(m).complete).length}/6 complete</span></div>
      ${foundation.map((m) => moduleCard(m)).join('')}
    </section>
    <section class="path-section">
      <div class="section-head"><h2>${track.emoji} ${copy.pathTrack} — ${esc(track.label)}</h2><span class="section-meta">${track.modules.filter((m) => moduleProgress(m).complete).length}/${track.modules.length} complete</span></div>
      ${!s.foundationComplete ? `<p class="hint">💡 Recommended after the foundation — but it's your path. Learn in the order that serves you.</p>` : ''}
      ${track.modules.map((m) => moduleCard(m)).join('')}
    </section>
    <section class="path-section">
      <div class="section-head"><h2>${copy.pathProjects}</h2><span class="section-meta">${s.projectsDone} ${dash ? 'delivered' : 'grown'}</span></div>
      <p class="hint">${dash ? 'Hands-on deliverables that turn knowledge into portfolio proof.' : 'Hands-on builds. Each completed project grows a golden fruit on your banyan.'} <a href="#/projects">Browse all →</a></p>
      ${recommended.slice(0, 2).map((p) => projectCard(p)).join('')}
    </section>
  `);
}

// ---- module ----
function viewModule(moduleId) {
  const mod = moduleById(moduleId);
  if (!mod) return go('/path');
  const p = moduleProgress(mod);
  const q = quizState(mod.id);
  const dash = progressStyle() === 'dashboard';
  const profile = getState().profile;
  const persona = personaById(profile.persona);
  const hat2 = secondHat(profile);
  const firstOpen = mod.lessons.find((l) => !lessonDone(l.id));
  const resumeHref = firstOpen ? `#/lesson/${mod.id}/${firstOpen.id}` : !q.passed ? `#/quiz/${mod.id}` : null;
  const resumeLabel = !p.lessonsDone ? '▶ Start module' : firstOpen ? '▶ Continue where you left off' : !q.passed ? '🧠 Take the knowledge check' : null;

  shell('path', `
    <a class="back" href="#/path">← Path</a>
    <div class="module-head">
      <div class="module-head-emoji">${mod.emoji}</div>
      <div>
        <h1>${esc(mod.title)}</h1>
        <p class="page-sub">${esc(mod.tagline)}</p>
        <div class="meta">Skill: <b>${esc(mod.skill)}</b> · ~${mod.minutes} min ${p.complete ? `· <span class="done-tag">${dash ? '✓ Certified' : '✓ Branch grown'}</span>` : ''}</div>
      </div>
    </div>
    ${mod.kind === 'foundation' && persona?.lens ? `<div class="lens-card">${persona.emoji} <b>Your lens:</b> ${esc(persona.lens)}${hat2 ? ` <span class="lens-hat">Second hat — ${esc(hat2)}: keep its angle in mind too.</span>` : ''}</div>` : ''}
    <button class="btn btn-ghost btn-big intro-btn" id="visual-intro">✨ 30-second visual intro</button>
    ${resumeHref ? `<a class="btn btn-primary btn-big module-resume" href="${resumeHref}">${resumeLabel}</a>` : ''}
    <div class="lesson-list">
      ${mod.lessons.map((l, i) => {
        const done = lessonDone(l.id);
        return `<a class="card lesson-row ${done ? 'complete' : ''}" href="#/lesson/${mod.id}/${l.id}">
          <span class="lesson-num">${done ? '✓' : i + 1}</span>
          <span class="lesson-title">${esc(l.title)}</span>
          <span class="lesson-mins">${l.minutes} min</span>
        </a>`;
      }).join('')}
      <a class="card lesson-row quiz-row ${q.passed ? 'complete' : ''}" href="#/quiz/${mod.id}">
        <span class="lesson-num">${q.passed ? '✓' : '🧠'}</span>
        <span class="lesson-title">Knowledge check ${q.attempts ? `· best ${q.best}%` : ''}</span>
        <span class="lesson-mins">${mod.quiz.questions.length} Qs · pass ${mod.quiz.passPct}%</span>
      </a>
    </div>
  `);

  const launchDeck = () =>
    openDeck(buildModuleDeck(mod), { onStart: () => go(firstOpen ? `/lesson/${mod.id}/${firstOpen.id}` : `/lesson/${mod.id}/${mod.lessons[0].id}`) });
  $('#visual-intro').addEventListener('click', launchDeck);
  // Auto-open the visual intro the first time a learner lands on a fresh module.
  if (!p.lessonsDone && !introSeen(mod.id)) {
    markIntroSeen(mod.id);
    setTimeout(launchDeck, 250);
  }
}

// ---- lesson ----
function viewLesson(moduleId, lessonId) {
  const mod = moduleById(moduleId);
  const lesson = lessonById(moduleId, lessonId);
  if (!mod || !lesson) return go('/path');
  const idx = mod.lessons.findIndex((l) => l.id === lessonId);
  const done = lessonDone(lessonId);
  const nextLesson = mod.lessons[idx + 1];

  const prevLesson = mod.lessons[idx - 1];
  shell('path', `
    <a class="back" href="#/module/${mod.id}">← ${esc(mod.title)}</a>
    <article class="lesson">
      <div class="lesson-head">
        <div class="lesson-strip">${mod.lessons.map((l, i) => `<span class="${lessonDone(l.id) ? 'done' : ''} ${i === idx ? 'now' : ''}"></span>`).join('')}</div>
        <div class="meta">${mod.emoji} ${esc(mod.title)} · Lesson ${idx + 1} of ${mod.lessons.length}</div>
        <h1>${esc(lesson.title)}</h1>
      </div>
      ${speechSupported() ? `<div class="tts-bar" id="tts-bar">
        <button class="tts-btn" id="tts-listen">🔊 Listen</button>
        <button class="tts-btn" id="tts-convo">🎙️ Conversation</button>
        <button class="tts-stop" id="tts-stop" hidden>⏹</button>
        <span class="tts-hint">Hear this lesson on your device — free, even offline. Try <b>Conversation</b> for a two-host, podcast-style take.</span>
      </div>` : ''}
      <div class="quick-take">
        <div class="qt-head"><span>⚡ Quick take</span><span class="qt-time">full read ~${lesson.minutes} min</span></div>
        <ul>${lesson.takeaways.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <p class="qt-note">The 30-second version. The full lesson below builds the understanding that makes the knowledge check — and your job — easier.</p>
      </div>
      <div class="lesson-content">${lesson.content}</div>
      ${lesson.quote ? `<blockquote class="quote"><p>“${esc(lesson.quote.text)}”</p><footer>— <b>${esc(lesson.quote.by)}</b>${lesson.quote.role ? `, <span>${esc(lesson.quote.role)}</span>` : ''}</footer></blockquote>` : ''}
      ${lesson.goDeeper ? `<div class="go-deeper"><h3>⛏️ Go deeper (optional)</h3><ul>${lesson.goDeeper.map((g) => `<li><a href="${esc(g.url)}" target="_blank" rel="noopener">${esc(g.label)} ↗</a></li>`).join('')}</ul></div>` : ''}
      <div class="lesson-actions">
        <button class="btn btn-primary btn-big" id="complete-lesson">
          ${done ? '✓ Completed' : 'Mark complete'}${!done && nextLesson ? ' & continue →' : !done ? ' →' : ''}
        </button>
        <div class="lesson-nav">
          ${prevLesson ? `<a class="btn btn-ghost" href="#/lesson/${mod.id}/${prevLesson.id}">← ${esc(prevLesson.title)}</a>` : '<span></span>'}
          ${nextLesson ? `<a class="btn btn-ghost" href="#/lesson/${mod.id}/${nextLesson.id}">${esc(nextLesson.title)} →</a>` : `<a class="btn btn-ghost" href="#/quiz/${mod.id}">Knowledge check →</a>`}
        </div>
      </div>
    </article>
  `);

  // ---- Listen / Conversation (text-to-speech) ----
  if (speechSupported()) {
    const listenBtn = $('#tts-listen');
    const convoBtn = $('#tts-convo');
    const stopBtn = $('#tts-stop');
    const bar = $('#tts-bar');
    let mode = null; // 'listen' | 'convo'
    const labels = { listen: '🔊 Listen', convo: '🎙️ Conversation' };
    const update = ({ state }) => {
      const active = state !== 'stopped';
      bar.classList.toggle('active', active);
      stopBtn.hidden = !active;
      if (!active) mode = null;
      [['listen', listenBtn], ['convo', convoBtn]].forEach(([m, btn]) => {
        if (active && m === mode) btn.textContent = state === 'playing' ? '⏸ Pause' : '▶ Resume';
        else btn.textContent = labels[m];
        btn.disabled = active && m !== mode;
      });
    };
    const start = (m) => () => {
      if (mode === m && speechState() !== 'stopped') return togglePause();
      if (speechState() !== 'stopped') speechStop();
      mode = m;
      if (m === 'listen') {
        speak(htmlToSpeech(lesson.title, lesson.content), update);
      } else {
        speakDialogue(buildLessonDialogue(lesson), update);
      }
    };
    listenBtn.addEventListener('click', start('listen'));
    convoBtn.addEventListener('click', start('convo'));
    stopBtn.addEventListener('click', () => speechStop());
  }

  $('#complete-lesson').addEventListener('click', () => {
    const wasNew = completeLesson(lessonId);
    if (wasNew) toast(styleCopy(progressStyle()).lessonToast, progressStyle() === 'dashboard' ? '📈' : '🌱');
    if (nextLesson) go(`/lesson/${mod.id}/${nextLesson.id}`);
    else go(`/quiz/${mod.id}`);
    setTimeout(maybeCelebrate, 300);
  });
}

// ---- quiz ----
const quizRun = { moduleId: null, idx: 0, correct: 0, answered: false };

function viewQuiz(moduleId) {
  const mod = moduleById(moduleId);
  if (!mod) return go('/path');
  if (quizRun.moduleId !== moduleId) Object.assign(quizRun, { moduleId, idx: 0, correct: 0, answered: false });
  const total = mod.quiz.questions.length;

  if (quizRun.idx >= total) return viewQuizResult(mod);

  const q = mod.quiz.questions[quizRun.idx];
  shell('path', `
    <a class="back" href="#/module/${mod.id}" id="quiz-back">← ${esc(mod.title)}</a>
    <div class="quiz">
      <div class="quiz-progress">${mod.quiz.questions.map((_, i) => `<span class="${i < quizRun.idx ? 'past' : i === quizRun.idx ? 'now' : ''}"></span>`).join('')}</div>
      <div class="meta">Knowledge check · Question ${quizRun.idx + 1} of ${total}</div>
      <h2 class="quiz-q">${esc(q.q)}</h2>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="quiz-opt" data-opt="${i}"><span class="opt-letter">${'ABCD'[i]}</span> ${esc(o)}</button>`).join('')}
      </div>
      <div class="quiz-explain" id="quiz-explain" hidden></div>
      <button class="btn btn-primary btn-big" id="quiz-next" hidden>${quizRun.idx + 1 === total ? 'See result' : 'Next question →'}</button>
    </div>
  `);

  document.querySelectorAll('.quiz-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (quizRun.answered) return;
      quizRun.answered = true;
      const picked = Number(btn.dataset.opt);
      const right = picked === q.answer;
      if (right) quizRun.correct += 1;
      document.querySelectorAll('.quiz-opt').forEach((b, i) => {
        b.disabled = true;
        if (i === q.answer) b.classList.add('correct');
        else if (i === picked) b.classList.add('wrong');
      });
      const ex = $('#quiz-explain');
      ex.hidden = false;
      ex.innerHTML = `<b>${right ? '✓ Correct.' : '✗ Not quite.'}</b> ${esc(q.explain)}`;
      $('#quiz-next').hidden = false;
    });
  });

  $('#quiz-next').addEventListener('click', () => {
    quizRun.idx += 1;
    quizRun.answered = false;
    viewQuiz(moduleId);
  });
}

function viewQuizResult(mod) {
  const total = mod.quiz.questions.length;
  const pct = Math.round((quizRun.correct / total) * 100);
  const passed = pct >= mod.quiz.passPct;
  const firstPass = recordQuiz(mod.id, pct, passed);
  quizRun.moduleId = null;

  const copy = styleCopy(progressStyle());
  const dash = progressStyle() === 'dashboard';
  shell('path', `
    <div class="quiz-result card ${passed ? 'pass' : 'fail'}">
      <div class="qr-emoji">${passed ? (dash ? '🏅' : '🌿') : '🍂'}</div>
      <h1>${passed ? copy.quizPassTitle : 'Not yet — and that\'s fine.'}</h1>
      <div class="qr-score">${quizRun.correct}/${total} · ${pct}%</div>
      <p>${passed
        ? `You've mastered <b>${esc(mod.skill)}</b>. ${firstPass ? copy.quizPassDetail : dash ? 'Skill already certified — well reinforced.' : 'Branch already on the tree — well reinforced.'}`
        : `You need ${mod.quiz.passPct}% to ${dash ? 'certify this skill' : 'grow this branch'}. Effortful retrieval is the point — review the lessons and return.`}</p>
      <div class="qr-actions">
        ${passed ? `<a class="btn btn-primary btn-big" href="#/tree">${copy.quizCta}</a><a class="btn btn-ghost" href="#/path">Back to path</a>`
        : `<a class="btn btn-primary btn-big" href="#/module/${mod.id}">Review lessons</a><button class="btn btn-ghost" id="retry">Retry check</button>`}
      </div>
    </div>
  `);
  $('#retry')?.addEventListener('click', () => viewQuiz(mod.id));
  if (passed) setTimeout(maybeCelebrate, 500);
}

// ---- progress page (banyan tree or skills dashboard) ----
function viewTree() {
  const stats = treeStats();
  const copy = styleCopy(progressStyle());

  if (progressStyle() === 'dashboard') {
    shell('tree', `
      <h1 class="page-title">Your progress, ${esc(stats.name)}</h1>
      <p class="page-sub">${esc(copy.stageNames[stats.stage])} — ${esc(copy.stageMessages[stats.stage])}</p>
      <a class="btn btn-primary report-cta" href="#/report">📄 Generate my AI Readiness Profile</a>
      <div id="dash-full"></div>
    `);
    renderDashboardFull($('#dash-full'));
    return;
  }

  const milestones = copy.stageNames.map((name, i) => `<div class="ms ${i <= stats.stage ? 'reached' : ''}"><span class="ms-dot">${i <= stats.stage ? '●' : '○'}</span> ${esc(name)}</div>`).join('');

  shell('tree', `
    <h1 class="page-title">The Banyan of ${esc(stats.name)}</h1>
    <p class="page-sub">${esc(copy.stageNames[stats.stage])} — ${esc(copy.stageMessages[stats.stage])}</p>
    <div class="card tree-stage"><div id="big-tree"></div></div>
    <a class="btn btn-primary report-cta" href="#/report">📄 Generate my AI Readiness Profile</a>
    <div class="tree-legend card">
      <h3>🌿 Branches — skills mastered (${stats.branches.length})</h3>
      ${stats.branches.length ? `<div class="chips">${stats.branches.map((b) => `<span class="chip">${esc(b.skill)}</span>`).join('')}</div>` : '<p class="hint">Complete a module (lessons + knowledge check) to grow your first branch.</p>'}
      <h3>🍎 Fruits — projects completed (${stats.fruits})</h3>
      ${stats.fruits ? `<p>Each fruit is a real artifact you built. That's Karpathy's law at work: you understand what you create.</p>` : '<p class="hint">Complete a hands-on project to bear your first fruit.</p>'}
    </div>
    <div class="card milestones"><h3>Growth milestones</h3>${milestones}</div>
  `);
  renderTree($('#big-tree'), stats);
}

// ---- projects ----
const TIERS = {
  starter: { label: '🌱 Starter', sub: 'Under an hour, browser only — anyone can do these today.' },
  intermediate: { label: '🌿 Intermediate', sub: 'A few hours across a week, woven into your real work.' },
  advanced: { label: '🌳 Advanced', sub: 'The portfolio pieces — more effort, more proof.' },
};

function statusChip(projectId) {
  const status = projectStatus(projectId);
  const dash = progressStyle() === 'dashboard';
  if (status === 'done') return `<span class="status-chip done">${dash ? '🎖️ Done' : '🍎 Done'}</span>`;
  if (status === 'doing') return '<span class="status-chip doing">● In progress</span>';
  return '<span class="status-chip todo">○ Not started</span>';
}

function projectCard(p, recommendedIds) {
  const ps = projectState(p.id);
  const stepsDone = (ps.steps || []).filter(Boolean).length;
  return `<a class="card project-card ${ps.done ? 'complete' : ''}" href="#/project/${p.id}">
    <div class="module-emoji">${p.emoji}</div>
    <div class="module-info">
      <h3>${esc(p.title)} ${recommendedIds?.has(p.id) ? '<span class="rec-chip">for you</span>' : ''}</h3>
      <p>${esc(p.blurb)}</p>
      <div class="meta">${esc(p.hours)} · +${p.xp} XP${stepsDone ? ` · step ${Math.min(stepsDone + 1, p.steps.length)}/${p.steps.length}` : ''}</div>
    </div>
    ${statusChip(p.id)}
  </a>`;
}

function viewProjects() {
  const st = getState();
  const { recommended } = projectsFor(st.profile.persona);
  const recIds = new Set(recommended.map((p) => p.id));
  const allProjects = projectsFor(st.profile.persona);
  const everything = [...allProjects.recommended, ...allProjects.more];

  const tierSection = (tier) => {
    const items = everything.filter((p) => p.tier === tier);
    if (!items.length) return '';
    const doneCount = items.filter((p) => projectStatus(p.id) === 'done').length;
    return `<section class="path-section">
      <div class="section-head"><h2>${TIERS[tier].label}</h2><span class="section-meta">${doneCount}/${items.length} done</span></div>
      <p class="hint">${TIERS[tier].sub}</p>
      ${items.map((p) => projectCard(p, recIds)).join('')}
    </section>`;
  };

  shell('projects', `
    <h1 class="page-title">${styleCopy(progressStyle()).projectsTitle}</h1>
    <p class="page-sub">"What I cannot create, I do not understand." Real artifacts for your real job — from a 30-minute starter to portfolio pieces. Download a brief, work at your own pace, come back and tick off your progress.</p>
    ${tierSection('starter')}${tierSection('intermediate')}${tierSection('advanced')}
  `);
}

// Downloadable project brief (markdown — opens in any text editor).
function downloadBrief(p) {
  const lines = [
    `# ${p.title} — learn.ai project brief`,
    '',
    `**Level:** ${p.tier} · **Time:** ${p.hours} · **Reward:** +${p.xp} XP`,
    '',
    `## Why this project`,
    p.why,
    '',
    `## What you need`,
    p.needs,
    '',
    `## Steps`,
    ...p.steps.map((s, i) => `${i + 1}. [ ] ${s}`),
    '',
    `## Deliverable`,
    p.deliverable,
    '',
    `## Self-check (tick these in the app when you're done)`,
    ...p.selfCheck.map((c) => `- [ ] ${c}`),
    '',
    '---',
    'When you finish, come back to learn.ai → Projects → tick your steps and self-checks to claim the XP.',
    'https://vigneshbhaskarraj.github.io/learn.ai/  ·  © 2026 learn.ai · crafted by Vignesh Bhaskarraj',
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `learnai-project-${p.id}-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function viewProject(projectId) {
  const p = projectById(projectId);
  if (!p) return go('/projects');
  const ps = projectState(p.id);
  const dash = progressStyle() === 'dashboard';

  shell('projects', `
    <a class="back" href="#/projects">← Projects</a>
    <article class="lesson">
      <div class="lesson-head">
        <div class="meta">${TIERS[p.tier].label} · ${esc(p.hours)} · +${p.xp} XP &nbsp;${statusChip(p.id)}</div>
        <h1>${p.emoji} ${esc(p.title)}</h1>
        <p class="page-sub">${esc(p.blurb)}</p>
      </div>
      <div class="btn-row brief-row">
        <button class="btn btn-ghost" id="download-brief">⬇️ Download brief</button>
      </div>
      <div class="lesson-content">
        <div class="callout"><strong>Why this project:</strong> ${esc(p.why)}</div>
        <div class="needs-card">🧰 <b>What you need:</b> ${esc(p.needs)}</div>
        <h3>Steps — tick them off as you go</h3>
      </div>
      <div class="step-list">
        ${p.steps.map((s, i) => `<label class="check-row step-row">
          <input type="checkbox" data-step="${i}" ${ps.steps?.[i] ? 'checked' : ''}/>
          <span><b class="step-n">${i + 1}.</b> ${esc(s)}</span>
        </label>`).join('')}
      </div>
      <div class="lesson-content">
        <h3>Deliverable</h3>
        <p>${esc(p.deliverable)}</p>
      </div>
      <div class="card notes-card">
        <h3>📝 My notes</h3>
        <p class="hint">Where you left off, links to your work, ideas — saved on this device.</p>
        <textarea id="project-notes" rows="3" maxlength="2000" placeholder="e.g. Drafted 3 of 5 prompts — the client-email one needs another pass…">${esc(ps.notes || '')}</textarea>
        <span class="notes-saved meta" id="notes-saved"></span>
      </div>
      <div class="self-check card">
        <h3>Self-check — tick honestly${dash ? '' : '; the tree knows 😉'}</h3>
        ${p.selfCheck.map((c, i) => `<label class="check-row">
          <input type="checkbox" data-check="${i}" ${ps.checks?.[i] ? 'checked' : ''}/>
          <span>${esc(c)}</span>
        </label>`).join('')}
        <div class="meta" id="check-status">${(ps.checks?.filter(Boolean).length || 0)}/${p.selfCheck.length} complete${ps.done ? (dash ? ' · 🎖️ delivered!' : ' · 🍎 grown!') : ''}</div>
      </div>
    </article>
  `);

  document.getElementById('download-brief').addEventListener('click', () => {
    downloadBrief(p);
    toast('Brief downloaded — work anywhere, come back to tick it off.', '⬇️');
  });
  document.querySelectorAll('[data-step]').forEach((cb) =>
    cb.addEventListener('change', () => setProjectStep(p.id, Number(cb.dataset.step), cb.checked))
  );
  let notesTimer = null;
  document.getElementById('project-notes').addEventListener('input', (e) => {
    clearTimeout(notesTimer);
    notesTimer = setTimeout(() => {
      setProjectNotes(p.id, e.target.value);
      const saved = $('#notes-saved');
      saved.textContent = 'saved ✓';
      setTimeout(() => (saved.textContent = ''), 1500);
    }, 500);
  });
  document.querySelectorAll('[data-check]').forEach((cb) => {
    cb.addEventListener('change', () => {
      const firstDone = setProjectCheck(p.id, Number(cb.dataset.check), cb.checked, p.selfCheck.length, p.xp);
      const ps2 = projectState(p.id);
      $('#check-status').innerHTML = `${ps2.checks.filter(Boolean).length}/${p.selfCheck.length} complete${ps2.done ? (dash ? ' · 🎖️ delivered!' : ' · 🍎 grown!') : ''}`;
      if (firstDone) {
        toast(`+${p.xp} XP — ${dash ? 'capstone badge earned!' : 'a golden fruit grows on your banyan!'}`, dash ? '🎖️' : '🍎');
        setTimeout(maybeCelebrate, 400);
      }
    });
  });
}

// ---- profile ----
function viewProfile() {
  const st = getState();
  const s = overallStats();
  const lvl = xpLevel(s.xp, progressStyle());
  const persona = personas.find((p) => p.id === st.profile.persona);
  const level = levels.find((l) => l.id === st.profile.level);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  shell('profile', `
    <h1 class="page-title">Profile</h1>
    <p class="page-sub">Your role, progress proof, and how the app looks and saves.</p>
    <div class="card profile-card">
      <div class="avatar">${persona?.emoji || '🌱'}</div>
      <div>
        <h2>${esc(st.profile.name)}</h2>
        <p class="meta">${esc(persona?.label || '')}${secondHat(st.profile) ? ` <span class="hat-tag">🎩 also ${esc(secondHat(st.profile))}</span>` : ''}</p>
        <p class="meta">⭐ ${s.xp} XP · ${esc(lvl.name)} · 🔥 ${s.streak}-day streak</p>
      </div>
    </div>
    <a class="card career-teaser" href="#/report">
      <div class="cc-label">Your proof</div>
      <h3>📄 AI Readiness Profile</h3>
      <p>Your certified skills, capstones and career direction on one page — show a manager or save as PDF.</p>
      <span class="cc-go">Generate →</span>
    </a>
    <div class="card">
      <h3>Switch main role</h3>
      <p class="hint">Your foundation progress carries over. Only your specialist content changes.</p>
      <div class="chips select-chips">
        ${personas.map((p) => `<button class="chip ${p.id === st.profile.persona ? 'selected' : ''}" data-set-persona="${p.id}">${p.emoji} ${esc(p.label)}</button>`).join('')}
      </div>
    </div>
    <div class="card">
      <h3>🎩 Second hat <span class="hint">(optional)</span></h3>
      <p class="hint">For hybrid roles — informs your reading lens and career guidance, not your curriculum.</p>
      <div class="chips select-chips">
        ${personas.filter((p) => p.id !== st.profile.persona).map((p) => `<button class="chip ${p.id === st.profile.persona2 ? 'selected' : ''}" data-set-hat="${p.id}">${p.emoji} ${esc(p.label)}</button>`).join('')}
      </div>
      <input id="profile-hat-custom" type="text" maxlength="60" placeholder="…or type your own, e.g. Data Protection Officer" value="${esc(st.profile.persona2Custom || '')}"/>
      ${secondHat(st.profile) ? '<button class="btn-link" id="profile-hat-clear">Clear second hat</button>' : ''}
    </div>
    <div class="card">
      <h3>Progress style</h3>
      <p class="hint">Same tracking underneath — choose how it looks.</p>
      <div class="chips select-chips">
        <button class="chip ${progressStyle() === 'tree' ? 'selected' : ''}" data-set-style="tree">🌳 Growth Tree</button>
        <button class="chip ${progressStyle() === 'dashboard' ? 'selected' : ''}" data-set-style="dashboard">📊 Skills Dashboard</button>
      </div>
    </div>
    ${!isStandalone ? `<div class="card">
      <h3>📲 Install as an app</h3>
      ${isIOS
        ? `<p class="hint">On iPhone/iPad: tap <b>Share</b> <span class="kbd">⎙</span> in Safari, then <b>“Add to Home Screen”</b>. learn.ai works offline once installed.</p>`
        : `<p class="hint">Install learn.ai on your device — it works offline and opens like a native app.</p>
           <button class="btn btn-primary" id="install-btn" ${deferredInstall ? '' : 'disabled'}>${deferredInstall ? 'Install learn.ai' : 'Use your browser menu → “Install app”'}</button>`}
    </div>` : ''}
    <div class="card">
      <h3>Your data</h3>
      <p class="hint">Progress lives on this device (local storage). Export to back up or move devices.</p>
      <div class="btn-row">
        <button class="btn btn-ghost" id="export-btn">Export progress</button>
        <button class="btn btn-ghost" id="import-btn">Import</button>
        <button class="btn btn-danger" id="reset-btn">Reset everything</button>
      </div>
      <input type="file" id="import-file" accept="application/json" hidden/>
    </div>
    <div class="card about">
      <h3>About learn.ai</h3>
      <p>A calm, curated path into AI for consulting and IT professionals — product owners, developers, analysts, QA and leaders. Built on the learning philosophy of <b>Andrej Karpathy</b> (effortful learning, build to understand), <b>Andrew Ng</b> (foundations + projects + habit) and <b>Ethan Mollick</b> (co-intelligence: learn AI by working with it).</p>
      <p class="hint">Your knowledge tree is a banyan for a reason: banyans grow aerial roots — knowledge that supports itself — and they shelter others. Learn deeply, then share.</p>
    </div>
  `);

  document.querySelectorAll('[data-set-persona]').forEach((b) =>
    b.addEventListener('click', () => {
      const prof = { ...getState().profile, persona: b.dataset.setPersona };
      if (prof.persona2 === prof.persona) prof.persona2 = null; // can't be your own second hat
      setProfile(prof);
      toast('Main role switched — your specialist path is updated.', '🌿');
      viewProfile();
    })
  );
  document.querySelectorAll('[data-set-hat]').forEach((b) =>
    b.addEventListener('click', () => {
      const cur = getState().profile;
      const next = cur.persona2 === b.dataset.setHat ? null : b.dataset.setHat;
      setProfile({ ...cur, persona2: next, persona2Custom: '' });
      toast(next ? 'Second hat saved.' : 'Second hat cleared.', '🎩');
      viewProfile();
    })
  );
  $('#profile-hat-custom')?.addEventListener('change', (e) => {
    const v = e.target.value.trim();
    setProfile({ ...getState().profile, persona2Custom: v, persona2: v ? null : getState().profile.persona2 });
    if (v) toast('Second hat saved.', '🎩');
    viewProfile();
  });
  $('#profile-hat-clear')?.addEventListener('click', () => {
    setProfile({ ...getState().profile, persona2: null, persona2Custom: '' });
    toast('Second hat cleared.', '🎩');
    viewProfile();
  });
  document.querySelectorAll('[data-set-style]').forEach((b) =>
    b.addEventListener('click', () => {
      setProgressStyle(b.dataset.setStyle);
      toast(b.dataset.setStyle === 'dashboard' ? 'Switched to the Skills Dashboard.' : 'Switched to the Growth Tree.', b.dataset.setStyle === 'dashboard' ? '📊' : '🌳');
      viewProfile();
    })
  );
  $('#install-btn')?.addEventListener('click', async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    viewProfile();
  });
  $('#export-btn')?.addEventListener('click', () => {
    const blob = new Blob([exportState()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `learnai-progress-${todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $('#import-btn')?.addEventListener('click', () => $('#import-file').click());
  $('#import-file')?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      importState(await file.text());
      toast('Progress imported. Welcome back.', '🌳');
      route();
    } catch {
      toast('That file did not look like a learn.ai backup.', '⚠️');
    }
  });
  $('#reset-btn')?.addEventListener('click', () => {
    if (confirm('Reset ALL progress? Your tree returns to a seed. This cannot be undone.')) {
      resetAll();
      Object.assign(ob, { step: 0, name: '', persona: null, level: null });
      go('/');
      route();
    }
  });
}

// ---- daily review (spaced retrieval practice) ----
const reviewRun = { items: null, idx: 0, correct: 0, answered: false };

function viewReview() {
  if (reviewDoneToday()) {
    const today = getState().review[todayKey()];
    return shell('home', `
      <div class="quiz-result card pass">
        <div class="qr-emoji">🧠</div>
        <h1>Review done for today</h1>
        <div class="qr-score">${today.correct}/${today.asked}</div>
        <p>Spacing reviews across days is exactly what makes knowledge stick — that's the science, not a limitation. Come back tomorrow.</p>
        <div class="qr-actions"><a class="btn btn-primary btn-big" href="#/home">Back home</a></div>
      </div>`);
  }
  if (!reviewPool().length) return go('/home');
  if (!reviewRun.items) Object.assign(reviewRun, { items: sampleReview(3), idx: 0, correct: 0, answered: false });

  if (reviewRun.idx >= reviewRun.items.length) {
    const wasNew = recordReview(reviewRun.items.length, reviewRun.correct);
    const correct = reviewRun.correct;
    const total = reviewRun.items.length;
    reviewRun.items = null;
    if (wasNew && correct) toast(`+${correct * 5} XP — retrieval locked in.`, '🧠');
    return shell('home', `
      <div class="quiz-result card pass">
        <div class="qr-emoji">${correct === total ? '🌟' : '🧠'}</div>
        <h1>${correct === total ? 'Perfect recall!' : 'Review complete'}</h1>
        <div class="qr-score">${correct}/${total}</div>
        <p>${correct === total ? 'Every retrieval strengthens the memory trace. Same time tomorrow.' : 'Missed ones matter most — retrieving after forgetting is where the deepest learning happens. They\'ll be back.'}</p>
        <div class="qr-actions"><a class="btn btn-primary btn-big" href="#/home">Back home</a></div>
      </div>`);
  }

  const { module: mod, q } = reviewRun.items[reviewRun.idx];
  shell('home', `
    <a class="back" href="#/home" id="review-back">← Home</a>
    <h1 class="page-title">Daily review 🧠</h1>
    <p class="page-sub">Spaced retrieval — three quick questions to lock in what you've learned.</p>
    <div class="quiz">
      <div class="quiz-progress">${reviewRun.items.map((_, i) => `<span class="${i < reviewRun.idx ? 'past' : i === reviewRun.idx ? 'now' : ''}"></span>`).join('')}</div>
      <div class="meta">From ${mod.emoji} ${esc(mod.title)} · ${reviewRun.idx + 1} of ${reviewRun.items.length}</div>
      <h2 class="quiz-q">${esc(q.q)}</h2>
      <div class="quiz-options">${q.options.map((o, i) => `<button class="quiz-opt" data-opt="${i}"><span class="opt-letter">${'ABCD'[i]}</span> ${esc(o)}</button>`).join('')}</div>
      <div class="quiz-explain" id="quiz-explain" hidden></div>
      <button class="btn btn-primary btn-big" id="review-next" hidden>${reviewRun.idx + 1 === reviewRun.items.length ? 'Finish' : 'Next →'}</button>
    </div>`);

  document.querySelectorAll('.quiz-opt').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (reviewRun.answered) return;
      reviewRun.answered = true;
      const picked = Number(btn.dataset.opt);
      const right = picked === q.answer;
      if (right) reviewRun.correct += 1;
      document.querySelectorAll('.quiz-opt').forEach((b, i) => {
        b.disabled = true;
        if (i === q.answer) b.classList.add('correct');
        else if (i === picked) b.classList.add('wrong');
      });
      const ex = $('#quiz-explain');
      ex.hidden = false;
      ex.innerHTML = `<b>${right ? '✓ Still got it.' : '✗ Worth the refresh.'}</b> ${esc(q.explain)}`;
      $('#review-next').hidden = false;
    })
  );
  $('#review-next').addEventListener('click', () => {
    reviewRun.idx += 1;
    reviewRun.answered = false;
    viewReview();
  });
  $('#review-back').addEventListener('click', () => { reviewRun.items = null; });
}

// Context handed to the career view (keeps career.js free of circular imports).
const careerCtx = { shell, esc, toast, go, rerender: () => route() };

// ---- router ----
function route() {
  speechStop(); // never let narration bleed across pages
  const hash = location.hash.replace(/^#/, '') || '/';
  const st = getState();
  if (!st.profile) return viewOnboarding();
  const [, page, a, b] = hash.split('/');
  switch (page) {
    case 'home': return viewHome();
    case 'path': return viewPath();
    case 'module': return viewModule(a);
    case 'lesson': return viewLesson(a, b);
    case 'quiz': return viewQuiz(a);
    case 'tree': return viewTree();
    case 'projects': return viewProjects();
    case 'project': return viewProject(a);
    case 'career': return viewCareer(careerCtx);
    case 'report': return viewReport(careerCtx);
    case 'review': return viewReview();
    case 'profile': return viewProfile();
    default: return viewHome();
  }
}

window.addEventListener('hashchange', route);
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstall = e;
});

// service worker (PWA): relative path so it works on GitHub Pages subpaths
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {/* offline-first is progressive enhancement */});
  });
}

route();
