// The Banyan of Knowledge — procedural SVG tree that grows with learning progress.
// stats: { stage 0-7, branches: [{skill}], leafScore 0-1, fruits, name }

const LEAF_COLORS = ['#1a7a4f', '#23996a', '#2fb87f', '#46d399', '#1d8a5c'];
const FRUIT = '#f4b440';
const TRUNK = '#7a5638';
const TRUNK_DARK = '#5f4129';

function rnd(seed) {
  // deterministic pseudo-random so the tree doesn't reshuffle every render
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function cluster(cx, cy, r, seedN, density = 1) {
  const rand = rnd(seedN);
  const blobs = [];
  const n = 3 + Math.round(2 * density);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + rand();
    const dist = r * 0.45 * rand();
    const bx = cx + Math.cos(a) * dist;
    const by = cy + Math.sin(a) * dist * 0.7;
    const br = r * (0.55 + 0.45 * rand()) * (0.75 + 0.35 * density);
    const color = LEAF_COLORS[Math.floor(rand() * LEAF_COLORS.length)];
    blobs.push(`<ellipse cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" rx="${br.toFixed(1)}" ry="${(br * 0.82).toFixed(1)}" fill="${color}" opacity="0.92"/>`);
  }
  return blobs.join('');
}

function fruitDot(x, y) {
  return `<g class="fruit"><circle cx="${x}" cy="${y}" r="7.5" fill="${FRUIT}" stroke="#3c2a17" stroke-width="1.6"/><circle cx="${x - 2.4}" cy="${y - 2.4}" r="2.2" fill="#ffe2a1"/><path d="M ${x} ${y - 7} q 2 -4 5 -5" stroke="#3c2a17" stroke-width="1.6" fill="none"/></g>`;
}

