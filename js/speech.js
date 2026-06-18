// On-device text-to-speech using the Web Speech API (SpeechSynthesis).
// Works on Android Chrome and iOS Safari — local, free, no network, no cost.
// Handles the known platform quirks: voices load async, iOS truncates long
// utterances (so we chunk into sentences and queue them), and audio must
// follow a user gesture (the Listen button satisfies that).
// Import-safe in Node (no top-level window/document access).

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

let chunks = [];
let total = 0;
let done = 0;
let state = 'stopped'; // 'playing' | 'paused' | 'stopped'
let listener = null;
let chosenVoice = null;

function emit() {
  if (listener) listener({ state, progress: total ? done / total : 0 });
}

// Prefer a local English voice; fall back to the platform default.
function pickVoice() {
  if (!speechSupported()) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;
  const en = voices.filter((v) => /^en(-|_|$)/i.test(v.lang));
  const pool = en.length ? en : voices;
  return (
    pool.find((v) => v.localService && /US|GB/i.test(v.lang)) ||
    pool.find((v) => v.localService) ||
    pool[0]
  );
}

// Convert lesson HTML to natural speakable text with sentence boundaries.
export function htmlToSpeech(title, html) {
  let text = title ? title + '. ' : '';
  if (typeof document !== 'undefined') {
    const d = document.createElement('div');
    d.innerHTML = html;
    d.querySelectorAll('li').forEach((li) => (li.textContent = li.textContent.trim().replace(/[.;:]?$/, '. ')));
    d.querySelectorAll('h3, p, blockquote, div').forEach((el) => el.appendChild(document.createTextNode('. ')));
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

// Split into <=200-char sentence chunks (avoids iOS long-utterance truncation).
function toChunks(text) {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const out = [];
  for (const s of sentences) {
    const t = s.trim();
    if (!t) continue;
    if (t.length <= 200) {
      out.push(t);
    } else {
      let buf = '';
      for (const part of t.split(/,\s+/)) {
        if ((buf + part).length > 200 && buf) {
          out.push(buf.trim());
          buf = '';
        }
        buf += part + ', ';
      }
      if (buf.trim()) out.push(buf.trim().replace(/,$/, ''));
    }
  }
  return out;
}

export function speak(text, onUpdate, rate = 1) {
  if (!speechSupported()) return false;
  stop();
  listener = onUpdate || null;
  if (!chosenVoice) chosenVoice = pickVoice();
  chunks = toChunks(text);
  total = chunks.length;
  done = 0;
  state = 'playing';

  chunks.forEach((chunk, i) => {
    const u = new SpeechSynthesisUtterance(chunk);
    if (chosenVoice) u.voice = chosenVoice;
    u.rate = rate;
    u.pitch = 1;
    u.onend = () => {
      done = i + 1;
      if (done >= total) {
        state = 'stopped';
      }
      emit();
    };
    u.onerror = () => {
      done = i + 1;
      if (done >= total) state = 'stopped';
      emit();
    };
    window.speechSynthesis.speak(u);
  });
  emit();
  return true;
}

export function togglePause() {
  if (!speechSupported()) return;
  const synth = window.speechSynthesis;
  if (state === 'playing') {
    synth.pause();
    state = 'paused';
  } else if (state === 'paused') {
    synth.resume();
    state = 'playing';
  }
  emit();
}

export function stop() {
  if (!speechSupported()) return;
  window.speechSynthesis.cancel();
  state = 'stopped';
  done = 0;
  emit();
  listener = null;
}

export function speechState() {
  return state;
}

// Voices populate asynchronously on some platforms — warm them up.
if (speechSupported()) {
  try {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      chosenVoice = pickVoice();
    };
  } catch {
    /* no-op */
  }
  // Stop narration when the page is hidden (mobile lock / tab switch).
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && state !== 'stopped') stop();
    });
  }
}
