/* Croquis V2 kit — shared drawing + UI pieces for the non-game screens. Needs theme 02-croquis-v2.js (solid, INK, RED…). */
const K = {
  // a voussoir lying upright on the ground: centre (x,y), extra rotation deg, scale s
  laid(G, st, x, y, deg = 0, s = 0.75, id, o = {}) {
    const c = G.center(st), th = (st.m - 90 + deg) * Math.PI / 180, cs = Math.cos(th), sn = Math.sin(th);
    const p = G.pts(st).map(([px, py]) => { const dx = (px - c[0]) * s, dy = (py - c[1]) * s; return [x + dx * cs - dy * sn, y + dx * sn + dy * cs]; });
    return solid(p, id, Object.assign({ face: st.key ? PAPER : FACE, v: [6, -6] }, o));
  },
  mason(id, x, y, flip = 1, hat = 0, pose = 'idle', sc = 1.25) {
    const arms = { cheer: 'M-5 1 L-11 -11 M5 1 L11 -11', head: 'M-5 1 Q-12 -6 -5 -12 M5 1 Q12 -6 5 -12', point: 'M5 1 L15 -6', idle: '' }[pose];
    return `<g transform="translate(${x} ${y}) scale(${sc * flip} ${sc})" filter="url(#${id}wob)">
      <ellipse cx="3" cy="13" rx="9" ry="2.4" fill="${INK}" opacity=".16"/>
      ${arms ? `<path d="${arms}" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>` : ''}
      <path d="M-6 12 V1 a6 6 0 0 1 12 0 V12 Z" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/><path d="M1 -4.8 a6 6 0 0 1 5 5.8 V12 H1 Z" fill="url(#${id}hat)"/>
      <circle cx="0" cy="-8" r="5" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/>
      ${hat ? `<path d="M-6 -9 a6 6 0 0 1 12 0 Z" fill="${RED}" stroke="${INK}" stroke-width="1.3"/><path d="M-7.5 -9 h15" stroke="${INK}" stroke-width="1.6"/>` : `<path d="M-5 -10 a5 5 0 0 1 10 0" fill="${INK}"/>`}</g>`;
  },
  bubble(id, x, y, t, w, tail = 0) {
    return `<g transform="translate(${x} ${y})" filter="url(#${id}wob)">
      ${[3, 2, 1].map(k => `<rect x="${-w / 2 + k}" y="${-13 - k}" width="${w}" height="19" rx="9.5" fill="${INK}"/>`).join('')}
      <rect x="${-w / 2}" y="-13" width="${w}" height="19" rx="9.5" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/>
      <path d="M${tail - 4} 5.5 l3 6 4 -6" fill="${PAPER}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/><path d="M${tail - 4.5} 4.6 h8" stroke="${PAPER}" stroke-width="2.4"/>
      <text x="0" y="0.5" text-anchor="middle" font-family="URW Bookman,Georgia,serif" font-style="italic" font-size="10" fill="${INK}">${t}</text></g>`;
  },
  dustCloud(id, x, y, w) {
    return `<g filter="url(#${id}wob)">${[[-.4, 0, .32], [0, -6, .4], [.38, 1, .3], [.15, 6, .36], [-.2, 7, .3]].map(([dx, dy, r]) =>
      `<ellipse cx="${x + dx * w}" cy="${y + dy}" rx="${r * w}" ry="${r * w * .42}" fill="${PAPER}" stroke="${INK}" stroke-width="1.4"/><ellipse cx="${x + dx * w}" cy="${y + dy}" rx="${r * w}" ry="${r * w * .42}" fill="url(#${id}hat)" opacity=".5"/>`).join('')}</g>`;
  },
  icon: {
    mason: `<svg width="20" height="24" viewBox="-8 -15 18 30"><path d="M-6 12 V1 a6 6 0 0 1 12 0 V12 Z" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/><circle cx="0" cy="-8" r="5" fill="${PAPER}" stroke="${INK}" stroke-width="1.6"/><path d="M-6 -9 a6 6 0 0 1 12 0 Z" fill="${RED}" stroke="${INK}" stroke-width="1.3"/></svg>`,
    arch: `<svg width="22" height="20" viewBox="0 0 26 24"><path d="M3 22 V12 A10 9 0 0 1 23 12 V22 H18 V13 A5 4.5 0 0 0 8 13 V22 Z" fill="${FACE}" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/><path d="M11 3 h4 l1 6 h-6z" fill="${PAPER}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    comment: `<svg width="18" height="16" viewBox="0 0 18 16"><path d="M2 2 h14 v9 h-8 l-4 3 v-3 h-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`
  },
  brand(G, sub) {
    return `<div class="g-brand">${T.wordmark()}<span class="no">${sub || `Arch No.&nbsp;${G.D.arch}<i>·</i>${G.D.date}`}</span></div>`;
  },
  streakChip(n, note) { return `<div class="g-streak">${T.streak(n)}<span><b>${n}</b>-day streak${note ? ` <em>${note}</em>` : ''}</span></div>`; }
};
window.SCREENS = window.SCREENS || {};
