// Skills Dashboard — the professional alternative to the banyan tree.
// Same tracking engine underneath; clean corporate visualization on top:
// completion ring, certified-skill matrix, capstone badges.
import { pathFor, projects } from './data/index.js';
import { getState } from './storage.js';
import { moduleProgress, projectState, overallStats, treeStats, PRO_STAGE_NAMES } from './progress.js';

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function pathCompletionPct() {
  const s = overallStats();
  const done = s.lessonsDone + s.modsComplete.length; // lessons + passed checks
  const total = s.lessonsTotal + s.modsTotal;
  return total ? Math.min(1, done / total) : 0;
}

export function completionRing(pct, size = 150, label = '') {
  const r = (size - 18) / 2;
  const c = 2 * Math.PI * r;
  return `<svg class="dash-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Path ${Math.round(pct * 100)}% complete">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="11"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="url(#dashgrad-${size})" stroke-width="11" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - pct)).toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
    <defs><linearGradient id="dashgrad-${size}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2fb87f"/><stop offset="100%" stop-color="#f4b440"/>
    </linearGradient></defs>
    <text x="50%" y="${label ? '46%' : '52%'}" text-anchor="middle" class="dash-ring-pct">${Math.round(pct * 100)}%</text>
    ${label ? `<text x="50%" y="62%" text-anchor="middle" class="dash-ring-label">${esc(label)}</text>` : ''}
  </svg>`;
}

// Mini widget for the home hero (mirrors the mini tree slot).
export function renderDashboardMini(container) {
  container.innerHTML = `<div class="dash-mini">${completionRing(pathCompletionPct(), 120, 'complete')}</div>`;
}

// Full progress page body (everything below the page header).
export function renderDashboardFull(container) {
  const st = getState();
  const stats = treeStats();
  const path = pathFor(st.profile.persona);

  const skillRows = path
    .map((mod) => {
      const p = moduleProgress(mod);
      const pct = Math.round(((p.lessonsDone + (p.quizPassed ? 1 : 0)) / (p.lessonsTotal + 1)) * 100);
      return `<div class="skill-row ${p.complete ? 'certified' : ''}">
        <span class="skill-name">${mod.emoji} ${esc(mod.skill)}<span class="skill-kind">${mod.kind === 'foundation' ? 'Core' : 'Specialist'}</span></span>
        <span class="skill-bar"><span class="skill-fill" style="width:${pct}%"></span></span>
        <span class="skill-pct">${p.complete ? '<span class="cert-badge">✓ Certified</span>' : pct + '%'}</span>
      </div>`;
    })
    .join('');

  const capstones = projects
    .map((p) => {
      const done = projectState(p.id).done;
      return `<a class="capstone ${done ? 'earned' : ''}" href="#/project/${p.id}" title="${esc(p.title)}">
        <span class="capstone-icon">${done ? '🎖️' : p.emoji}</span>
        <span class="capstone-name">${esc(p.title)}</span>
        <span class="capstone-state">${done ? 'Delivered' : 'Open'}</span>
      </a>`;
    })
    .join('');

  const milestones = PRO_STAGE_NAMES.map(
    (name, i) => `<div class="ms ${i <= stats.stage ? 'reached' : ''}"><span class="ms-dot">${i <= stats.stage ? '●' : '○'}</span> ${esc(name)}</div>`
  ).join('');

  container.innerHTML = `
    <div class="card dash-overview">
      ${completionRing(pathCompletionPct(), 160, 'of path complete')}
      <div class="dash-overview-stats">
        <div class="dash-stat"><b>${stats.branches.length}</b><span>skills certified</span></div>
        <div class="dash-stat"><b>${stats.fruits}</b><span>capstones delivered</span></div>
        <div class="dash-stat"><b>${overallStats().streak}</b><span>day streak</span></div>
      </div>
    </div>
    <div class="card">
      <h3>Skill matrix</h3>
      <p class="hint">A skill is certified when its lessons and knowledge check are complete.</p>
      <div class="skill-matrix">${skillRows}</div>
    </div>
    <div class="card">
      <h3>Capstone projects</h3>
      <p class="hint">Hands-on deliverables that prove the skills — portfolio material.</p>
      <div class="capstone-grid">${capstones}</div>
    </div>
    <div class="card milestones"><h3>Milestones</h3>${milestones}</div>
  `;
}
