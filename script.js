const $ = (s)=>document.querySelector(s);
let currentBook = null;
let pageIndex = 0;
let audioCtx = null;
let soundOn = false;

function initAudio(){
  if(!audioCtx){ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
  if(audioCtx.state === 'suspended') audioCtx.resume();
}
function beep(type='page'){
  if(!soundOn || !audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  if(type==='train'){
    osc.frequency.setValueAtTime(220, now); osc.frequency.exponentialRampToValueAtTime(360, now+.25);
    gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.12, now+.04); gain.gain.exponentialRampToValueAtTime(.0001, now+.45);
    osc.start(now); osc.stop(now+.48);
  } else {
    osc.type='triangle'; osc.frequency.setValueAtTime(660, now); osc.frequency.exponentialRampToValueAtTime(330, now+.14);
    gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.08, now+.02); gain.gain.exponentialRampToValueAtTime(.0001, now+.22);
    osc.start(now); osc.stop(now+.24);
  }
}

function renderShelf(){
  const shelf = $('#bookshelf');
  shelf.innerHTML = BOOKS.map(book => `
    <button class="book-card ${book.theme}" data-book="${book.id}">
      <img src="${book.cover}" alt="${book.title}" onerror="this.closest('.book-card').classList.add('image-error')" />
      <span class="badge">${book.emoji}</span>
      <div class="book-info"><strong>${book.title}</strong><small>${book.subtitle}</small></div>
    </button>
  `).join('');
  document.querySelectorAll('.book-card').forEach(btn=>{
    btn.addEventListener('click', ()=> openBook(btn.dataset.book));
    btn.addEventListener('touchend', (e)=>{ e.preventDefault(); openBook(btn.dataset.book); }, {passive:false});
  });
}

function openBook(id){
  initAudio();
  const book = BOOKS.find(b=>b.id===id);
  if(!book) return;
  currentBook = book; pageIndex = 0;
  $('#library').classList.remove('active');
  $('#reader').classList.add('active');
  $('#bookTitle').textContent = book.title;
  document.body.dataset.theme = book.theme;
  showPage(0, 'next');
  soundOn = true;
  $('#soundBtn').textContent='🔊 소리';
  beep(id==='train'?'train':'page');
}
function closeBook(){
  $('#reader').classList.remove('active');
  $('#library').classList.add('active');
  currentBook = null;
}
function showPage(nextIndex, dir='next'){
  if(!currentBook) return;
  const max = currentBook.pages.length - 1;
  nextIndex = Math.max(0, Math.min(max, nextIndex));
  const card = $('#page');
  card.classList.remove('flip-next','flip-prev'); void card.offsetWidth;
  card.classList.add(dir==='next'?'flip-next':'flip-prev');
  pageIndex = nextIndex;
  const p = currentBook.pages[pageIndex];
  $('#pageImg').src = p.image;
  $('#pageImg').alt = p.title;
  $('#pageKicker').textContent = p.kicker;
  $('#pageTitle').textContent = p.title;
  $('#pageText').textContent = p.text;
  $('#pageCounter').textContent = `${pageIndex+1} / ${currentBook.pages.length}`;
  $('#dots').innerHTML = currentBook.pages.map((_,i)=>`<button class="dot ${i===pageIndex?'active':''}" data-i="${i}" aria-label="${i+1}페이지"></button>`).join('');
  document.querySelectorAll('.dot').forEach(d=>d.onclick=()=>showPage(Number(d.dataset.i), Number(d.dataset.i)>pageIndex?'next':'prev'));
  setEffects(currentBook.theme);
  beep('page');
}
function next(){ if(currentBook) showPage(pageIndex+1,'next'); }
function prev(){ if(currentBook) showPage(pageIndex-1,'prev'); }
function setEffects(theme){
  const layer = $('#effects');
  const icon = theme==='sea'?'•':theme==='flower'?'✿':theme==='spring'?'❀':'•';
  layer.innerHTML = Array.from({length:18},(_,i)=>`<i style="left:${(i*17)%100}%;animation-delay:${(i*.37)%5}s;animation-duration:${5+(i%5)}s">${icon}</i>`).join('');
}

renderShelf();
$('#backBtn').onclick = closeBook;
$('#nextBtn').onclick = next; $('#prevBtn').onclick = prev;
$('#nextTap').onclick = next; $('#prevTap').onclick = prev;
$('#soundBtn').onclick = ()=>{ initAudio(); soundOn=!soundOn; $('#soundBtn').textContent=soundOn?'🔊 소리':'🔈 소리'; if(soundOn) beep('train'); };
window.addEventListener('keydown', e=>{ if(e.key==='ArrowRight') next(); if(e.key==='ArrowLeft') prev(); if(e.key==='Escape') closeBook(); });
let sx=0, sy=0;
window.addEventListener('touchstart', e=>{ sx=e.touches[0].clientX; sy=e.touches[0].clientY; }, {passive:true});
window.addEventListener('touchend', e=>{ const dx=e.changedTouches[0].clientX-sx; const dy=e.changedTouches[0].clientY-sy; if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)){ dx<0?next():prev(); } }, {passive:true});
