const INK = '#221c16', PAPER = '#fffdf7', FACE = '#e8dfcd', TOP = '#f1eadb', SHADE = '#cdbfa5', RED = '#d2553a';
const V = [8, -8];              // receding axis: up-right (same as every UI block)
const LIGHT = [0.6, 0.8];       // light travels down-right (comes from upper-left)
const fx = n => n.toFixed(1);
const pth = p => 'M' + p.map(q => fx(q[0]) + ' ' + fx(q[1])).join('L') + 'Z';
// Draw a polygon as a solid block in cabinet projection, ink outlines, shaded/hatched sides.
const solid = (p, id, o = {}) => {
  const v = o.v || V, n = p.length;
  const cx = p.reduce((s, q) => s + q[0], 0) / n, cy = p.reduce((s, q) => s + q[1], 0) / n;
  let sides = '';
  for (let i = 0; i < n; i++) {
    const a = p[i], b = p[(i + 1) % n], ex = b[0] - a[0], ey = b[1] - a[1], L = Math.hypot(ex, ey) || 1;
    let nx = ey / L, ny = -ex / L; const mx = (a[0] + b[0]) / 2 - cx, my = (a[1] + b[1]) / 2 - cy;
    if (nx * mx + ny * my < 0) { nx = -nx; ny = -ny; }
    if (nx * v[0] + ny * v[1] <= 0.05) continue;
    const lit = -(nx * LIGHT[0] + ny * LIGHT[1]);
    const q = [a, b, [b[0] + v[0], b[1] + v[1]], [a[0] + v[0], a[1] + v[1]]];
    const fill = lit > 0.2 ? TOP : SHADE;
    sides += `<path d="${pth(q)}" fill="${o.sideFill || fill}" stroke="${o.stroke || INK}" stroke-width="${o.sw || 1.6}" stroke-linejoin="round"/>`;
    if (lit <= 0.2 && !o.noHatch) sides += `<path d="${pth(q)}" fill="url(#${id}hat)"/>`;
  }
  return `<g filter="url(#${id}wob)">${sides}<path d="${pth(p)}" fill="${o.face || FACE}" stroke="${o.stroke || INK}" stroke-width="${o.sw || 2.2}" stroke-linejoin="round" ${o.dash ? 'stroke-dasharray="' + o.dash + '"' : ''}/>${o.inner || ''}</g>`;
}
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];

