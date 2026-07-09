const pages=[...document.querySelectorAll('.page')];
const counter=document.getElementById('counter');
let index=0;
let busy=false;
function updateCounter(){counter.textContent=`${index+1} / ${pages.length}`;}
function go(dir){
  if(busy) return;
  const next=index+dir;
  if(next<0||next>=pages.length) return;
  busy=true;
  const current=pages[index];
  const target=pages[next];
  pages.forEach(p=>p.classList.remove('turn-out-next','turn-out-prev','turn-in-next','turn-in-prev'));
  target.classList.add('active', dir>0?'turn-in-next':'turn-in-prev');
  current.classList.add(dir>0?'turn-out-next':'turn-out-prev');
  setTimeout(()=>{
    current.classList.remove('active','turn-out-next','turn-out-prev');
    target.classList.remove('turn-in-next','turn-in-prev');
    index=next;
    updateCounter();
    busy=false;
  },820);
}
document.getElementById('next').addEventListener('click',()=>go(1));
document.getElementById('prev').addEventListener('click',()=>go(-1));
document.getElementById('nextBtn').addEventListener('click',()=>go(1));
document.getElementById('prevBtn').addEventListener('click',()=>go(-1));
window.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1); if(e.key==='ArrowLeft')go(-1);});
let sx=0,sy=0;
window.addEventListener('touchstart',e=>{sx=e.touches[0].clientX; sy=e.touches[0].clientY;},{passive:true});
window.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-sx;
  const dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.3){ dx<0?go(1):go(-1); }
},{passive:true});
let wheelLock=false;
window.addEventListener('wheel',e=>{if(wheelLock)return;wheelLock=true;e.deltaY>0?go(1):go(-1);setTimeout(()=>wheelLock=false,900);},{passive:true});
updateCounter();
