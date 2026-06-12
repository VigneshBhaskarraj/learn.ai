// Local-first persistence with an adapter seam.
// Default adapter: localStorage (works offline, no account needed).
// A Supabase adapter can implement the same load/save interface later —
// see README "Adding cloud sync" for the planned shape.

const KEY = 'learnai.state.v1';

const defaultState = () => ({
  v: 1,
  profile: null, // { name, persona, level, createdAt }
  lessons: {}, // lessonId -> ISO timestamp completed
  quizzes: {}, // moduleId -> { best, passed, attempts, last }
  projects: {}, // projectId -> { checks: [bool], done, ts }
  activity: {}, // 'YYYY-MM-DD' -> event count
  streak: { count: 0, lastDay: null, shields: 0 },
  review: {}, // 'YYYY-MM-DD' -> { asked, correct } — daily spaced-retrieval sessions
  xp: 0,
  celebratedStage: 0,
  settings: { reducedMotion: false, geminiKey: '', progressStyle: 'tree' },
  career: { answers: null, result: null, source: null, ts: null },
});

const localAdapter = {
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage full or private mode — keep running in memory */
    }
  },
  clear() {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  },
};

let adapter = localAdapter;
let state = { ...defaultState(), ...(adapter.load() || {}) };

function persist() {
  adapter.save(state);
}

export function getState() {
  return state;
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Record that the user did something today: bumps activity + streak.
// Streak shields (forgiveness mechanics): one shield is earned per 7
// consecutive days (held max 2); a single missed day consumes a shield
// instead of resetting the streak — loss-aversion without the anxiety.
export function touchActivity(now = new Date()) {
  const today = todayKey(now);
  state.activity[today] = (state.activity[today] || 0) + 1;
  const s = state.streak;
  if (s.shields === undefined) s.shields = 0;
  if (s.lastDay !== today) {
    const gapDays = s.lastDay
      ? Math.round((new Date(today) - new Date(s.lastDay)) / 86400000)
      : Infinity;
    if (gapDays === 1) {
      s.count += 1;
    } else if (gapDays === 2 && s.shields > 0) {
      s.shields -= 1; // shield absorbs the single missed day
      s.count += 1;
    } else {
      s.count = 1;
    }
    if (s.count > 0 && s.count % 7 === 0) s.shields = Math.min(2, s.shields + 1);
    s.lastDay = today;
  }
  persist();
}

// Daily review (spaced retrieval): record today's session, +5 XP per correct.
export function recordReview(asked, correct, now = new Date()) {
  const today = todayKey(now);
  if (state.review[today]) return false;
  state.review[today] = { asked, correct };
  state.xp += correct * 5;
  touchActivity(now);
  return true;
}

export function reviewDoneToday(now = new Date()) {
  return Boolean(state.review[todayKey(now)]);
}

export function setProfile(profile) {
  state.profile = { ...profile, createdAt: state.profile?.createdAt || new Date().toISOString() };
  persist();
}

export function completeLesson(lessonId) {
  if (state.lessons[lessonId]) return false;
  state.lessons[lessonId] = new Date().toISOString();
  state.xp += 10;
  touchActivity();
  return true;
}

export function recordQuiz(moduleId, scorePct, passed) {
  const q = state.quizzes[moduleId] || { best: 0, passed: false, attempts: 0, last: null };
  const firstPass = passed && !q.passed;
  q.attempts += 1;
  q.best = Math.max(q.best, scorePct);
  q.passed = q.passed || passed;
  q.last = new Date().toISOString();
  state.quizzes[moduleId] = q;
  if (firstPass) state.xp += 25;
  touchActivity();
  return firstPass;
}

export function setProjectCheck(projectId, idx, value, totalChecks) {
  const p = state.projects[projectId] || { checks: [], done: false, ts: null };
  p.checks[idx] = value;
  const allDone = p.checks.filter(Boolean).length >= totalChecks;
  const firstDone = allDone && !p.done;
  p.done = allDone;
  if (firstDone) {
    p.ts = new Date().toISOString();
    state.xp += 50;
  }
  state.projects[projectId] = p;
  touchActivity();
  return firstDone;
}

export function setCelebratedStage(stage) {
  state.celebratedStage = stage;
  persist();
}

export function progressStyle() {
  return state.settings?.progressStyle === 'dashboard' ? 'dashboard' : 'tree';
}

export function setProgressStyle(style) {
  state.settings = state.settings || {};
  state.settings.progressStyle = style === 'dashboard' ? 'dashboard' : 'tree';
  persist();
}

export function setGeminiKey(key) {
  state.settings = state.settings || {};
  state.settings.geminiKey = key.trim();
  persist();
}

export function setCareerResult(answers, result, source) {
  state.career = { answers, result, source, ts: new Date().toISOString() };
  touchActivity();
}

export function clearCareerResult() {
  state.career = { answers: state.career?.answers || null, result: null, source: null, ts: null };
  persist();
}

export function exportState() {
  return JSON.stringify(state, null, 2);
}

export function importState(json) {
  const parsed = JSON.parse(json);
  if (!parsed || parsed.v !== 1) throw new Error('Unrecognized backup format');
  state = { ...defaultState(), ...parsed };
  persist();
}

export function resetAll() {
  adapter.clear();
  state = defaultState();
  persist();
}
