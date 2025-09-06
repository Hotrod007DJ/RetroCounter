const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const state = {
  count: 0,
  label: "",
  theme: "retro-pop"
};

//Themes
const THEMES = [
  {id:'retro-pop', name:'Retro Pop', vars:{bg:'#6bc7c9', panel:'#d31a8a', edge:'#f5d60a', border:'#0d0d0f', ink:'#000000', font:'#000000', secondary:'#f5d60a'}},
  {id:'dreamy-pastels', name:'Dreamy Pastels', vars:{bg:'#f6f4ff', panel:'#ffd1f4', edge:'#c9f7f7', border:'#2a2a35', ink:'#2a2a35', font:'#2a2a35', secondary:'#b967ff'}},
  {id:'midnight-neon', name:'Midnight Neon', vars:{bg:'#0a0b1a', panel:'#1e0f3d', edge:'#51ffd8', border:'#000', ink:'#e7e7ff', font:'#e7e7ff', secondary:'#51ffd8'}},
  {id:'vaporwave', name:'Vaporwave', vars:{bg:'#222244', panel:'#ff71ce', edge:'#01cdfe', border:'#1a1a2b', ink:'#0a0630', font:'#0a0630', secondary:'#b967ff'}},
  {id:'terminal', name:'Terminal', vars:{bg:'#000000', panel:'#111111', edge:'#00ff66', border:'#00ff66', ink:'#00ff66', font:'#00ff66', secondary:'#00ff66'}},
  {id:'grape-soda', name:'Grape Soda', vars:{bg:'#2d1035', panel:'#7a1fa2', edge:'#f5b6ff', border:'#18051d', ink:'#fef3ff', font:'#fef3ff', secondary:'#f5b6ff'}},
  {id:'sunburst', name:'Sunburst', vars:{bg:'#fff3d1', panel:'#ff7a00', edge:'#ffd54a', border:'#23160a', ink:'#23160a', font:'#23160a', secondary:'#ffd54a'}},
  {id:'ocean-breeze', name:'Ocean Breeze', vars:{bg:'#e1fbff', panel:'#00a6c8', edge:'#62e0ff', border:'#00323f', ink:'#001e25', font:'#001e25', secondary:'#62e0ff'}},
  {id:'cotton-candy', name:'Cotton Candy', vars:{bg:'#c8f0ff', panel:'#ff9acb', edge:'#fff0a8', border:'#121521', ink:'#111', font:'#111', secondary:'#fff0a8'}},
  {id:'sakura', name:'Sakura', vars:{bg:'#ffeef5', panel:'#ff7693', edge:'#ffd1e0', border:'#2b0d17', ink:'#2b0d17', font:'#2b0d17', secondary:'#ffd1e0'}},
  {id:'matrix', name:'Matrix', vars:{bg:'#0c0f10', panel:'#111f14', edge:'#3cff84', border:'#07150a', ink:'#caffda', font:'#caffda', secondary:'#3cff84'}},
  {id:'cyberpunk', name:'Cyberpunk', vars:{bg:'#0a0812', panel:'#1d1b2f', edge:'#ff00ea', border:'#00f5ff', ink:'#c6f7ff', font:'#c6f7ff', secondary:'#ff00ea'}},
  {id:'mono', name:'Monochrome', vars:{bg:'#eaeaea', panel:'#ffffff', edge:'#c5c5c5', border:'#111111', ink:'#111', font:'#111', secondary:'#111111'}},
  {id:'forest', name:'Forest', vars:{bg:'#0e1b12', panel:'#204b2a', edge:'#7be495', border:'#06150b', ink:'#dfffe8', font:'#dfffe8', secondary:'#7be495'}},
  {id:'sand', name:'Sand', vars:{bg:'#f8f1e1', panel:'#e0c097', edge:'#ffe0a3', border:'#4b3a28', ink:'#2a1d0f', font:'#2a1d0f', secondary:'#ffe0a3'}},
  {id:'mint-choc', name:'Mint Choc', vars:{bg:'#f0fff4', panel:'#19c689', edge:'#b9fbd0', border:'#0f3b2a', ink:'#0f3b2a', font:'#0f3b2a', secondary:'#b9fbd0'}},
  {id:'royal', name:'Royal', vars:{bg:'#0b1530', panel:'#1c2b5a', edge:'#ffd44a', border:'#080f22', ink:'#f9fbff', font:'#f9fbff', secondary:'#ffd44a'}},
  {id:'bumblebee', name:'Bumblebee', vars:{bg:'#111111', panel:'#ffd60a', edge:'#fff59d', border:'#000000', ink:'#000000', font:'#000000', secondary:'#fff59d'}},
  {id:'peach-cream', name:'Peach Cream', vars:{bg:'#fff7f0', panel:'#ffb38a', edge:'#ffe6b5', border:'#3b1e14', ink:'#3b1e14', font:'#3b1e14', secondary:'#ffe6b5'}},
  {id:'slate', name:'Slate', vars:{bg:'#0f1218', panel:'#1e2530', edge:'#7aa5ff', border:'#090c10', ink:'#e9f0ff', font:'#e9f0ff', secondary:'#7aa5ff'}},
  {id:'dracula', name:'Dracula', vars:{bg:'#282a36', panel:'#44475a', edge:'#bd93f9', border:'#1b1c22', ink:'#f8f8f2', font:'#f8f8f2', secondary:'#50fa7b'}},
  {id:'miami', name:'Miami', vars:{bg:'#c2fff6', panel:'#00c4b3', edge:'#ff7aa0', border:'#013233', ink:'#05222b', font:'#05222b', secondary:'#ff7aa0'}},
  {id:'snow', name:'Snow', vars:{bg:'#f7fbff', panel:'#ebf4ff', edge:'#c0ddff', border:'#1a2a40', ink:'#0d223a', font:'#0d223a', secondary:'#6b7cff'}},
  {id:'space', name:'Space', vars:{bg:'#070a21', panel:'#0e1340', edge:'#6b7cff', border:'#020312', ink:'#e3e7ff', font:'#e3e7ff', secondary:'#6b7cff'}},
  {id:'high-contrast', name:'High Contrast', vars:{bg:'#ffffff', panel:'#000000', edge:'#ffea00', border:'#000000', ink:'#ffea00', font:'#ffea00', secondary:'#ffea00'}},
  {id:'black-green-purple', name:'Black/Green/Purple', vars:{bg:'#090909', panel:'#2a0f3a', edge:'#00ff9f', border:'#000', ink:'#d3ffe8', font:'#d3ffe8', secondary:'#00ff9f'}},
  {id:'game-boy', name:'Game Boy', vars:{bg:'#cbd5b1', panel:'#dce7c5', edge:'#f2f8da', border:'#2a3a1f', ink:'#2a3a1f', font:'#1c2b1a', secondary:'#6aa84f'}},
  {id:'famicom', name:'Famicom', vars:{bg:'#f7ead6', panel:'#b71c1c', edge:'#ffd166', border:'#3b0b0b', ink:'#2a1a0a', font:'#ffec99', secondary:'#ffd166'}},
  {id:'neon-sunset', name:'Neon Sunset', vars:{bg:'#1a1032', panel:'#ff3e7f', edge:'#ffd166', border:'#25081f', ink:'#ffe3f2', font:'#fff4f9', secondary:'#ffd166'}},
  {id:'desert-dusk', name:'Desert Dusk', vars:{bg:'#f4e5c2', panel:'#d38b3a', edge:'#ffd79a', border:'#3b2210', ink:'#2a1a0f', font:'#23150c', secondary:'#ffd79a'}},
  {id:'arctic-ice', name:'Arctic Ice', vars:{bg:'#eaf8ff', panel:'#bfe8ff', edge:'#ffffff', border:'#18465c', ink:'#0e2a3a', font:'#082330', secondary:'#7dd3ff'}},
  {id:'lavender-milk', name:'Lavender Milk', vars:{bg:'#f4efff', panel:'#c7b4ff', edge:'#f4d7ff', border:'#281a3f', ink:'#281a3f', font:'#1c1330', secondary:'#f4d7ff'}},
  {id:'melon-soda', name:'Melon Soda', vars:{bg:'#e9fff4', panel:'#34d399', edge:'#bfffe1', border:'#0f3b2a', ink:'#0f3b2a', font:'#0a2a1e', secondary:'#99ffe0'}},
  {id:'coral-teal', name:'Coral & Teal', vars:{bg:'#d9fbff', panel:'#ff6f6f', edge:'#ffe8a3', border:'#2e0d0d', ink:'#1a0c0c', font:'#231010', secondary:'#ffe8a3'}},
  {id:'cobalt-brass', name:'Cobalt Brass', vars:{bg:'#0b1a3a', panel:'#123a8a', edge:'#ffd866', border:'#06142b', ink:'#f5f9ff', font:'#fff7dd', secondary:'#ffd866'}},
  {id:'electric-lime', name:'Electric Lime', vars:{bg:'#0b0f0b', panel:'#2cff4a', edge:'#c8ff8c', border:'#003d14', ink:'#d9ffd9', font:'#03250b', secondary:'#c8ff8c'}},
  {id:'pumpkin-spice', name:'Pumpkin Spice', vars:{bg:'#fff0e1', panel:'#c95a20', edge:'#ffcf99', border:'#3b1a0a', ink:'#2a140a', font:'#ffe6c7', secondary:'#ffcf99'}},
  {id:'strawberry-matcha', name:'Strawberry Matcha', vars:{bg:'#f6fff8', panel:'#ff6ea1', edge:'#99f0b5', border:'#3a0e22', ink:'#0e2618', font:'#fff4fb', secondary:'#99f0b5'}},
  {id:'espresso-cream', name:'Espresso Cream', vars:{bg:'#fff7ef', panel:'#5a3829', edge:'#ffd7a3', border:'#2a140c', ink:'#2a140c', font:'#ffebd1', secondary:'#ffd7a3'}},
  {id:'stormy-sky', name:'Stormy Sky', vars:{bg:'#0d1420', panel:'#1d2a3a', edge:'#7aa2ff', border:'#0a0f18', ink:'#dfe8ff', font:'#eaf1ff', secondary:'#7aa2ff'}},
  {id:'blush-ink', name:'Blush Ink', vars:{bg:'#fff0f4', panel:'#ff8fb3', edge:'#ffd1e2', border:'#31091a', ink:'#2d0f1a', font:'#2d0f1a', secondary:'#ffd1e2'}},
  {id:'ultraviolet', name:'Ultraviolet', vars:{bg:'#0d0820', panel:'#4b19a8', edge:'#c29cff', border:'#140a2b', ink:'#f0eaff', font:'#f0eaff', secondary:'#c29cff'}},
  {id:'carbon-rose', name:'Carbon Rose', vars:{bg:'#0e0e10', panel:'#2a2a33', edge:'#ff8ab3', border:'#040406', ink:'#f0f1f5', font:'#ffbdd2', secondary:'#ff8ab3'}},
  {id:'teal-magenta', name:'Teal Magenta', vars:{bg:'#071a1d', panel:'#0f8b8d', edge:'#ff73d0', border:'#002a2c', ink:'#eaffff', font:'#fff0fb', secondary:'#ff73d0'}},
  {id:'aurora', name:'Aurora', vars:{bg:'#06121d', panel:'#0b2a3a', edge:'#7ef9c8', border:'#020a0f', ink:'#dffdf2', font:'#adffe2', secondary:'#7ef9c8'}},
  {id:'firewatch', name:'Firewatch', vars:{bg:'#1b0b09', panel:'#d4512f', edge:'#ffb36b', border:'#2c0c06', ink:'#fff5ec', font:'#fff1e6', secondary:'#ffb36b'}},
  {id:'retro-beige', name:'Retro Beige', vars:{bg:'#f6f0e6', panel:'#e2d2b2', edge:'#fff2c1', border:'#3a2f21', ink:'#2b2216', font:'#2b2216', secondary:'#ffd97a'}},
  {id:'steel-ice', name:'Steel Ice', vars:{bg:'#e9f2ff', panel:'#3a5a8a', edge:'#b6d4ff', border:'#0f2038', ink:'#eaf2ff', font:'#ffffff', secondary:'#b6d4ff'}}
];

