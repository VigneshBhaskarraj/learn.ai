// Generates PWA icons (PNG) with zero dependencies.
// Renders a stylized banyan tree on a deep-forest gradient, encodes as PNG via zlib.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// ---------- minimal PNG encoder ----------
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePNG(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // raw scanlines, filter 0 per row
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------- tiny software rasterizer ----------
function makeCanvas(size) {
  const px = Buffer.alloc(size * size * 4);
  return {
    size,
    px,
    blend(x, y, r, g, b, a) {
      if (x < 0 || y < 0 || x >= size || y >= size || a <= 0) return;
      const i = (y * size + x) * 4;
      const ia = 1 - a;
      px[i] = Math.round(r * a + px[i] * ia);
      px[i + 1] = Math.round(g * a + px[i + 1] * ia);
      px[i + 2] = Math.round(b * a + px[i + 2] * ia);
      px[i + 3] = Math.min(255, Math.round(255 * a + px[i + 3] * ia));
    },
  };
}

function fillCircle(c, cx, cy, rad, [r, g, b], alpha = 1) {
  const x0 = Math.floor(cx - rad - 1), x1 = Math.ceil(cx + rad + 1);
  const y0 = Math.floor(cy - rad - 1), y1 = Math.ceil(cy + rad + 1);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const cov = Math.min(1, Math.max(0, rad - d + 0.5)); // 1px AA edge
      if (cov > 0) c.blend(x, y, r, g, b, cov * alpha);
    }
  }
}

// tapered vertical trunk: width varies linearly from wBottom to wTop, slight curve
function fillTrunk(c, cx, yTop, yBottom, wTop, wBottom, [r, g, b]) {
  for (let y = Math.floor(yTop); y <= Math.ceil(yBottom); y++) {
    const t = (y - yTop) / (yBottom - yTop);
    const w = wTop + (wBottom - wTop) * t;
    const wobble = Math.sin(t * Math.PI) * w * 0.06;
    const left = cx - w / 2 + wobble;
    const right = cx + w / 2 + wobble;
    for (let x = Math.floor(left) - 1; x <= Math.ceil(right) + 1; x++) {
      const covL = Math.min(1, Math.max(0, x + 1 - left));
      const covR = Math.min(1, Math.max(0, right - x));
      const cov = Math.min(covL, covR);
      if (cov > 0) c.blend(x, y, r, g, b, cov);
    }
  }
}

function fillLine(c, x0, y0, x1, y1, width, color) {
  const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 2);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    fillCircle(c, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, width / 2, color);
  }
}

function drawIcon(size, { maskable = false } = {}) {
  const c = makeCanvas(size);
  const S = size;
  const pad = maskable ? 0.12 * S : 0; // extra safe-zone padding for maskable
  const cornerR = maskable ? 0 : S * 0.225;

  // background: vertical gradient deep teal -> dark forest, rounded corners
  const top = [10, 28, 26], bot = [13, 44, 36];
  for (let y = 0; y < S; y++) {
    const t = y / S;
    const r = top[0] + (bot[0] - top[0]) * t;
    const g = top[1] + (bot[1] - top[1]) * t;
    const b = top[2] + (bot[2] - top[2]) * t;
    for (let x = 0; x < S; x++) {
      let a = 1;
      if (cornerR > 0) {
        const dx = Math.max(cornerR - x, x - (S - 1 - cornerR), 0);
        const dy = Math.max(cornerR - y, y - (S - 1 - cornerR), 0);
        const d = Math.hypot(dx, dy);
        a = Math.min(1, Math.max(0, cornerR - d + 0.5));
        if (dx === 0 || dy === 0) a = 1;
      }
      if (a > 0) c.blend(x, y, r, g, b, a);
    }
  }

  // soft glow behind canopy
  const cx = S / 2;
  const glowY = S * 0.40;
  for (let i = 8; i >= 1; i--) {
    fillCircle(c, cx, glowY, (S * 0.30 * i) / 8 + pad * 0.2, [45, 110, 80], 0.05);
  }

  // ground mound
  const groundY = S - pad - S * 0.16;
  fillCircle(c, cx, groundY + S * 0.16, S * 0.30, [30, 58, 45]);

  // trunk
  const trunkTop = S * 0.42;
  fillTrunk(c, cx, trunkTop, groundY + S * 0.04, S * 0.045, S * 0.10, [110, 78, 48]);

  // banyan prop roots
  fillLine(c, cx - S * 0.10, S * 0.52, cx - S * 0.17, groundY + S * 0.02, S * 0.022, [96, 68, 42]);
  fillLine(c, cx + S * 0.10, S * 0.54, cx + S * 0.16, groundY + S * 0.02, S * 0.022, [96, 68, 42]);

  // branches
  fillLine(c, cx, S * 0.46, cx - S * 0.16, S * 0.36, S * 0.030, [110, 78, 48]);
  fillLine(c, cx, S * 0.44, cx + S * 0.15, S * 0.34, S * 0.030, [110, 78, 48]);

  // canopy: layered emerald circles
  const leafDark = [22, 101, 70], leaf = [16, 145, 90], leafLight = [52, 190, 120];
  fillCircle(c, cx - S * 0.155, S * 0.345, S * 0.135, leafDark);
  fillCircle(c, cx + S * 0.155, S * 0.335, S * 0.135, leafDark);
  fillCircle(c, cx, S * 0.27, S * 0.165, leaf);
  fillCircle(c, cx - S * 0.085, S * 0.305, S * 0.115, leaf);
  fillCircle(c, cx + S * 0.09, S * 0.30, S * 0.115, leafLight);
  fillCircle(c, cx, S * 0.245, S * 0.105, leafLight);

  // golden fruits
  const gold = [244, 180, 64];
  fillCircle(c, cx - S * 0.13, S * 0.33, S * 0.026, gold);
  fillCircle(c, cx + S * 0.135, S * 0.295, S * 0.026, gold);
  fillCircle(c, cx + 0.02 * S, S * 0.215, S * 0.026, gold);

  return encodePNG(S, S, c.px);
}

mkdirSync(join(root, 'icons'), { recursive: true });
const targets = [
  ['icon-192.png', 192, {}],
  ['icon-512.png', 512, {}],
  ['icon-maskable-512.png', 512, { maskable: true }],
  ['apple-touch-icon.png', 180, { maskable: true }],
];
for (const [name, size, opts] of targets) {
  writeFileSync(join(root, 'icons', name), drawIcon(size, opts));
  console.log('wrote icons/' + name);
}
