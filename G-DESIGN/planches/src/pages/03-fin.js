SCREENS.fin = (id, mode, G, state) => {
  const S = G.S, closed = state !== 'fell';
  const all = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const front = closed
    ? (id) => K.mason(id, -196, 100, 1, 1, 'cheer') + K.mason(id, -170, 103, -1, 0, 'cheer') + K.mason(id, -24, 100, 1, 1, 'cheer') + K.mason(id, 30, 101, -1, 0, 'idle') + K.mason(id, 180, 102, -1, 1, 'cheer') + K.mason(id, 204, 99, 1, 0, 'cheer')
      + K.bubble(id, -186, 66, 'she holds.', 64) + K.bubble(id, 30, 72, 'clean work', 64, -4) + K.bubble(id, 192, 66, 'chapeau!', 58, 4)
    : (id) => K.mason(id, -198, 100, 1, 1, 'head') + K.mason(id, -174, 103, -1, 0, 'idle') + K.mason(id, 182, 102, -1, 1, 'head') + K.mason(id, 206, 99, 1, 0, 'point')
      + K.bubble(id, -190, 70, 'oof.', 36) + K.bubble(id, 192, 68, 'stone six…', 64, 6);
  // collapsed: stones 0-2 and 8,7 + the wrong 6th stone (S[5]) lie in a heap between the piers
  const rubble = (id) => {
    const lay = [[S[0], -70, 96, 64], [S[8], 64, 98, -58], [S[1], -34, 100, 112], [S[7], 30, 94, 160], [S[2], -4, 82, -30], [S[5], 18, 66, 48], [S[3], -50, 70, 200]];
    return `<ellipse cx="0" cy="112" rx="100" ry="6" fill="${INK}" opacity=".16" filter="url(#${id}soft)"/>` + K.dustCloud(id, -110, 30, 80)
      + lay.map(([st, x, y, d]) => K.laid(G, st, x, y, d, 0.86, id, { face: st === S[5] ? PAPER : FACE })).join('') + K.dustCloud(id, 70, 50, 70)
      + `<g class="dust" fill="#6f6556">${[[-60, 20], [-20, 0], [24, 10], [60, -10], [0, -30]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="1.3" style="animation-delay:${k * .5}s"/>`).join('')}</g>`;
  };
  const scene = G.archSVG(id, mode, closed
    ? { placed: all, held: null, keyAccent: true, front, cls: 'scene', label: 'Arch No. 23 closed, keystone in place' }
    : { placed: [], held: null, extra: rubble, front, cls: 'scene', label: 'Arch No. 23 came down at stone six' });
  const D = G.D;
  const card = closed ? `
      <div><div class="h-title">Arch closed</div><div class="fi-sub">Arch No. ${D.arch} · <b>8 voussoirs + keystone</b>, all standing.</div></div>
      <div class="fi-stats">
        <div class="slab"><span class="k">Your streak</span><span class="v">13<small>+1</small></span></div>
        <div class="slab"><span class="k">Closed it today</span><span class="v">${D.closed}</span></div>
      </div>
      <div class="slab fi-cm"><span class="lbl">${K.icon.comment} Tell the others</span><q>Arch No. 23 — closed. 13-day streak.</q><button class="btn pri sm">Post to comments</button></div>
      <div class="fi-next"><span>${K.icon.mason} <b style="color:#221c16">${D.masons}</b> masons today</span><a>Streaks & ranks</a></div>`
    : `
      <div><div class="h-title red">It came down</div><div class="fi-sub">Arch No. ${D.arch} · fell at <b>stone 6 of 8</b>.</div></div>
      <div class="fi-stats">
        <div class="slab"><span class="k">Your streak</span><span class="v">12</span></div>
        <div class="slab"><span class="k">Closed it today</span><span class="v">${D.closed}</span></div>
      </div>
      <div class="slab fi-cm"><span class="lbl">${K.icon.comment} Tell the others</span><q>Arch No. 23 — fell at stone 6. Who got past it?</q><button class="btn pri sm">Post to comments</button></div>
      <div class="fi-next"><span>New arch tomorrow</span><a>Streaks & ranks</a></div>`;
  return `<div class="game ${mode} scr fin">
    <div class="fi-top">${K.brand(G)}</div>
    <div class="fi-body">${scene}<div class="fi-card">${card}</div></div></div>`;
};