function applyTheme(id){
  const t = THEMES.find(x=>x.id===id) || THEMES[0];
  const r = document.documentElement.style;
  r.setProperty('--bg', t.vars.bg);
  r.setProperty('--panel', t.vars.panel);
  r.setProperty('--panel-edge', t.vars.edge);
  r.setProperty('--panel-border', t.vars.border);
  r.setProperty('--ink', t.vars.ink);
  r.setProperty('--font', t.vars.font);
  r.setProperty('--secondary', t.vars.secondary);
  state.theme = id;
  save();
  // Update selected state
  $$('.swatch').forEach(s=>s.classList.toggle('selected', s.dataset.id===id));
}

function buildThemeGrid(){
  const root = $('#themes');
  root.innerHTML='';
  THEMES.forEach(t=>{
    const sw = document.createElement('button');
    sw.className = 'swatch';
    sw.dataset.id = t.id;
    sw.setAttribute('aria-label', t.name);

    const inner = document.createElement('div');
    inner.className = 'swatch-inner';
    inner.style.setProperty('--panelC', t.vars.panel);
    inner.style.setProperty('--edge', t.vars.edge);
    inner.style.setProperty('--border', t.vars.border);

    const zero = document.createElement('div');
    zero.className = 'zero';
    zero.textContent = String(state.count); // live count
    zero.style.color = t.vars.font;        // theme font color
    inner.appendChild(zero);
    sw.appendChild(inner);

    // press animation on click
    sw.addEventListener('pointerdown', ()=> inner.classList.add('pressed'));
    const clear = ()=> inner.classList.remove('pressed');
    sw.addEventListener('pointerup', clear);
    sw.addEventListener('pointercancel', clear);
    sw.addEventListener('click', ()=> applyTheme(t.id));

    root.appendChild(sw);
  });
}

