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
  streak: { count: 0, lastDay: null },
  xp: 0,
  celebratedStage: 0,
  settings: { reducedMotion: false },
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
export function touchActivity() {
  const today = todayKey();
  state.activity[today] = (state.activity[today] || 0) + 1;
  const s = state.streak;
  if (s.lastDay !== today) {
    const yesterday = todayKey(new Date(Date.now() - 86400000));
    s.count = s.lastDay === yesterday ? s.count + 1 : 1;
    s.lastDay = today;
  }
  persist();
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
