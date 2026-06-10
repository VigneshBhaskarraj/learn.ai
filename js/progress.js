// Derived progress: module/path completion, XP level, and the banyan tree's growth stats.
import { foundation, trackById, pathFor, projects } from './data/index.js';
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
  return getState().projects[projectId] || { checks: [], done: false };
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
    if (st.profile.persona && p.personas.includes(st.profile.persona) && !projectState(p.id).done) {
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
  const track = persona ? trackById(persona) : null;

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

// XP levels — small ladder for a sense of motion.
const LEVELS = [
  [0, 'Seed'],
  [40, 'Sprout'],
  [110, 'Seedling'],
  [220, 'Sapling'],
  [360, 'Young Tree'],
  [540, 'Branching Tree'],
  [760, 'Banyan'],
  [1000, 'Great Banyan'],
];

export function xpLevel(xp) {
  let level = LEVELS[0];
  let next = null;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i][0]) {
      level = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }
  return { name: level[1], floor: level[0], next: next ? { at: next[0], name: next[1] } : null };
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
