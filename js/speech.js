// On-device speech using the Web Speech API (SpeechSynthesis).
// Two modes:
//   • Listen      — single natural voice reads the lesson.
//   • Conversation — a two-host, podcast-style dialogue read by two
//                    distinct device voices (a free, offline approximation
//                    of NotebookLM-style audio; true studio quality needs a
//                    paid cloud audio model).
// Works on Android Chrome and iOS Safari — local, free, no network.
// Import-safe in Node (no top-level window/document access).

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

let state = 'stopped'; // 'playing' | 'paused' | 'stopped'
let listener = null;
let total = 0;
let done = 0;

function emit() {
  if (listener) listener({ state, progress: total ? done / total : 0 });
}

function allVoices() {
  if (!speechSupported()) return [];
  return window.speechSynthesis.getVoices() || [];
}

function englishPool() {
  const v = allVoices();
  const en = v.filter((x) => /^en(-|_|$)/i.test(x.lang));
  return en.length ? en : v;
}

function primaryVoice() {
  const pool = englishPool();
  return pool.find((v) => v.localService && /US|GB/i.test(v.lang)) || pool.find((v) => v.localService) || pool[0] || null;
}

// Two distinguishable voices for the conversation. If the device only exposes
// one, we differentiate the second host with a pitch/rate shift instead.
function dialogueVoices() {
  const pool = englishPool();
  const a = primaryVoice();
  const b = pool.find((v) => v !== a && v.name !== (a && a.name)) || a;
  return { a, b, distinct: a !== b };
}

// ---------- HTML → speakable text ----------
export function htmlToSpeech(title, html) {
  let text = title ? title + '. ' : '';
  if (typeof document !== 'undefined') {
    const d = document.createElement('div');
    d.innerHTML = html;
    // Visual components should still read sensibly.
    d.querySelectorAll('th, td').forEach((c) => (c.textContent = c.textContent.trim() + ', '));
    d.querySelectorAll('li, tr, .vstat, .bar').forEach((el) => el.appendChild(document.createTextNode('. ')));
    d.querySelectorAll('h3, h4, p, blockquote, div').forEach((el) => el.appendChild(document.createTextNode('. ')));
    text += d.textContent;
  } else {
    text += String(html).replace(/<[^>]+>/g, ' ');
  }
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s*\.\s*\.\s*/g, '. ')
    .replace(/\s+([.,!?;:])/g, '$1')
    .trim();
}

function chunk(text) {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const out = [];
  for (const s of sentences) {
    const t = s.trim();
    if (!t) continue;
    if (t.length <= 200) out.push(t);
    else {
      let buf = '';
      for (const part of t.split(/,\s+/)) {
        if ((buf + part).length > 200 && buf) { out.push(buf.trim()); buf = ''; }
        buf += part + ', ';
      }
      if (buf.trim()) out.push(buf.trim().replace(/,$/, ''));
    }
  }
  return out;
}

// ---------- two-host dialogue from a lesson (pure, testable) ----------
const OPENERS = ['So, big picture —', 'Here\'s the key idea.', 'Let\'s start simple.', 'Okay, so', 'The thing to get is this:'];
const REACTIONS = ['Right —', 'Exactly.', 'And that matters because', 'Love it. And', 'Makes sense. So', 'Here\'s the kicker —'];

export function buildLessonDialogue(lesson) {
  const seg = [];
  const A = (text) => seg.push({ who: 'A', text });
  const B = (text) => seg.push({ who: 'B', text });
  A(`Welcome back. Today we're getting into: ${lesson.title}.`);
  B(`Nice. Give me the version that actually sticks.`);
  (lesson.takeaways || []).forEach((t, i) => {
    if (i % 2 === 0) A(`${OPENERS[i % OPENERS.length]} ${t}`);
    else B(`${REACTIONS[i % REACTIONS.length]} ${t}`);
  });
  if (lesson.quote) {
    B(`There's a great line from ${lesson.quote.by}. ${lesson.quote.text}`);
    A(`Couldn't have put it better.`);
  }
  A(`That's ${lesson.title}, in a nutshell. Scroll down for the full detail — and we'll see you in the next one.`);
  return seg;
}

// ---------- playback engine ----------
function run(utterances) {
  if (!speechSupported()) return false;
  stop();
  total = utterances.length;
  done = 0;
  state = 'playing';
  utterances.forEach((u, i) => {
    u.onend = () => { done = i + 1; if (done >= total) state = 'stopped'; emit(); };
    u.onerror = () => { done = i + 1; if (done >= total) state = 'stopped'; emit(); };
    window.speechSynthesis.speak(u);
  });
  emit();
  return true;
}

function makeUtterance(text, voice, { rate = 1, pitch = 1 } = {}) {
  const u = new SpeechSynthesisUtterance(text);
  if (voice) u.voice = voice;
  u.rate = rate;
  u.pitch = pitch;
  return u;
}

export function speak(text, onUpdate, rate = 1) {
  if (!speechSupported()) return false;
  listener = onUpdate || null;
  const voice = primaryVoice();
  const utterances = chunk(text).map((c) => makeUtterance(c, voice, { rate }));
  return run(utterances);
}

export function speakDialogue(segments, onUpdate) {
  if (!speechSupported()) return false;
  listener = onUpdate || null;
  const { a, b, distinct } = dialogueVoices();
  const utterances = [];
  for (const s of segments) {
    const isA = s.who === 'A';
    const voice = isA ? a : b;
    // If only one voice exists, separate the hosts by pitch + rate.
    const opts = distinct ? { rate: 1 } : isA ? { pitch: 1.05, rate: 1 } : { pitch: 0.85, rate: 0.97 };
    chunk(s.text).forEach((c) => utterances.push(makeUtterance(c, voice, opts)));
  }
  return run(utterances);
}

export function togglePause() {
  if (!speechSupported()) return;
  const synth = window.speechSynthesis;
  if (state === 'playing') { synth.pause(); state = 'paused'; }
  else if (state === 'paused') { synth.resume(); state = 'playing'; }
  emit();
}

export function stop() {
  if (!speechSupported()) return;
  window.speechSynthesis.cancel();
  state = 'stopped';
  done = 0;
  emit();
}

export function speechState() {
  return state;
}

if (speechSupported()) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => allVoices();
  } catch { /* no-op */ }
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && state !== 'stopped') stop();
    });
  }
}