const T = {
  vb: '-236 -228 472 404', lift: 46,
  rule: 'Drop each stone into the <em>red slot</em>, base first. One wrong stone and the whole arch comes down.',
  wordmark: () => `<span class="wm">VO<span class="u">U<svg viewBox="0 0 24 14"><path d="M2 13 V8 A10 7 0 0 1 22 8 V13 H17 V9 A5 3.6 0 0 0 7 9 V13 Z" fill="${RED}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/></svg></span>TE</span>`,
  streak: n => `<svg width="34" height="34" viewBox="-2 -6 36 38">${[3, 2, 1].map(k => `<path d="M3 30 V14 A13 12 0 0 1 29 14 V30 H21 V16 A5 5 0 0 0 11 16 V30 Z" transform="translate(${k} ${-k})" fill="${INK}"/>`).join('')}<path d="M3 30 V14 A13 12 0 0 1 29 14 V30 H21 V16 A5 5 0 0 0 11 16 V30 Z" fill="${RED}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M14 2 h4 l1 7 h-6z" fill="${PAPER}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  defs: id => `
    <filter id="${id}wob" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter>
    <filter id="${id}soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
    <pattern id="${id}hat" width="4.5" height="4.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="4.5" stroke="${INK}" stroke-width=".9" stroke-opacity=".55"/></pattern>
    <pattern id="${id}hatR" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="${RED}" stroke-width="1.2" stroke-opacity=".55"/></pattern>
    <marker id="${id}arw" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L8 5 L1 9" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>`,
  back: (id) => {
    // construction pencil: the arch's circles and centre, like a mason's setting-out drawing
    let s = `<g fill="none" stroke="${INK}" stroke-opacity=".16" stroke-width="1" stroke-dasharray="2 5"><circle cx="0" cy="0" r="100"/><circle cx="0" cy="0" r="150"/><circle cx="0" cy="0" r="176"/><path d="M-226 0 H226 M0 -200 V112"/></g><circle cx="0" cy="0" r="3" fill="none" stroke="${INK}" stroke-opacity=".35"/>`;
    // ground slab drawn in cabinet projection
    const g = [[-224, 112], [224, 112], [224, 124], [-224, 124]];
    s += solid(g, id, { v: [14, -14], face: '#e9e0cc', noHatch: true, sideFill: '#f4eee2' });
    s += `<g filter="url(#${id}wob)" stroke="${INK}" stroke-width="1.2" stroke-linecap="round" opacity=".5"><path d="M-200 118 h12 M-150 117 h20 M-40 119 h8 M40 118 h24 M150 119 h12"/></g>`;
    // soft cast shadows (light from upper-left)
    s += `<g filter="url(#${id}soft)" fill="${INK}" opacity=".16"><path d="M-100 112 L-62 112 L-40 103 L-86 103Z"/><path d="M150 112 L196 112 L214 103 L164 103Z"/><ellipse cx="0" cy="110" rx="70" ry="5"/></g>`;
    return s;
  },
  piers: (id) => {
    let s = '';
    [[-150, -100], [100, 150]].forEach(([a, b]) => {
      [[74, 112], [36, 74], [0, 36]].forEach(([y0, y1], k) => s += solid(rect(a + (k === 1 ? 2 : 0), y0, b - a - (k === 1 ? 2 : 0), y1 - y0), id));
      s += solid(rect(a - 6, -10, b - a + 12, 10), id, { face: PAPER });
    });
    return s;
  },
  stone: (d, state, st, id, G) => {
    const p = G.pts(st);
    if (state === 'tray' || state === 'locked') {
      const sticker = `<path d="${d}" fill="${PAPER}" stroke="${PAPER}" stroke-width="10" stroke-linejoin="round" transform="translate(3 -3)"/>`;
      return state === 'locked' ? `<path d="${d}" fill="none" stroke="${INK}" stroke-width="2" stroke-dasharray="5 4" stroke-linejoin="round"/>` : sticker + solid(p, id, { face: st.key ? PAPER : FACE });
    }
    const c = G.center(st);
    const chisel = `<path d="M${fx(c[0] - 6)} ${fx(c[1] - 3)} l5 2 M${fx(c[0] + 2)} ${fx(c[1] + 4)} l6 1" stroke="${INK}" stroke-width="1.1" stroke-linecap="round" opacity=".55"/>`;
    return solid(p, id, { face: state === 'held' ? PAPER : state === 'keyset' ? RED : FACE, inner: chisel });
  },
  slot: (d, st, id) => `<path class="slot" d="${d}" fill="url(#${id}hatR)" stroke="${RED}" stroke-width="2.4" stroke-dasharray="6 4" stroke-linejoin="round"/><path d="${d}" fill="${RED}" fill-opacity=".1"/>`,
  empty: (d, st, id) => `<g filter="url(#${id}wob)"><path d="${d}" fill="none" stroke="${INK}" stroke-opacity=".3" stroke-width="1.3" stroke-dasharray="3 4"/></g>`,
  dust: (id, G, off) => {
    const h = G.S[G.D.held], c = G.center(h), x = c[0] + off[0], y = c[1] + off[1];
    // rope + lewis (mason's lifting iron) from the top of the scene
    let s = `<g filter="url(#${id}wob)"><path d="M${fx(x + 30)} -240 Q${fx(x + 22)} ${fx((y - 240) / 2)} ${fx(x + 3)} ${fx(y - 30)}" fill="none" stroke="${INK}" stroke-width="2"/>
      <circle cx="${fx(x + 3)}" cy="${fx(y - 25)}" r="5" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>
      <path d="M${fx(x - 1)} ${fx(y - 20)} L${fx(x - 3)} ${fx(y - 8)} M${fx(x + 7)} ${fx(y - 20)} L${fx(x + 9)} ${fx(y - 8)}" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/></g>`;
    // soft shadow of the held stone falling on its slot
    s += `<path d="${G.poly(h)}" fill="${INK}" opacity=".13" filter="url(#${id}soft)"/>`;
    s += '<g class="dust" fill="#6f6556">';
    [[-12, 26, 1.3, 0], [2, 32, 1, .8], [14, 24, 1.5, 1.6], [-2, 38, .9, 2.3]].forEach(([dx, dy, rr, dl]) =>
      s += `<circle cx="${fx(x + dx)}" cy="${fx(y + dy)}" r="${rr}" style="animation-delay:${dl}s"/>`);
    return s + '</g>';
  },
  front: (id, G, mode, o = {}) => {
    if (o.front) return o.front(id);
    const fig = (x, y, flip, hat, tool) => `<g transform="translate(${x} ${y}) scale(${1.25 * flip} 1.25)" filter="url(#${id}wob)">
      <ellipse cx="3" cy="13" rx="9" ry="2.4" fill="${INK}" opacity=".16"/>
      <path d="M-6 12 V1 a6 6 0 0 1 12 0 V12 Z" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/><path d="M1 -4.8 a6 6 0 0 1 5 5.8 V12 H1 Z" fill="url(#${id}hat)"/>
      <circle cx="0" cy="-8" r="5" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/>
      ${hat ? `<path d="M-6 -9 a6 6 0 0 1 12 0 Z" fill="${RED}" stroke="${INK}" stroke-width="1.3"/><path d="M-7.5 -9 h15" stroke="${INK}" stroke-width="1.6"/>` : `<path d="M-5 -10 a5 5 0 0 1 10 0" fill="${INK}"/>`}
      ${tool ? `<path d="M6 3 l7 -7" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><rect x="10" y="-10" width="7" height="4" transform="rotate(45 13 -8)" fill="${PAPER}" stroke="${INK}" stroke-width="1.4"/>` : ''}</g>`;
    const bub = (x, y, t, w, tail = 0) => `<g transform="translate(${x} ${y})" filter="url(#${id}wob)">
      ${[3, 2, 1].map(k => `<rect x="${-w / 2 + k}" y="${-13 - k}" width="${w}" height="19" rx="9.5" fill="${INK}"/>`).join('')}
      <rect x="${-w / 2}" y="-13" width="${w}" height="19" rx="9.5" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/>
      <path d="M${tail - 4} 5.5 l3 6 4 -6" fill="${PAPER}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/><path d="M${tail - 4.5} 4.6 h8" stroke="${PAPER}" stroke-width="2.4"/>
      <text x="0" y="0.5" text-anchor="middle" font-family="URW Bookman,Georgia,serif" font-style="italic" font-size="10" fill="${INK}">${t}</text></g>`;
    let s = fig(-196, 100, 1, 1, 1) + fig(-172, 103, -1, 0, 0) + fig(-52, 100, 1, 0, 0) + fig(58, 101, -1, 1, 0) + fig(176, 102, -1, 0, 1) + fig(202, 99, 1, 1, 0);
    s += bub(-192, 70, 'hm.', 34) + bub(-52, 72, 'steady…', 56) + bub(186, 68, 'don’t sneeze', 78, 6);
    if (('held' in o) && o.held == null) return s;
    const sl = G.center(G.S[G.D.held]);
    s += `<path d="M${fx(sl[0] - 96)} ${fx(sl[1] - 28)} C${fx(sl[0] - 80)} ${fx(sl[1] - 62)} ${fx(sl[0] - 38)} ${fx(sl[1] - 30)} ${fx(sl[0] - 22)} ${fx(sl[1] - 6)}" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round" marker-end="url(#${id}arw)" filter="url(#${id}wob)"/>`;
    s += `<text text-anchor="end" x="${fx(sl[0] - 100)}" y="${fx(sl[1] - 22)}" font-family="URW Bookman,Georgia,serif" font-style="italic" font-size="12" fill="${RED}">here next</text>`;
    return s;
  }
};
// footer icons: same block language
document.addEventListener('voute:rendered', () => {
  const ic = {
    m: `<svg width="22" height="24" viewBox="-8 -15 18 30"><path d="M-6 12 V1 a6 6 0 0 1 12 0 V12 Z" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/><circle cx="0" cy="-8" r="5" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/><path d="M-6 -9 a6 6 0 0 1 12 0 Z" fill="${RED}" stroke="${INK}" stroke-width="1.3"/></svg>`,
    a: `<svg width="24" height="22" viewBox="0 0 26 24"><path d="M3 22 V12 A10 9 0 0 1 23 12 V22 H18 V13 A5 4.5 0 0 0 8 13 V22 Z" fill="${FACE}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><path d="M11 3 h4 l1 6 h-6z" fill="${PAPER}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/></svg>`
  };
  document.querySelectorAll('.g-foot').forEach(f => f.querySelectorAll('span').forEach((s, i) => s.insertAdjacentHTML('afterbegin', i ? ic.a : ic.m)));
});
