// AI Readiness Profile — the shareable, evidence-based artifact of the learner's
// progress: certified skills, delivered capstones, career direction, next steps.
// Print-friendly (Save as PDF) so it can go to a manager, client or CV.
import { pathFor, personaById, projects } from './data/index.js';
import { getState, progressStyle } from './storage.js';
import { moduleProgress, projectState, overallStats, treeStats, xpLevel, nextStep, PRO_STAGE_NAMES } from './progress.js';

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const READINESS_STATEMENTS = [
  'has enrolled in a structured AI upskilling path and is beginning the foundation curriculum.',
  'is actively building AI foundations through structured, assessed learning.',
  'has certified their first AI skill through lessons and a passed knowledge check.',
  'has certified multiple core AI skills and is progressing through the foundation curriculum.',
  'has completed the full AI foundation: six core skills, each certified by knowledge checks.',
  'has a certified AI foundation and is completing role-specific specialist training.',
  'holds a certified AI foundation plus a completed role-specific specialist track.',
  'holds a certified AI foundation, a completed specialist track, and delivered hands-on capstone projects — demonstrated, applied AI capability.',
];

export function buildReportHtml() {
  const st = getState();
  const s = overallStats();
  const stats = treeStats();
  const persona = personaById(st.profile.persona);
  const lvl = xpLevel(s.xp, 'dashboard');
  const path = pathFor(st.profile.persona);
  const today = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const career = st.career?.result;

  const certified = path.filter((m) => moduleProgress(m).complete);
  const inProgress = path.filter((m) => !moduleProgress(m).complete && moduleProgress(m).lessonsDone > 0);
  const delivered = projects.filter((p) => projectState(p.id).done);
  const totalChecks = certified.length;
  const avgBest = totalChecks
    ? Math.round(certified.reduce((n, m) => n + (st.quizzes[m.id]?.best || 0), 0) / totalChecks)
    : 0;
  const next = nextStep();

  return `
  <div class="report" id="readiness-report">
    <div class="report-head">
      <div class="report-brand">🌳 learn<span class="brand-dot">.</span>ai</div>
      <div class="report-title">AI Readiness Profile</div>
    </div>
    <div class="report-person">
      <h2>${esc(st.profile.name)}</h2>
      <div class="report-meta">${persona ? `${persona.emoji} ${esc(persona.label)}` : ''} · ${esc(PRO_STAGE_NAMES[stats.stage])} · ${esc(lvl.name)} level · ${esc(today)}</div>
    </div>
    <p class="report-statement"><b>${esc(st.profile.name)}</b> ${esc(READINESS_STATEMENTS[stats.stage])}</p>

    <div class="report-stats">
      <div class="rstat"><b>${certified.length}/${path.length}</b><span>skills certified</span></div>
      <div class="rstat"><b>${delivered.length}</b><span>capstones delivered</span></div>
      <div class="rstat"><b>${s.lessonsDone}</b><span>lessons completed</span></div>
      <div class="rstat"><b>${avgBest ? avgBest + '%' : '—'}</b><span>avg. check score</span></div>
    </div>

    <h3>Certified skills</h3>
    ${certified.length
      ? `<table class="report-table"><thead><tr><th>Skill</th><th>Module</th><th>Scope</th><th>Check</th></tr></thead><tbody>
         ${certified.map((m) => `<tr><td><b>${esc(m.skill)}</b></td><td>${esc(m.title)}</td><td>${m.kind === 'foundation' ? 'Core' : 'Specialist'}</td><td>✓ ${st.quizzes[m.id]?.best || 0}%</td></tr>`).join('')}
         </tbody></table>`
      : '<p class="report-empty">No skills certified yet — the foundation curriculum is underway.</p>'}
    ${inProgress.length ? `<p class="report-note">In progress: ${inProgress.map((m) => esc(m.skill)).join(' · ')}</p>` : ''}

    <h3>Capstone projects delivered</h3>
    ${delivered.length
      ? `<ul class="report-list">${delivered.map((p) => `<li><b>${esc(p.title)}</b> — ${esc(p.deliverable)}</li>`).join('')}</ul>`
      : '<p class="report-empty">Capstones become available as the learning path progresses.</p>'}

    ${career ? `
    <h3>AI-era career direction</h3>
    <p class="report-note">From a structured role-fit analysis of current responsibilities and strengths:</p>
    <ul class="report-list">${career.roles.slice(0, 3).map((r, i) => `<li><b>#${i + 1} ${esc(r.title)}</b> — fit ${r.fitScore}/100${i === 0 && r.gaps?.length ? ` · developing: ${r.gaps.slice(0, 2).map(esc).join('; ')}` : ''}</li>`).join('')}</ul>` : ''}

    ${next && next.type !== 'done' ? `<h3>Current focus</h3>
    <p class="report-note">${next.type === 'lesson' ? `Studying: ${esc(next.module.title)} — ${esc(next.lesson.title)}` : next.type === 'quiz' ? `Certifying: ${esc(next.module.title)}` : `Building capstone: ${esc(next.project.title)}`}</p>` : ''}

    <div class="report-foot">
      <p>Skills are certified by completing all module lessons plus a knowledge check (pass mark 70%). Capstones are self-attested hands-on deliverables with structured completion criteria. Curriculum: 6 core + 2 specialist modules, grounded in the learning philosophy of Andrej Karpathy, Andrew Ng and Ethan Mollick.</p>
      <p class="report-sign">Generated by <b>learn.ai</b> · grow into the AI era · © 2026 · crafted by Vignesh Bhaskarraj</p>
    </div>
  </div>`;
}

export function viewReport(ctx) {
  const { shell } = ctx;
  shell(progressStyle() === 'dashboard' ? 'tree' : 'profile', `
    <a class="back" href="#/profile">← Profile</a>
    <div class="report-toolbar no-print">
      <h1 class="page-title">AI Readiness Profile</h1>
      <p class="page-sub">Your evidence, on one page — show a manager, attach to a review, or save as PDF.</p>
      <button class="btn btn-primary" id="report-print">🖨️ Print / Save as PDF</button>
    </div>
    ${buildReportHtml()}
  `);
  document.getElementById('report-print').addEventListener('click', () => window.print());
}