export function renderTree(container, stats, opts = {}) {
  const mini = opts.mini || false;
  const { stage, branches, leafScore, fruits } = stats;
  const W = 420;
  const H = 430;
  const groundY = 372;
  const cx = 210;
  const parts = [];

  // sky glow + ground
  parts.push(`
    <defs>
      <radialGradient id="glow" cx="50%" cy="38%" r="60%">
        <stop offset="0%" stop-color="#2c8a5e" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#2c8a5e" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#27462f"/>
        <stop offset="100%" stop-color="#16291d"/>
      </linearGradient>
      <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${TRUNK_DARK}"/>
        <stop offset="55%" stop-color="${TRUNK}"/>
        <stop offset="100%" stop-color="${TRUNK_DARK}"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#glow)"/>
    <ellipse cx="${cx}" cy="${groundY + 26}" rx="170" ry="42" fill="url(#soil)"/>
    <ellipse cx="${cx}" cy="${groundY + 6}" rx="120" ry="16" fill="#1d3526"/>
  `);

  if (stage === 0) {
    // a seed, planted — with a hopeful shimmer
    parts.push(`
      <g class="sway" style="transform-origin:${cx}px ${groundY}px">
        <ellipse cx="${cx}" cy="${groundY - 4}" rx="11" ry="14" fill="#8a6a3f" stroke="#5f4129" stroke-width="2"/>
        <path d="M ${cx} ${groundY - 16} q 1 -6 6 -9" stroke="#46d399" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>
      <circle cx="${cx}" cy="${groundY - 30}" r="2.2" fill="#46d399" class="spark"/>
      <circle cx="${cx - 26}" cy="${groundY - 14}" r="1.6" fill="#f4b440" class="spark s2"/>
      <circle cx="${cx + 30}" cy="${groundY - 22}" r="1.6" fill="#46d399" class="spark s3"/>
    `);
  } else if (stage === 1) {
    // sprout
    parts.push(`
      <g class="sway" style="transform-origin:${cx}px ${groundY}px">
        <path d="M ${cx} ${groundY} C ${cx - 2} ${groundY - 18} ${cx + 2} ${groundY - 26} ${cx} ${groundY - 34}" stroke="#2fa572" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M ${cx} ${groundY - 30} q -16 -8 -22 -22 q 18 2 22 16" fill="#2fb87f"/>
        <path d="M ${cx} ${groundY - 32} q 16 -10 20 -26 q -19 4 -21 20" fill="#46d399"/>
      </g>
    `);
  } else if (stage === 2) {
    // seedling
    parts.push(`<g class="sway" style="transform-origin:${cx}px ${groundY}px">
      <path d="M ${cx} ${groundY} C ${cx - 3} ${groundY - 30} ${cx + 3} ${groundY - 48} ${cx} ${groundY - 66}" stroke="#3f7a4a" stroke-width="6" fill="none" stroke-linecap="round"/>
      ${cluster(cx, groundY - 78, 26, 7, 0.8)}
      <path d="M ${cx} ${groundY - 40} q -20 -6 -28 -20 q 22 0 28 14" fill="#2fb87f"/>
      <path d="M ${cx} ${groundY - 52} q 20 -8 26 -22 q -23 2 -27 17" fill="#46d399"/>
    </g>`);
  } else {
    // sapling and beyond: trunk + branch system
    const grown = Math.min(1, (stage - 2) / 3); // 0.33 sapling → 1.0 stage>=5
    const trunkTop = groundY - (90 + 110 * grown);
    const trunkW = 8 + 16 * grown;

    // base roots
    parts.push(`
      <path d="M ${cx - trunkW / 2 - 2} ${groundY - 8} C ${cx - trunkW - 18} ${groundY + 2} ${cx - trunkW - 30} ${groundY + 8} ${cx - trunkW - 44} ${groundY + 10}" stroke="${TRUNK_DARK}" stroke-width="${4 + 3 * grown}" fill="none" stroke-linecap="round"/>
      <path d="M ${cx + trunkW / 2 + 2} ${groundY - 8} C ${cx + trunkW + 16} ${groundY + 2} ${cx + trunkW + 28} ${groundY + 8} ${cx + trunkW + 42} ${groundY + 10}" stroke="${TRUNK_DARK}" stroke-width="${4 + 3 * grown}" fill="none" stroke-linecap="round"/>
    `);

    // trunk (tapered path)
    parts.push(`
      <path d="M ${cx - trunkW / 2} ${groundY}
               C ${cx - trunkW / 2 - 3} ${groundY - 60} ${cx - trunkW / 4} ${trunkTop + 40} ${cx - 3} ${trunkTop}
               L ${cx + 3} ${trunkTop}
               C ${cx + trunkW / 4} ${trunkTop + 40} ${cx + trunkW / 2 + 3} ${groundY - 60} ${cx + trunkW / 2} ${groundY} Z"
            fill="url(#trunkGrad)"/>
    `);

    const swayOpen = `<g class="sway" style="transform-origin:${cx}px ${groundY - 40}px">`;
    const canopyParts = [];
    const density = 0.6 + 0.7 * leafScore;

    // crown cluster at trunk top (from stage 4 it gets generous)
    const crownR = 26 + 26 * grown + 14 * leafScore;
    canopyParts.push(cluster(cx, trunkTop - crownR * 0.4, crownR, 99, density));

    // branches: one per completed module
    const maxShown = 8;
    const shown = branches.slice(0, maxShown);
    const tips = [];
    shown.forEach((b, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      const tier = Math.floor(i / 2); // 0 highest pair, deeper tiers attach lower
      const frac = Math.min(0.73, 0.28 + tier * 0.15); // height fraction along trunk from top
      const startY = trunkTop + (groundY - trunkTop) * frac * (1 - 0.25 * grown);
      const len = (66 + 28 * grown) * (1 - tier * 0.10);
      const tipX = cx + side * len;
      const tipY = startY - 30 - tier * 6;
      const ctrlX = cx + side * len * 0.45;
      const ctrlY = startY - 8;
      canopyParts.push(
        `<path d="M ${cx} ${startY} Q ${ctrlX} ${ctrlY} ${tipX} ${tipY}" stroke="${TRUNK}" stroke-width="${5.5 - tier * 0.8}" fill="none" stroke-linecap="round"/>`
      );
      const cr = (20 + 14 * grown) * (1 - tier * 0.08) + 10 * leafScore;
      canopyParts.push(cluster(tipX, tipY - 6, cr, 31 + i * 17, density));
      tips.push({ x: tipX, y: tipY, side, tier, skill: b.skill, cr });
    });

    // fruits: hang below the earliest branch clusters, overflow onto the crown
    const fruitParts = [];
    let placed = 0;
    for (let f = 0; f < fruits && f < 6; f++) {
      let fx, fy;
      if (tips[f]) {
        fx = tips[f].x + tips[f].side * 8;
        fy = tips[f].y + tips[f].cr * 0.85;
      } else {
        fx = cx - 30 + placed * 24;
        fy = trunkTop - 4;
      }
      fruitParts.push(fruitDot(fx, fy));
      placed++;
    }

    // aerial roots (the banyan signature) from stage 6
    if (stage >= 6) {
      const rootFrom = tips.slice(0, 3);
      rootFrom.forEach((t, i) => {
        const dropX = t.x * 0.86 + cx * 0.14 + (i - 1) * 6;
        canopyParts.push(
          `<path d="M ${(cx + t.x) / 2} ${t.y + 14} C ${dropX} ${(t.y + groundY) / 2} ${dropX + t.side * 6} ${groundY - 30} ${dropX} ${groundY + 2}" stroke="#6b4d31" stroke-width="3.4" fill="none" stroke-linecap="round" opacity="0.9"/>`
        );
      });
    }

    parts.push(swayOpen + canopyParts.join('') + fruitParts.join('') + '</g>');

    // skill labels on branches (full view only): upper tiers label above the
    // cluster, lower tiers below — keeps eight labels from colliding
    if (!mini) {
      tips.forEach((t) => {
        const anchor = t.side < 0 ? 'end' : 'start';
        const lx = t.x + t.side * (t.cr * 0.55 + 8);
        const ly = t.tier < 2 ? t.y - t.cr * 0.75 : t.y + t.cr * 0.85 + 10;
        parts.push(
          `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" class="branch-label">${t.skill}</text>`
        );
      });
    }
  }

  // fireflies on flourishing tree
  if (stage >= 7) {
    parts.push(`
      <circle cx="120" cy="150" r="2.4" fill="#f4d77f" class="spark"/>
      <circle cx="312" cy="120" r="2" fill="#f4d77f" class="spark s2"/>
      <circle cx="280" cy="220" r="1.8" fill="#f4d77f" class="spark s3"/>
      <circle cx="96" cy="240" r="1.8" fill="#f4d77f" class="spark s2"/>
    `);
  }

  container.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Your learning tree, stage ${stage} of 7" class="tree-svg ${mini ? 'tree-mini' : ''}">${parts.join('')}</svg>`;
}
