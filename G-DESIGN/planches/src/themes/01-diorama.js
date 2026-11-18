const T = {
  vb: '-235 -212 470 430', lift: 42,
  rule: 'Drop each stone into the glowing slot, from the base up. One wrong stone and the arch comes down.',
  wordmark: () => '<span class="wm">Voûte</span>',
  streak: n => `<svg width="22" height="22" viewBox="0 0 22 22"><rect x="3" y="13" width="16" height="6" rx="1.5" fill="#d8cdbb" stroke="#4a3b2a" stroke-width="1"/><rect x="5" y="7" width="12" height="6" rx="1.5" fill="#e6dccb" stroke="#4a3b2a" stroke-width="1"/><path d="M8 7 L11 2 L14 7Z" fill="#b8643a"/></svg>`,
  defs: id => `
    <filter id="${id}rel" x="-30%" y="-30%" width="160%" height="170%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="n"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="b"/>
      <feComposite in="n" in2="b" operator="arithmetic" k2=".16" k3="1" result="bump"/>
      <feDiffuseLighting in="bump" surfaceScale="5" diffuseConstant="1.32" lighting-color="#fff9ee" result="lit"><feDistantLight azimuth="235" elevation="40"/></feDiffuseLighting>
      <feComposite in="lit" in2="SourceGraphic" operator="arithmetic" k1="1" result="tex"/>
      <feComposite in="tex" in2="SourceAlpha" operator="in" result="t"/>
      <feDropShadow in="t" dx="3" dy="5" stdDeviation="3" flood-color="#4a3b2a" flood-opacity=".32"/>
    </filter>
    <filter id="${id}relH" x="-40%" y="-40%" width="180%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" result="n"/>
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="b"/>
      <feComposite in="n" in2="b" operator="arithmetic" k2=".16" k3="1" result="bump"/>
      <feDiffuseLighting in="bump" surfaceScale="5" diffuseConstant="1.36" lighting-color="#fffaf0" result="lit"><feDistantLight azimuth="235" elevation="40"/></feDiffuseLighting>
      <feComposite in="lit" in2="SourceGraphic" operator="arithmetic" k1="1" result="tex"/>
      <feComposite in="tex" in2="SourceAlpha" operator="in" result="t"/>
      <feDropShadow in="t" dx="10" dy="22" stdDeviation="8" flood-color="#4a3b2a" flood-opacity=".28"/>
    </filter>
    <filter id="${id}mist" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
    <radialGradient id="${id}sun" cx="30%" cy="10%" r="70%"><stop offset="0" stop-color="#fffdf7" stop-opacity=".95"/><stop offset="1" stop-color="#fffdf7" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}earth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d7a60"/><stop offset=".35" stop-color="#6b5840"/><stop offset="1" stop-color="#4a3b2a"/></linearGradient>
    <linearGradient id="${id}top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8dfcf"/><stop offset="1" stop-color="#d3c6b1"/></linearGradient>`,
  back: (id) => {
    let s = `<ellipse cx="-60" cy="-120" rx="260" ry="190" fill="url(#${id}sun)"/>`;
    // floating plinth: front face with rough underside
    s += `<path d="M-205 128 L205 128 L196 150 L178 158 L160 176 L120 182 L96 198 L52 196 L20 210 L-18 200 L-58 204 L-96 190 L-132 184 L-168 168 L-190 152Z" fill="url(#${id}earth)"/>`;
    s += `<path d="M-205 128 L205 128 L200 138 L-200 138Z" fill="#b9aa91"/>`;
    s += `<path d="M-180 104 L180 104 L205 128 L-205 128Z" fill="url(#${id}top)"/>`;
    for (let x = -150; x <= 150; x += 50) s += `<path d="M${x} 104 L${x * 1.14} 128" stroke="#bfb19a" stroke-width=".8"/>`;
    s += `<path d="M-192 116 L192 116" stroke="#c4b7a1" stroke-width=".7"/>`;
    // pebbles & rubble
    s += `<g fill="#cdbfa8" stroke="#9c8b70" stroke-width=".6"><path d="M-182 120 l9 -4 7 3 -3 4 -11 1z"/><path d="M164 118 l6 -5 9 2 1 5 -10 2z"/><path d="M178 123 l4 -3 5 1 0 3z"/></g>`;
    // mist banks
    s += `<g filter="url(#${id}mist)" fill="#fbf8f2" opacity=".95"><ellipse cx="-190" cy="190" rx="90" ry="26"/><ellipse cx="190" cy="186" rx="100" ry="28"/><ellipse cx="0" cy="214" rx="150" ry="20"/><ellipse cx="-230" cy="60" rx="40" ry="14" opacity=".7"/><ellipse cx="226" cy="10" rx="46" ry="12" opacity=".6"/></g>`;
    return s;
  },
  piers: (id) => {
    let s = '';
    [[-150, -100], [100, 150]].forEach(([a, b]) => {
      [[0, 36], [36, 72], [72, 112]].forEach(([y0, y1], k) =>
        s += `<rect x="${a + (k % 2 ? 1 : 0)}" y="${y0}" width="${b - a - 1}" height="${y1 - y0}" rx="1.5" fill="${['#d8cdbb', '#d2c5b0', '#dad0bf'][k]}" filter="url(#${id}rel)"/>`);
      s += `<rect x="${a - 4}" y="-7" width="${b - a + 8}" height="9" rx="1.5" fill="#e4dbcb" stroke="#bcae96" stroke-width=".6"/>`;
    });
    return s;
  },
  stone: (d, state, st, id) => {
    const fills = ['#d8cdbb', '#d3c6b2', '#ddd3c2', '#d1c4ae', '#e0d6c4', '#d6cab6', '#cfc2ab', '#dad0be', '#d4c8b4'];
    const fill = st.key ? '#e2d8c6' : fills[st.i];
    const flt = state === 'held' ? `${id}relH` : `${id}rel`;
    return `<path d="${d}" fill="${fill}" filter="url(#${flt})"/>`;
  },
  slot: (d) => `<path class="slot" d="${d}" fill="#b8643a" fill-opacity=".16" stroke="#b8643a" stroke-width="1.4" stroke-dasharray="4 3"/>`,
  empty: (d) => `<path d="${d}" fill="#4a3b2a" fill-opacity=".04" stroke="#4a3b2a" stroke-opacity=".22" stroke-width=".9" stroke-dasharray="2 3"/>`,
  dust: (id, G, off) => {
    const c = G.center(G.S[G.D.held]); let s = '<g class="dust" fill="#a8977c">';
    [[-14, 6, 1.4, 0], [-4, 14, 1, .7], [8, 9, 1.6, 1.4], [16, 18, 1.1, 2.1], [-20, 20, 1, 2.6], [2, 4, .9, 1.9]].forEach(([dx, dy, rr, dl]) =>
      s += `<circle cx="${(c[0] + off[0] + dx).toFixed(1)}" cy="${(c[1] + off[1] + 18 + dy).toFixed(1)}" r="${rr}" style="animation-delay:${dl}s"/>`);
    return s + '</g>';
  },
  front: () => ''
};
