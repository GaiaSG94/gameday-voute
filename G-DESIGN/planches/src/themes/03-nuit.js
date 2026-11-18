const T = {
  vb: '-232 -222 464 400', lift: 44,
  rule: 'Drop each stone into the lit slot, base first. One wrong stone and the arch comes down.',
  wordmark: () => '<span class="wm">Voûte</span>',
  streak: n => { let s = '<svg width="58" height="22" viewBox="0 0 58 22" fill="none" stroke="#efe8db" stroke-width="1.6" stroke-linecap="round" opacity=".9">';
    for (let g = 0; g < 2; g++) { const x = g * 26; for (let k = 0; k < 4; k++) s += `<path d="M${x + 3 + k * 5} 4 l${k % 2 ? 1 : -0.5} 14"/>`; s += `<path d="M${x} 15 L${x + 22} 6"/>`; }
    s += '<path d="M53 4 l-.5 14 M57 4 l.5 14" stroke="#f2a93b"/></svg>'; return s; },
  defs: id => `
    <filter id="${id}rel" x="-30%" y="-30%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="11" result="n"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="b"/>
      <feComposite in="n" in2="b" operator="arithmetic" k2=".2" k3="1" result="bump"/>
      <feDiffuseLighting in="bump" surfaceScale="6" diffuseConstant="1.25" lighting-color="#fff1d8" result="lit"><feDistantLight azimuth="305" elevation="32"/></feDiffuseLighting>
      <feComposite in="lit" in2="SourceGraphic" operator="arithmetic" k1="1" result="tex"/>
      <feComposite in="tex" in2="SourceAlpha" operator="in" result="t"/>
      <feDropShadow in="t" dx="-9" dy="11" stdDeviation="2.5" flood-color="#000" flood-opacity=".6"/>
    </filter>
    <filter id="${id}glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="${id}fog" x="-50%" y="-50%" width="200%" height="200%"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="2"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .38  0 0 0 0 .28  0 0 0 .55 -.12"/><feGaussianBlur stdDeviation="3"/></filter>
    <radialGradient id="${id}halo" cx="0" cy="-60" r="230" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f2a93b" stop-opacity=".22"/><stop offset=".55" stop-color="#b8643a" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}beam" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3dc" stop-opacity=".22"/><stop offset="1" stop-color="#fff3dc" stop-opacity="0"/></linearGradient>
    <radialGradient id="${id}pool" cx="0" cy="118" r="200" gradientTransform="translate(0 118) scale(1 .18) translate(0 -118)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f2d9b0" stop-opacity=".35"/><stop offset="1" stop-color="#f2d9b0" stop-opacity="0"/></radialGradient>`,
  back: (id) => `<rect x="-700" y="-500" width="1400" height="1000" fill="url(#${id}halo)"/>
     <rect x="-700" y="-500" width="1400" height="1000" filter="url(#${id}fog)" opacity=".7"/>
     <path d="M520 -520 L330 -520 L-330 520 L700 520Z" fill="url(#${id}beam)"/>
     <ellipse cx="0" cy="118" rx="210" ry="36" fill="url(#${id}pool)"/>
     <path d="M-700 112 H700" stroke="rgba(239,232,219,.12)" stroke-width="1"/>`,
  piers: (id) => {
    let s = '';
    [[-150, -100], [100, 150]].forEach(([a, b]) => {
      [[0, 36], [36, 74], [74, 112]].forEach(([y0, y1], k) => s += `<rect x="${a}" y="${y0}" width="${b - a}" height="${y1 - y0 - 1}" rx="1" fill="${['#d8cdbb', '#cfc2ad', '#d4c8b4'][k]}" filter="url(#${id}rel)"/>`);
      s += `<rect x="${a - 5}" y="-9" width="${b - a + 10}" height="9" rx="1" fill="#ddd2c0" filter="url(#${id}rel)"/>`;
    });
    return s;
  },
  stone: (d, state, st, id, G) => {
    const fills = ['#d8cdbb', '#d2c5b0', '#dcd1bf', '#cfc2ac', '#e0d6c4', '#d5c9b5', '#cdbfa9', '#d9cebc', '#d3c7b2'];
    let s = `<path d="${d}" fill="${st.key ? '#e0d6c4' : fills[st.i]}" filter="url(#${id}rel)"/>`;
    if (state === 'set') { // chalk mason's mark
      const c = G.center(st), m = [[-5, -4, 5, 4, -5, 4, 5, -4], [-5, 4, 0, -5, 5, 4], [-5, -5, -5, 5, 5, 5], [0, -6, 0, 6, -5, 0, 5, 0]][st.i % 4];
      let p = `M${(c[0] + m[0]).toFixed(1)} ${(c[1] + m[1]).toFixed(1)}`; for (let k = 2; k < m.length; k += 2) p += (m.length === 8 && k === 4 ? ' M' : ' L') + `${(c[0] + m[k]).toFixed(1)} ${(c[1] + m[k + 1]).toFixed(1)}`;
      s += `<path d="${p}" fill="none" stroke="#fffaf0" stroke-width="1.3" stroke-linecap="round" opacity=".75"/>`;
    }
    if (state === 'locked') s = `<path d="${d}" fill="none" stroke="rgba(239,232,219,.5)" stroke-width="1.4" stroke-dasharray="4 3"/>`;
    return s;
  },
  slot: (d, st, id) => `<g class="slot" filter="url(#${id}glow)"><path d="${d}" fill="#f2a93b" fill-opacity=".14" stroke="#f2a93b" stroke-width="1.6" stroke-dasharray="5 3"/></g>`,
  empty: (d) => `<path d="${d}" fill="none" stroke="rgba(239,232,219,.2)" stroke-width="1" stroke-dasharray="2 4"/>`,
  dust: (id, G, off) => {
    let s = '<g class="dust" fill="#fff3dc">';
    const pts = [[-140, -150, 1.2, 0], [-60, -170, .9, .6], [20, -120, 1.4, 1.2], [90, -160, 1, 1.8], [140, -90, 1.3, .3], [-20, -60, .8, 2.2], [60, -40, 1.1, 2.7], [170, -30, .9, 1.5], [-110, -80, 1, 2.9], [110, -130, .7, .9]];
    pts.forEach(([x, y, rr, dl]) => s += `<circle cx="${x}" cy="${y}" r="${rr}" opacity=".8" style="animation-delay:${dl}s;animation-duration:${4 + rr}s"/>`);
    return s + '</g>';
  },
  front: () => ''
};
