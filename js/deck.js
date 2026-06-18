// Swipeable card deck — a visual, interactive intro to a module so it doesn't
// feel like a wall of text. Built from the module's own data (no extra
// authoring). Touch-swipe + buttons + keyboard + dots.

// Pure builder (import-safe in Node): returns the card list for a module.
export function buildModuleDeck(mod) {
  const cards = [];
  cards.push({
    type: 'hook',
    emoji: mod.emoji,
    kicker: mod.kind === 'foundation' ? 'Foundation module' : 'Specialist module',
    title: mod.title,
    text: mod.tagline,
    meta: `${mod.lessons.length} short lessons · ~${mod.minutes} min · 1 knowledge check`,
  });
  mod.lessons.forEach((l, i) => {
    cards.push({
      type: 'lesson',
      n: i + 1,
      title: l.title,
      text: (l.takeaways && l.takeaways[0]) || '',
    });
  });
  cards.push({
    type: 'skill',
    emoji: '🎯',
    kicker: 'What you walk away with',
    title: mod.skill,
    text: 'Pass the knowledge check at the end to certify this skill.',
  });
  cards.push({
    type: 'cta',
    emoji: '🚀',
    title: "That's the map.",
    text: 'Now the real thing — short lessons you can read or listen to.',
    cta: 'Start lesson 1',
  });
  return cards;
}

const GRADIENTS = [
  'linear-gradient(160deg,#15463a,#0d2a22)',
  'linear-gradient(160deg,#1d4d5f,#0e2a33)',
  'linear-gradient(160deg,#3a3f1d,#22260e)',
  'linear-gradient(160deg,#173f57,#0c2230)',
  'linear-gradient(160deg,#2a4a2e,#15291a)',
  'linear-gradient(160deg,#4a3a1d,#28200e)',
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function cardHtml(card, i) {
  const bg = GRADIENTS[i % GRADIENTS.length];
  let body = '';
  if (card.type === 'lesson') {
    body = `<div class="deck-badge">${card.n}</div>
      <h2>${esc(card.title)}</h2>
      <p>${esc(card.text)}</p>`;
  } else {
    body = `<div class="deck-emoji">${card.emoji || '🌱'}</div>
      ${card.kicker ? `<div class="deck-kicker">${esc(card.kicker)}</div>` : ''}
      <h2>${esc(card.title)}</h2>
      <p>${esc(card.text)}</p>
      ${card.meta ? `<div class="deck-meta">${esc(card.meta)}</div>` : ''}
      ${card.cta ? `<button class="btn btn-primary deck-start">${esc(card.cta)}</button>` : ''}`;
  }
  return `<div class="deck-card deck-${card.type}" style="background:${bg}"><div class="deck-card-inner">${body}</div></div>`;
}

// Opens the overlay. onStart() fires when the learner taps the final CTA.
export function openDeck(cards, { onStart, onClose } = {}) {
  let idx = 0;
  const overlay = document.createElement('div');
  overlay.className = 'deck-overlay';
  overlay.innerHTML = `
    <div class="deck-frame">
      <button class="deck-close" aria-label="Close">✕</button>
      <div class="deck-viewport">
        <div class="deck-track">${cards.map(cardHtml).join('')}</div>
      </div>
      <div class="deck-dots">${cards.map((_, i) => `<span class="${i === 0 ? 'on' : ''}"></span>`).join('')}</div>
      <div class="deck-controls">
        <button class="btn btn-ghost deck-prev" disabled>← Back</button>
        <span class="deck-count">1 / ${cards.length}</span>
        <button class="btn btn-ghost deck-next">Next →</button>
      </div>
      <button class="deck-skip">Skip intro</button>
    </div>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));

  const track = overlay.querySelector('.deck-track');
  const dots = [...overlay.querySelectorAll('.deck-dots span')];
  const prev = overlay.querySelector('.deck-prev');
  const next = overlay.querySelector('.deck-next');
  const count = overlay.querySelector('.deck-count');

  function render(animate = true) {
    track.style.transition = animate ? 'transform 0.32s cubic-bezier(0.22,1,0.36,1)' : 'none';
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    prev.disabled = idx === 0;
    next.textContent = idx === cards.length - 1 ? 'Done' : 'Next →';
    count.textContent = `${idx + 1} / ${cards.length}`;
  }
  function goTo(n) {
    idx = Math.max(0, Math.min(cards.length - 1, n));
    render();
  }
  function close() {
    overlay.classList.remove('show');
    setTimeout(() => overlay.remove(), 280);
    document.removeEventListener('keydown', onKey);
    if (onClose) onClose();
  }
  function start() {
    close();
    if (onStart) onStart();
  }

  function onKey(e) {
    if (e.key === 'ArrowRight') goTo(idx + 1);
    else if (e.key === 'ArrowLeft') goTo(idx - 1);
    else if (e.key === 'Escape') close();
  }
  document.addEventListener('keydown', onKey);

  next.addEventListener('click', () => (idx === cards.length - 1 ? start() : goTo(idx + 1)));
  prev.addEventListener('click', () => goTo(idx - 1));
  overlay.querySelector('.deck-close').addEventListener('click', close);
  overlay.querySelector('.deck-skip').addEventListener('click', start);
  overlay.addEventListener('click', (e) => {
    if (e.target.closest('.deck-start')) start();
    else if (e.target === overlay) close();
  });

  // Touch / pointer swipe
  let startX = 0, dx = 0, dragging = false;
  const viewport = overlay.querySelector('.deck-viewport');
  viewport.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX;
    dx = 0;
    track.style.transition = 'none';
  });
  viewport.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    track.style.transform = `translateX(calc(-${idx * 100}% + ${dx}px))`;
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(dx) > 45) goTo(idx + (dx < 0 ? 1 : -1));
    else render();
    dx = 0;
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', endDrag);

  render(false);
  return { close };
}