function updateThemeSwatchNumbers(){
  // keep swatch numbers in sync with live count
  $$('.swatch .zero').forEach((el, i)=>{
    el.textContent = String(state.count);
    const t = THEMES[i];
    if (t) el.style.color = t.vars.font;
  });
}

function save(){
  localStorage.setItem('retroCounterV2', JSON.stringify({
    count: state.count,
    label: state.label,
    theme: state.theme
  }));
}
function load(){
  const raw = localStorage.getItem('retroCounterV2');
  if(raw){
    try{ Object.assign(state, JSON.parse(raw)); } catch {}
  }
}

function updateDisplay(){
  $('#count').textContent = String(state.count);
  const lbl = $('#countLabel');
  if(state.label && state.label.trim()){
    lbl.textContent = state.label.trim();
    lbl.hidden = false;
  }else{
    lbl.hidden = true;
  }
}

function openOverlay(){
  $('#overlay').classList.add('open');
  $('#overlay').setAttribute('aria-hidden','false');
  $('#labelInput').value = state.label;
}
function closeOverlay(){
  $('#overlay').classList.remove('open');
  $('#overlay').setAttribute('aria-hidden','true');
}

function registerSW(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  }
}

function makePressy(el){
  el.addEventListener('pointerdown', ()=> el.classList.add('pressed'));
  const clear = ()=> el.classList.remove('pressed');
  window.addEventListener('pointerup', clear);
  window.addEventListener('pointercancel', clear);
}

window.addEventListener('DOMContentLoaded', ()=>{
  load();
  applyTheme(state.theme);
  buildThemeGrid();
  updateDisplay();
  registerSW();

  makePressy($('#bigButton'));
  makePressy($('#displayBtn'));

  $('#bigButton').addEventListener('click', ()=>{
    state.count += 1;
    save();
    updateDisplay();
    updateThemeSwatchNumbers();
  });

  $('#displayBtn').addEventListener('click', ()=>{
    state.count = Math.max(0, state.count - 1);
    save();
    updateDisplay();
    updateThemeSwatchNumbers();
  });

  $('#settingsBtn').addEventListener('click', (e)=>{ e.stopPropagation(); openOverlay(); });
  $('#closeOverlay').addEventListener('click', closeOverlay);
  $('#overlay').addEventListener('click', (e)=>{ if(e.target.id==='overlay') closeOverlay(); });

  $('#labelInput').addEventListener('input', (e)=>{
    state.label = e.target.value.slice(0,20);
    save(); updateDisplay();
  });

  // instant reset (no confirm)
  $('#resetBtn').addEventListener('click', ()=>{
    state.count = 0;
    save();
    updateDisplay();
    updateThemeSwatchNumbers();
  });
});