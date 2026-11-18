#!/usr/bin/env python3
"""Assemble standalone planches (no network, no build needed to view the output).
Usage: python3 build.py  -> writes ../v1/<name>.html for every themes/<name>.json"""
import json, pathlib
SRC = pathlib.Path(__file__).resolve().parent
OUT = SRC.parent / 'v1'
OUT.mkdir(exist_ok=True)
shared_css = (SRC / 'shared.css').read_text()
core_js = (SRC / 'core.js').read_text()

PAGE = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Voûte · {title}</title>
<style>{css}</style></head>
<body class="{cls}">
<div class="board">
  <header class="plate-head">
    <div><div class="num">VOÛTE · PLANCHE {ver} · PAGE {page} · DIRECTION {num}</div><h1>{title}</h1></div>
    <p class="why">{why}</p>
    <div class="sw">{swatches}</div>
  </header>
  <div class="frames">
    <figure><figcaption>Desktop feed · 1440 × 900</figcaption>
      <div class="desk">
        <div class="rd-top"><div class="rd-logo"></div><div class="rd-search">Search</div><div class="rd-av"></div></div>
        <div class="rd-body">
          <nav class="rd-nav"><b>Home</b><span>Popular</span><span>Explore</span><hr><small>Communities</small><span>r/VouteDaily</span><span>r/stonemasonry</span><span>r/architecture</span></nav>
          <main class="rd-feed"><article class="rd-post">
            <div class="rd-ph"><i class="rd-sav"></i><b>r/VouteDaily</b><span>· 2 h</span></div>
            <h2 class="rd-title">Arch No. 23 — close it, stone by stone</h2>
            <div class="rd-game" data-game="desk-g" data-screen="{screen}" data-state="{dstate}"></div>
            <div class="rd-act"><span>▲ 1.4k ▼</span><span>318 comments</span><span>Share</span></div>
          </article></main>
          <aside class="rd-side"><div class="rd-card"><b>r/VouteDaily</b>One arch a day. Same stones for everyone. Close it, then tell the others how.</div></aside>
        </div>
      </div>
    </figure>
    <figure><figcaption>Mobile post · 390 × 844</figcaption>
      <div class="mob">
        <div class="m-status"><span>9:41</span><i></i></div>
        <div class="m-bar"><div class="rd-logo"></div><div class="rd-search">r/VouteDaily</div></div>
        <div class="m-ph"><i class="rd-sav"></i><b>r/VouteDaily</b><span>· 2 h</span></div>
        <div class="m-title">Arch No. 23 — close it, stone by stone</div>
        <div class="m-game" data-game="mob-g" data-screen="{screen}" data-state="{mstate}"></div>
        <div class="m-act"><span>▲ 1.4k ▼</span><span>318</span><span>Share</span></div>
      </div>
    </figure>{extra_fig}
  </div>
  <p class="refs">Références (principes seulement) : {refs}</p>
</div>
<script>{theme_js}</script>
<script>{core_js}</script>
</body></html>
"""

for spec in sorted((SRC / 'themes').glob('*.json')) + sorted((SRC / 'pages').glob('*.json')):
    meta = json.loads(spec.read_text())
    base = spec.with_suffix('')
    sw = ''.join(f'<i style="background:{h};color:{fg}">{h}</i>' for h, fg in meta['swatches'])
    ex = meta.get('extra_mobile')
    extra_fig = '' if not ex else f'''
    <figure><figcaption>{ex['caption']}</figcaption>
      <div class="mob">
        <div class="m-status"><span>9:41</span><i></i></div>
        <div class="m-bar"><div class="rd-logo"></div><div class="rd-search">r/VouteDaily</div></div>
        <div class="m-ph"><i class="rd-sav"></i><b>r/VouteDaily</b><span>· 2 h</span></div>
        <div class="m-title">Arch No. 23 — close it, stone by stone</div>
        <div class="m-game" data-game="mob-g" data-screen="{meta.get('screen','')}" data-state="{ex['state']}"></div>
        <div class="m-act"><span>▲ 1.4k ▼</span><span>318</span><span>Share</span></div>
      </div>
    </figure>'''
    js = (base.with_suffix('.js')).read_text() if base.with_suffix('.js').exists() else ''
    css = (base.with_suffix('.css')).read_text() if base.with_suffix('.css').exists() else ''
    incs = [SRC / i for i in meta.get('include', [])]  # included in listed order, before the page's own files
    js = '\n'.join([p.read_text() for p in incs if p.suffix == '.js'] + [js])
    css = '\n'.join([p.read_text() for p in incs if p.suffix == '.css'] + [css])
    html = PAGE.format(page=meta.get('page', 'JEU'), screen=meta.get('screen', ''), dstate=meta.get('dstate', ''), mstate=meta.get('mstate', ''), extra_fig=extra_fig, ver=meta.get('ver', 'V1'), title=meta['title'], num=meta['num'], why=meta['why'], refs=meta['refs'], cls=base.name,
                       swatches=sw, css=shared_css + css,
                       theme_js=js, core_js=core_js)
    out = SRC.parent / meta.get('out', 'v1'); out.mkdir(exist_ok=True)
    name = meta.get('file', base.name)
    (out / f'{name}.html').write_text(html)
    print('wrote', out / f'{name}.html')
