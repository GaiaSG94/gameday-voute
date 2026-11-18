/* Voûte — planche core (shared by all directions). Theme object T is defined before this file. */
(function () {
  // Demo data — Arch No. 23. Seeded stone spans (degrees), left springer -> keystone -> right springer.
  const D = { arch: 23, date: 'Wed, Nov 18', streak: 12, masons: '1,284', closed: '41%',
              placed: [0, 1, 2, 8, 7], held: 3, tray: [6, 5] };
  const r = 100, R = 150, SP = [24, 18, 22, 16, 20, 17, 23, 19, 21];
  let acc = 180;
  const S = SP.map((s, i) => { const o = { i, a0: acc, a1: acc - s, m: acc - s / 2, key: i === 4 }; acc -= s; return o; });
  const P = (d, a) => [d * Math.cos(a * Math.PI / 180), -d * Math.sin(a * Math.PI / 180)];
  const f = n => n.toFixed(2);
  const radii = st => st.key ? [r - 5, R + 12] : [r, R];
  const pts = (st) => {
    const [ri, ro] = radii(st), out = [], n = 8;
    for (let k = 0; k <= n; k++) out.push(P(ri, st.a0 + (st.a1 - st.a0) * k / n));
    for (let k = n; k >= 0; k--) out.push(P(ro, st.a0 + (st.a1 - st.a0) * k / n));
    return out;
  }
  const poly = (st) => { return 'M' + pts(st).map(p => f(p[0]) + ' ' + f(p[1])).join('L') + 'Z'; }
  const center = st => { const [ri, ro] = radii(st); return P((ri + ro) / 2, st.m); };
  const G = { D, S, P, poly, pts, center, r, R, f };
  window.VOUTE = G;

  const archSVG = (id, mode, o = {}) => {
    const placed = o.placed || D.placed, held = ('held' in o) ? o.held : D.held;
    let s = `<svg class="arch ${o.cls || ''}" viewBox="${o.vb || T.vb}" preserveAspectRatio="xMidYMid meet" aria-label="${o.label || `Arch No. ${D.arch}, ${placed.length} of 8 voussoirs set`}">`;
    s += `<defs>${T.defs(id)}</defs>` + T.back(id, G, o);
    s += T.piers(id, G, o);
    S.forEach(st => {
      const d = poly(st);
      if (placed.includes(st.i)) s += T.stone(d, st.key && o.keyAccent ? 'keyset' : 'set', st, id, G);
      else if (st.i === held) s += T.slot(d, st, id, G);
      else if (o.showEmpty !== false) s += T.empty(d, st, id, G);
    });
    let off = [0, 0];
    if (held != null) {
      const h = S[held], c = center(h); off = P(T.lift || 40, h.m);
      s += `<g class="held" transform="translate(${f(off[0])} ${f(off[1])})"><g class="held-in" style="transform-origin:${f(c[0])}px ${f(c[1])}px">`
         + T.stone(poly(h), 'held', h, id, G) + `</g></g>`;
      s += T.dust(id, G, off);
    }
    s += (o.extra ? o.extra(id) : '') + (o.noFront ? '' : T.front(id, G, mode, o)) + `</svg>`;
    return s;
  }
  const traySVG = (st, id, state) => {
    const c = center(st);
    return `<svg class="ts-svg" viewBox="-42 -42 84 84"><g transform="rotate(${f(st.m - 90)}) translate(${f(-c[0])} ${f(-c[1])})">`
      + T.stone(poly(st), state, st, id, G) + `</g></svg>`;
  }
  const tray = (id) => {
    const items = [{ st: S[D.held], k: 'hand' }, ...D.tray.map(i => ({ st: S[i], k: 'tray' })), { st: S[4], k: 'locked' }];
    return items.map(it => `<button class="ts ts-${it.k}" ${it.k === 'locked' ? 'disabled' : ''}>`
      + (it.k === 'hand' ? `<span class="ts-svg ts-empty"></span>` : traySVG(it.st, id, it.k))
      + `<span class="ts-l">${it.k === 'hand' ? 'In hand' : it.k === 'locked' ? 'Keystone · last' : 'Voussoir'}</span></button>`).join('');
  }
  const prog = () => {
    const pips = S.map(st => `<i class="pg ${D.placed.includes(st.i) ? 'on' : st.i === D.held ? 'now' : st.key ? 'key' : 'off'}"></i>`).join('');
    return `<div class="pgbar">${pips}</div><div class="pgtxt"><b>${D.placed.length}</b> of 8 voussoirs set</div>`;
  }
  const game = (id, mode) => {
    return `<div class="game ${mode}">
      <div class="g-top">
        <div class="g-brand">${T.wordmark()}<span class="no">Arch No.&nbsp;${D.arch}<i>·</i>${D.date}</span></div>
        <div class="g-streak">${T.streak(D.streak)}<span><b>${D.streak}</b>-day streak</span></div>
      </div>
      <div class="g-stage"><p class="g-rule">${T.rule}</p>${archSVG(id, mode)}</div>
      <div class="g-side">
        <div class="g-prog">${prog()}</div>
        <div class="g-tray-h">Stones left</div>
        <div class="g-tray">${tray(id)}</div>
        <div class="g-foot"><span><b>${D.masons}</b> masons on today’s arch</span><span><b>${D.closed}</b> closed it</span></div>
      </div>
    </div>`;
  }
  Object.assign(G, { archSVG, traySVG, prog, game });
  document.querySelectorAll('[data-game]').forEach((el, n) => {
    const sc = el.dataset.screen, fn = sc && window.SCREENS && window.SCREENS[sc];
    el.innerHTML = fn ? fn('g' + n, el.dataset.game, G, el.dataset.state) : game('g' + n, el.dataset.game);
  });
  document.dispatchEvent(new Event('voute:rendered'));

  // Fit the whole board to the window width (planche is authored at native pixel sizes).
  const board = document.querySelector('.board');
  const fit = () => { const w = board.scrollWidth; const z = Math.min(1, (window.innerWidth - 8) / w); board.style.zoom = z; }
  window.addEventListener('resize', fit); fit();
})();
