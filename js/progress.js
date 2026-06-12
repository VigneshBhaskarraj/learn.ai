// Derived progress: module/path completion, XP level, and the banyan tree's growth stats.
import { foundation, trackForPersona, pathFor, projects } from './data/index.js';
import { getState, todayKey } from './storage.js';

export function lessonDone(lessonId) {
  return Boolean(getState().lessons[lessonId]);
}

export function quizState(moduleId) {
  return getState().quizzes[moduleId] || { best: 0, passed: false, attempts: 0 };
}

export function moduleProgress(mod) {
  const st = getState();
  const done = mod.lessons.filter((l) => st.lessons[l.id]).length;
  const quiz = quizState(mod.id);
  const complete = done === mod.lessons.length && quiz.passed;
  return { lessonsDone: done, lessonsTotal: mod.lessons.length, quizPassed: quiz.passed, quizBest: quiz.best, complete };
}

export function projectState(projectId) {
  return getState().projects[projectId] || { checks: [], steps: [], notes: '', done: false };
}

// Lifecycle status: 'todo' | 'doing' | 'done'
export function projectStatus(projectId) {
  const p = projectState(projectId);
  if (p.done) return 'done';
  if ((p.steps || []).some(Boolean) || (p.checks || []).some(Boolean) || (p.notes || '').trim()) return 'doing';
  return 'todo';
}

// The next incomplete step in the user's path: a lesson, a quiz, or a project.
export function nextStep() {
  const st = getState();
  if (!st.profile) return null;
  const path = pathFor(st.profile.persona);
  for (const mod of path) {
    for (const lesson of mod.lessons) {
      if (!st.lessons[lesson.id]) return { type: 'lesson', module: mod, lesson };
    }
    if (!quizState(mod.id).passed) return { type: 'quiz', module: mod };
  }
  for (const p of projects) {
    const myTrack = trackForPersona(st.profile.persona);
    if (myTrack && p.personas.includes(myTrack.id) && !projectState(p.id).done) {
      return { type: 'project', project: p };
    }
  }
  for (const p of projects) {
    if (!projectState(p.id).done) return { type: 'project', project: p };
  }
  return { type: 'done' };
}

export function overallStats() {
  const st = getState();
  const persona = st.profile?.persona;
  const path = persona ? pathFor(persona) : foundation;
  const track = persona ? trackForPersona(persona) : null;

  const modsComplete = path.filter((m) => moduleProgress(m).complete);
  const foundationComplete = foundation.every((m) => moduleProgress(m).complete);
  const trackComplete = track ? track.modules.every((m) => moduleProgress(m).complete) : false;
  const lessonsDone = Object.keys(st.lessons).length;
  const lessonsTotal = path.reduce((n, m) => n + m.lessons.length, 0);
  const projectsDone = projects.filter((p) => projectState(p.id).done);

  return {
    path,
    track,
    modsComplete,
    modsTotal: path.length,
    foundationComplete,
    trackComplete,
    lessonsDone,
    lessonsTotal,
    projectsDone: projectsDone.length,
    xp: st.xp,
    streak: st.streak.count,
    activeToday: Boolean(st.activity[todayKey()]),
  };
}

// ---- Daily review (spaced retrieval practice — the testing effect) ----
// Pool: quiz questions from every module the learner has already passed.
export function reviewPool() {
  const st = getState();
  if (!st.profile) return [];
  const pool = [];
  for (const mod of pathFor(st.profile.persona)) {
    if (quizState(mod.id).passed) {
      for (const q of mod.quiz.questions) pool.push({ module: mod, q });
    }
  }
  return pool;
}

export function sampleReview(n = 3) {
  const pool = reviewPool();
  const picked = [];
  const used = new Set();
  while (picked.length < Math.min(n, pool.length)) {
    const i = Math.floor(Math.random() * pool.length);
    if (!used.has(i)) {
      used.add(i);
      picked.push(pool[i]);
    }
  }
  return picked;
}

// ---- Goal gradient: what exactly stands between you and the next milestone ----
export function nextMilestone(style = 'tree') {
  const s = overallStats();
  const stats = treeStats();
  const copy = styleCopy(style);
  if (stats.stage >= 7) return null;
  const target = copy.stageNames[stats.stage + 1];
  let detail = '';
  const nearest = () => {
    // module closest to completion that isn't complete
    let best = null;
    for (const m of s.path) {
      const p = moduleProgress(m);
      if (p.complete) continue;
      const remaining = (p.lessonsTotal - p.lessonsDone) + (p.quizPassed ? 0 : 1);
      if (!best || remaining < best.remaining) best = { m, remaining, p };
    }
    return best;
  };
  switch (stats.stage) {
    case 0: detail = 'Complete your first lesson'; break;
    case 1: {
      const b = nearest();
      detail = b ? `${b.remaining} step${b.remaining > 1 ? 's' : ''} left in ${b.m.title}` : '';
      break;
    }
    case 2: detail = `${3 - s.modsComplete.length} more module${3 - s.modsComplete.length > 1 ? 's' : ''} to complete`; break;
    case 3: {
      const left = foundation.filter((m) => !moduleProgress(m).complete).length;
      detail = `${left} foundation module${left > 1 ? 's' : ''} to go`;
      break;
    }
    case 4: detail = 'Complete your first specialist module'; break;
    case 5: detail = 'Finish your specialist track'; break;
    case 6: detail = `${2 - s.projectsDone} more capstone${2 - s.projectsDone > 1 ? 's' : ''} to deliver`; break;
  }
  return { target, detail, pct: stats.stage / 7 };
}

