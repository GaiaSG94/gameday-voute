const T = {
  vb: '-232 -215 464 400', lift: 44,
  rule: 'Drop each stone into the red slot, base first. One wrong stone and the whole arch comes down.',
  wordmark: () => '<span class="wm">Voûte</span>',
  streak: n => `<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13" fill="#d2553a" stroke="#221c16" stroke-width="2"/><path d="M8 20 L8 13 A7 7 0 0 1 22 13 L22 20" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  defs: id => `
    <filter id="${id}wob" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="2.6"/></filter>
    <filter id="${id}stk" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#221c16" flood-opacity=".18"/></filter>
    <pattern id="${id}hat" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="5" stroke="#221c16" stroke-width=".8" stroke-opacity=".45"/></pattern>
    <marker id="${id}arw" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M1 1 L8 5 L1 9" fill="none" stroke="#221c16" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>`,
  back: (id) => `<g filter="url(#${id}wob)"><path d="M-226 112 C-120 109 -40 114 60 111 S180 113 226 110" fill="none" stroke="#221c16" stroke-width="2.2" stroke-linecap="round"/>
     <path d="M-200 124 l14 0 M-160 122 l22 0 M-60 125 l10 0 M40 123 l26 0 M150 125 l14 0 M186 121 l9 0" stroke="#221c16" stroke-width="1.4" stroke-linecap="round" opacity=".55"/></g>`,
  piers: (id) => {
    let s = `<g filter="url(#${id}wob)">`;
    [[-150, -100], [100, 150]].forEach(([a, b]) => {
      s += `<rect x="${a}" y="-2" width="${b - a}" height="113" fill="#e8dfcd" stroke="#221c16" stroke-width="2.2" stroke-linejoin="round"/>`;
      s += `<rect x="${a > 0 ? b - 16 : b - 16}" y="-2" width="16" height="113" fill="url(#${id}hat)"/>`;
      s += `<path d="M${a} 36 H${b} M${a} 74 H${b} M${a + 24} -2 V36 M${a + 14} 36 V74 M${a + 30} 74 V111" stroke="#221c16" stroke-width="1.4"/>`;
      s += `<rect x="${a - 5}" y="-9" width="${b - a + 10}" height="9" fill="#fff" stroke="#221c16" stroke-width="2.2"/>`;
    });
    return s + '</g>';
  },
  stone: (d, state, st, id, G) => {
    if (state === 'tray' || state === 'locked' || state === 'hand')
      return `<g filter="url(#${id}stk)"><path d="${d}" fill="#fff" stroke="#fff" stroke-width="9" stroke-linejoin="round"/></g>
              <g filter="url(#${id}wob)"><path d="${d}" fill="${st.key ? '#fff' : '#e8dfcd'}" stroke="#221c16" stroke-width="2.2" stroke-linejoin="round" ${state === 'locked' ? 'stroke-dasharray="5 4"' : ''}/></g>`;
    const c = G.center(st);
    const marks = `<path d="M${(c[0] - 6).toFixed(1)} ${(c[1] - 3).toFixed(1)} l5 2 M${(c[0] + 2).toFixed(1)} ${(c[1] + 4).toFixed(1)} l6 1" stroke="#221c16" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>`;
    const sh = state === 'held' ? `<path d="${d}" fill="#221c16" opacity=".12" transform="translate(6 14)"/>` : '';
    return `${sh}<g filter="url(#${id}wob)"><path d="${d}" fill="${state === 'held' ? '#fff' : '#e8dfcd'}" stroke="#221c16" stroke-width="2.2" stroke-linejoin="round"/>${marks}</g>`;
  },
  slot: (d, st, id, G) => {
    const c = G.center(st);
    return `<path class="slot" d="${d}" fill="#d2553a" fill-opacity=".18" stroke="#d2553a" stroke-width="2.2" stroke-dasharray="6 4" stroke-linejoin="round"/>`;
  },
  empty: (d, st, id) => `<g filter="url(#${id}wob)"><path d="${d}" fill="none" stroke="#221c16" stroke-opacity=".28" stroke-width="1.3" stroke-dasharray="3 4"/></g>`,
  dust: (id, G, off) => {
    const c = G.center(G.S[G.D.held]);
    // motion strokes above the held stone
    const x = c[0] + off[0], y = c[1] + off[1];
    let s = `<g stroke="#221c16" stroke-width="1.8" stroke-linecap="round" fill="none" filter="url(#${id}wob)"><path d="M${x - 30} ${y - 26} q6 -6 12 -6"/><path d="M${x - 36} ${y - 14} q4 -4 9 -5"/><path d="M${x + 16} ${y - 34} q6 2 9 7"/></g>`;
    s += '<g class="dust" fill="#221c16">';
    [[-10, 26, 1.3, 0], [2, 30, 1, .8], [12, 24, 1.5, 1.6], [-2, 36, .9, 2.3]].forEach(([dx, dy, rr, dl]) =>
      s += `<circle cx="${(x + dx).toFixed(1)}" cy="${(y + dy).toFixed(1)}" r="${rr}" style="animation-delay:${dl}s"/>`);
    return s + '</g>';
  },
  front: (id, G, mode) => {
    // tiny masons on site — the community, in the scene
    const fig = (x, y, flip, hat) => `<g transform="translate(${x} ${y}) scale(${flip} 1)"><ellipse cx="0" cy="13" rx="7" ry="2" fill="#221c16" opacity=".15"/>
      <path d="M-5 12 V2 a5 5 0 0 1 10 0 V12" fill="#fff" stroke="#221c16" stroke-width="1.6"/><circle cx="0" cy="-6" r="4.6" fill="#fff" stroke="#221c16" stroke-width="1.6"/>
      ${hat ? '<path d="M-5 -8 a5 5 0 0 1 10 0 Z" fill="#d2553a" stroke="#221c16" stroke-width="1.2"/>' : '<path d="M-4.5 -8 a4.6 4.6 0 0 1 9 0" fill="#221c16"/>'}</g>`;
    const bub = (x, y, t, w) => `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="-12" width="${w}" height="17" rx="8.5" fill="#fff" stroke="#221c16" stroke-width="1.4"/><path d="M-3 5 l2 5 4 -5" fill="#fff" stroke="#221c16" stroke-width="1.4" stroke-linejoin="round"/><path d="M-3.5 4.2 h7" stroke="#fff" stroke-width="2"/><text x="0" y="0.5" text-anchor="middle" font-family="URW Bookman,Georgia,serif" font-style="italic" font-size="9.5" fill="#221c16">${t}</text></g>`;
    let s = fig(-190, 103, 1, 1) + fig(-172, 106, -1, 0) + fig(-58, 104, 1, 0) + fig(62, 103, -1, 1) + fig(176, 105, -1, 0) + fig(196, 102, 1, 1);
    s += bub(-190, 78, 'hm.', 30) + bub(-58, 80, 'steady…', 50) + bub(182, 76, 'don’t sneeze', 70);
    // hand-drawn arrow into the slot
    const sl = G.center(G.S[G.D.held]);
    s += `<path d="M${(sl[0] - 92).toFixed(1)} ${(sl[1] - 40).toFixed(1)} C${(sl[0] - 70).toFixed(1)} ${(sl[1] - 70).toFixed(1)} ${(sl[0] - 34).toFixed(1)} ${(sl[1] - 30).toFixed(1)} ${(sl[0] - 22).toFixed(1)} ${(sl[1] - 6).toFixed(1)}" fill="none" stroke="#221c16" stroke-width="1.8" stroke-linecap="round" marker-end="url(#${id}arw)" filter="url(#${id}wob)"/>`;
    s += `<text text-anchor="end" x="${(sl[0] - 98).toFixed(1)}" y="${(sl[1] - 36).toFixed(1)}" font-family="URW Bookman,Georgia,serif" font-style="italic" font-size="11" fill="#d2553a">here next</text>`;
    return s;
  }
};
