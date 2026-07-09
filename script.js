const $ = (q)=>document.querySelector(q);
const library = $('#library'), reader = $('#reader'), page = $('#page');
const pageImg = $('#pageImg'), chapter = $('#chapter'), pageTitle = $('#pageTitle'), pageText = $('#pageText');
const pageCounter = $('#pageCounter'), dots = $('#dots'), particles = $('#particles');
let book = STORYBOOK.books.jeju1, idx = 0, audioOn = false, audioCtx = null;

function initAudio(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioOn = true;
}
function tone(freq=440, dur=.12, type='sine', vol=.05){
  if(!audioOn || !audioCtx) return;
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type=type; o.frequency.value=freq; g.gain.value=vol;
  o.connect(g); g.connect(audioCtx.destination); o.start();
  g.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime+dur); o.stop(audioCtx.currentTime+dur);
}
function trainSound(){ [180,220,180,260].forEach((f,i)=>setTimeout(()=>tone(f,.13,'square',.035),i*140)); }
function pageSound(){ tone(640,.07,'triangle',.035); setTimeout(()=>tone(320,.08,'triangle',.025),70); }
function cameraSound(){ tone(900,.05,'square',.035); setTimeout(()=>tone(1200,.04,'square',.025),65); }

function start(){ initAudio(); library.classList.add('hidden'); reader.classList.remove('hidden'); idx=0; render(); trainSound(); }
function render(dir='next'){
  const p = book.pages[idx];
  page.classList.remove('active','flipping-next','flipping-prev'); void page.offsetWidth;
  page.classList.add(dir==='prev'?'flipping-prev':'flipping-next');
  pageImg.src = p.image; pageImg.alt = p.title; pageImg.style.objectPosition = p.pos || 'center';
  chapter.textContent = p.chapter; pageTitle.textContent = p.title; pageText.textContent = p.text;
  $('#bookTitle').textContent = book.title; pageCounter.textContent = `${idx+1} / ${book.pages.length}`;
  dots.innerHTML = book.pages.map((_,i)=>`<span class="dot ${i===idx?'active':''}"></span>`).join('');
  setTimeout(()=>page.classList.add('active'),80);
  makeEffect(p.effect, p.type);
  if(audioOn){ pageSound(); if(p.effect==='spark') cameraSound(); }
}
function next(){ if(idx < book.pages.length-1){ idx++; render('next'); } else { showMemories(); } }
function prev(){ if(idx>0){ idx--; render('prev'); } }
function showMemories(){
  const strip=document.createElement('div'); strip.className='photo-strip';
  strip.innerHTML = book.memories.map(s=>`<img src="${s}" alt="제주도 추억 사진">`).join('');
  document.body.appendChild(strip); setTimeout(()=>strip.remove(),9000); trainSound();
}
function makeEffect(effect){
  particles.innerHTML='';
  if(effect==='wave') { const w=document.createElement('div'); w.className='wave-line'; particles.appendChild(w); }
  const map={flower:['🌼','🌸','💛'],heart:['💛','🤍','✨'],bubble:['🫧','💧'],spark:['✨','📸','💛'],pop:['✨','⭐'],wave:['🌊','🐚','🪽']};
  const arr=map[effect]||['✨'];
  for(let i=0;i<26;i++){
    const el=document.createElement('span'); el.className='particle'; el.textContent=arr[Math.floor(Math.random()*arr.length)];
    el.style.left=Math.random()*100+'%'; el.style.animationDuration=(4+Math.random()*5)+'s'; el.style.animationDelay=(Math.random()*2)+'s'; el.style.fontSize=(16+Math.random()*18)+'px';
    particles.appendChild(el);
  }
}

$('#startBtn').addEventListener('click',start);
$('#nextBtn').addEventListener('click',next); $('#prevBtn').addEventListener('click',prev);
$('#nextTap').addEventListener('click',next); $('#prevTap').addEventListener('click',prev);
$('#homeBtn').addEventListener('click',()=>{reader.classList.add('hidden'); library.classList.remove('hidden');});
$('#soundBtn').addEventListener('click',()=>{ if(!audioCtx) initAudio(); audioOn=!audioOn; $('#soundBtn').textContent=audioOn?'🔊':'🔇'; if(audioOn) trainSound(); });
window.addEventListener('keydown',e=>{ if(e.key==='ArrowRight') next(); if(e.key==='ArrowLeft') prev(); });
let sx=0; reader.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
reader.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>50) dx<0?next():prev();},{passive:true});
