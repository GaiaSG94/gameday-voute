SCREENS.post = (id, mode, G) => {
  const S = G.S;
  // the day's delivery: 8 voussoirs + keystone stacked 4-3-2 between the piers
  const pile = (id) => {
    const rows = [[[0, 8, 2, 6], 92], [[1, 7, 5], 58], [[3, 4], 24]];
    let s = `<ellipse cx="0" cy="112" rx="88" ry="5" fill="${INK}" opacity=".14" filter="url(#${id}soft)"/>`;
    rows.forEach(([ids, y], r) => ids.forEach((i, k) => {
      const x = (k - (ids.length - 1) / 2) * 40 + (r % 2 ? 3 : 0);
      s += K.laid(G, S[i], x, y, (k % 2 ? 4 : -3) + (r === 2 && k ? 8 : 0), 0.72, id);
    }));
    return s;
  };
  const front = (id) => K.mason(id, -194, 100, 1, 1, 'idle') + K.mason(id, -170, 103, -1, 0, 'point') + K.mason(id, 178, 102, -1, 1, 'idle') + K.mason(id, 202, 99, 1, 0, 'idle')
    + K.bubble(id, -186, 70, 'morning.', 56) + K.bubble(id, 188, 68, 'who’s first?', 74, 6);
  const scene = G.archSVG(id, mode, { placed: [], held: null, extra: pile, front, cls: 'scene', label: 'Arch No. 23: piers built, nine stones waiting on the ground' });
  return `<div class="game ${mode} scr post">
    <div class="po-top">${K.brand(G)}${K.streakChip(G.D.streak, 'keep it')}</div>
    <div class="po-body">${scene}
      <div class="po-side">
        <div class="note">Close the arch, <b>stone by stone</b>. Same nine stones for everyone today.</div>
        <button class="btn pri">Start today’s arch</button>
        <div class="po-stats"><span class="stat">${K.icon.mason}<b>${G.D.masons}</b> masons on it</span><span class="stat">${K.icon.arch}<b>${G.D.closed}</b> closed it</span></div>
      </div>
    </div></div>`;
};