// XP levels — small ladder for a sense of motion. [xp floor, tree name, dashboard name]
const LEVELS = [
  [0, 'Seed', 'Starter'],
  [40, 'Sprout', 'Learner'],
  [110, 'Seedling', 'Practitioner'],
  [220, 'Sapling', 'Skilled'],
  [360, 'Young Tree', 'Advanced'],
  [540, 'Branching Tree', 'Specialist'],
  [760, 'Banyan', 'Expert'],
  [1000, 'Great Banyan', 'Master'],
];

export function xpLevel(xp, style = 'tree') {
  const nameIdx = style === 'dashboard' ? 2 : 1;
  let level = LEVELS[0];
  let next = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i][0]) {
      level = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  return { name: level[nameIdx], floor: level[0], next: next ? { at: next[0], name: next[nameIdx] } : null };
}

// ---- Tree growth model ----
// Stage 0 seed → 1 sprout → 2 seedling → 3 sapling → 4 young tree (foundation done)
// → 5 branching (track underway) → 6 banyan with aerial roots (track done)
// → 7 flourishing (track done + 2 projects). Fruits appear whenever projects complete.
export function treeStats() {
  const s = overallStats();
  const st = getState();
  let stage = 0;
  if (s.lessonsDone >= 1) stage = 1;
  if (s.modsComplete.length >= 1) stage = 2;
  if (s.modsComplete.length >= 3) stage = 3;
  if (s.foundationComplete) stage = 4;
  if (s.foundationComplete && s.track && s.track.modules.some((m) => moduleProgress(m).complete)) stage = 5;
  if (s.foundationComplete && s.trackComplete) stage = 6;
  if (s.foundationComplete && s.trackComplete && s.projectsDone >= 2) stage = 7;

  const branches = s.modsComplete.map((m) => ({ id: m.id, skill: m.skill, kind: m.kind }));
  return {
    stage,
    branches,
    leafScore: Math.min(1, s.lessonsDone / Math.max(1, s.lessonsTotal)),
    fruits: s.projectsDone,
    name: st.profile?.name || '',
  };
}

export const STAGE_NAMES = [
  'A seed, planted',
  'First sprout',
  'Seedling',
  'Sapling',
  'Young tree',
  'Branching tree',
  'Banyan — roots that hold',
  'Flourishing banyan',
];

export const STAGE_MESSAGES = [
  'Your journey begins. Every banyan started exactly here.',
  'First lesson done — life breaks the soil. Keep going.',
  'A module mastered. Your seedling stands on its own.',
  'Three modules strong — the trunk is forming.',
  'The foundation is complete. Your tree stands tall; now it branches toward your craft.',
  'Your specialist branch is growing. This is where it gets personal.',
  'Track complete. Like a banyan, your knowledge now has aerial roots — it supports itself.',
  'Projects borne as fruit. This tree feeds others now — share what you know.',
];

// Professional (dashboard) wording for the same 8 milestones.
export const PRO_STAGE_NAMES = [
  'Enrolled',
  'Getting started',
  'First skill certified',
  'Building momentum',
  'Foundation complete',
  'Specializing',
  'Track certified',
  'Portfolio ready',
];

export const PRO_STAGE_MESSAGES = [
  'Your learning path is set. The first lesson takes about seven minutes.',
  'First lesson complete — momentum established.',
  'First module mastered: lessons plus knowledge check. That is a certified skill.',
  'Three skills certified — halfway through the foundation.',
  'All six core skills certified. Your specialist track is next.',
  'Your role-specific track is underway. This is where it gets practical.',
  'Foundation and specialist track complete. Capstone projects await.',
  'Certified skills plus delivered capstones — a portfolio worth showing.',
];

// Style-aware copy bundle so views never hardcode botanical or corporate wording.
export function styleCopy(style) {
  const dash = style === 'dashboard';
  return {
    stageNames: dash ? PRO_STAGE_NAMES : STAGE_NAMES,
    stageMessages: dash ? PRO_STAGE_MESSAGES : STAGE_MESSAGES,
    navLabel: dash ? 'Progress' : 'Tree',
    navIcon: dash ? '📊' : '🌳',
    progressTitle: dash ? 'Your progress' : 'The Banyan of',
    quizPassTitle: dash ? 'Skill certified!' : 'Branch grown!',
    quizPassDetail: dash
      ? 'Certification recorded on your skills dashboard. +25 XP.'
      : 'Your banyan just grew a new branch. +25 XP.',
    quizCta: dash ? 'View progress 📊' : 'See your tree 🌳',
    lessonToast: dash ? '+10 XP — progress recorded.' : '+10 XP — your tree felt that.',
    projectToast: dash ? '+50 XP — capstone badge earned!' : '+50 XP — a golden fruit grows on your banyan!',
    projectWord: dash ? 'capstones' : 'fruits 🍎',
    projectsTitle: dash ? 'Projects — capstones 🎖️' : 'Projects — the fruits 🍎',
    pathFoundation: dash ? '🌍 Core Foundation' : '🌍 The Roots — Foundation',
    pathTrack: dash ? 'Specialist Track' : 'Your Branch',
    pathProjects: dash ? '🎖️ Capstone Projects' : '🍎 The Fruits — Projects',
  };
}
