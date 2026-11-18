SCREENS.series = (id, mode, G) => {
  const mob = mode === 'mob-g';
  // last 14 days, oldest first: c = closed, f = fell, m = missed; the last one is today (closed)
  const days = 'cfcmcccccccccc'.split(''), names = ['Th', 'F', 'Sa', 'Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su', 'M', 'Tu', 'W'];
  const course = days.map((d, k) => `<i class="day ${k === days.length - 1 ? 'today' : d === 'f' ? 'fell' : d === 'm' ? 'miss' : ''}" title="${names[k]}"></i>`).join('');
  // where today's arches fell (of 758 that came down), by stone 1-8; "me" = the stone you placed last
  const fell = [12, 48, 96, 141, 188, 132, 86, 55], max = Math.max(...fell), blocks = mob ? 9 : 11;
  const hist = fell.map((n, k) => `<div class="bar"><small>${n}</small>${Array.from({ length: Math.max(1, Math.round(n / max * blocks)) }, () => '<i></i>').join('')}</div>`).join('');
  const lead = [['quarry_owl', 64], ['keystone_kid', 58], ['lime_mortar', 51], ['plumbline', 45], ['corbel_cat', 41]].slice(0, mob ? 3 : 5);
  const rows = lead.map(([n, d], k) => `<div class="rw"><span class="rk">${k + 1}</span><span>u/${n}</span><span><b>${d}</b><em>days</em></span></div>`).join('')
    + `<div class="gap">· · ·</div><div class="rw me"><span class="rk">#212</span><span><b style="font-size:13px">You</b></span><span><b>13</b><em>days</em></span></div>`;
  return `<div class="game ${mode} scr series">
    <div class="se-top">${K.brand(G, `Streaks & ranks<i>·</i>${G.D.date}`)}<button class="btn sec sm">Back to the arch</button></div>
    <div class="se-body">
      <div class="col">
        <div class="slab card">
          <span class="lbl">Your streak</span>
          <div class="hero"><span class="hero-n">13</span><span>days in a row<br>best: <b>21</b></span></div>
          <div class="course">${course}</div><div class="dlbl">${names.map(n => `<span>${n}</span>`).join('')}</div>
          <div class="legend"><span><i></i>closed</span><span><i class="f"></i>came down</span><span><i class="m"></i>missed</span></div>
        </div>
        <div class="slab card">
          <span class="lbl">Today’s arch · where it fell</span>
          <div class="hist">${hist}</div><div class="hlbl">${fell.map((_, k) => `<span>${k + 1}</span>`).join('')}</div>
          <div class="row" style="justify-content:space-between"><span class="stat">${K.icon.mason}<b>${G.D.masons}</b> masons</span><span class="stat">${K.icon.arch}<b>${G.D.closed}</b> closed it</span></div>
        </div>
      </div>
      <div class="col">
        <div class="slab card" style="flex:1">
          <span class="lbl">Longest streaks</span>
          <div class="rows">${rows}</div>
          <p class="note hide-m" style="margin-top:auto;font-size:13px">Every day you close the arch adds a stone to your course. Miss a day and the course starts again.</p>
        </div>
      </div>
    </div></div>`;
};
