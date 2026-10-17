(() => {
 'use strict';
 document.documentElement.classList.add('has-js');
 const dialog=document.getElementById('lightbox');
 const launchers=[...document.querySelectorAll('[data-lightbox]')];
 const title=dialog.querySelector('#lightbox-title');
 const display=dialog.querySelector('img');
 const detail=dialog.querySelector('[data-detail-content]');
 const counter=dialog.querySelector('.lightbox-count');
 const prev=dialog.querySelector('[data-prev]'),next=dialog.querySelector('[data-next]');
 let active=[],index=0,origin=null,scrollBefore='';
 function render(){
  const selected=active[index];display.src=selected.getAttribute('href');
  title.textContent=selected.dataset.title;display.alt=selected.dataset.title;
  display.classList.toggle('sprite',selected.dataset.kind==='sprite'||selected.dataset.kind==='item');
  detail.replaceChildren();const template=document.getElementById(selected.dataset.detail||'');
  if(template)detail.append(template.content.cloneNode(true));
  counter.textContent=active.length>1?`${index+1} / ${active.length} · Use as setas para navegar`:'';
  prev.hidden=next.hidden=active.length<=1;
 }
 function move(step){index=(index+step+active.length)%active.length;render();}
 for(const launcher of launchers)launcher.addEventListener('click',event=>{
  event.preventDefault();origin=launcher;
  active=launchers.filter(a=>a.dataset.group===launcher.dataset.group&&!a.closest('[hidden]'));
  index=active.indexOf(launcher);render();scrollBefore=document.body.style.overflow;
  document.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('[data-close]').focus();
 });
 dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 dialog.addEventListener('keydown',event=>{
  if(event.key==='Tab'){
   const buttons=[...dialog.querySelectorAll('button:not([hidden])')];
   const first=buttons[0],last=buttons[buttons.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  }
  if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}
  if(event.key==='ArrowRight'){event.preventDefault();move(1);}
 });
 dialog.addEventListener('click',event=>{
  const b=dialog.getBoundingClientRect();
  if(event.target===dialog&&(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom))dialog.close();
 });
 dialog.addEventListener('close',()=>{document.body.style.overflow=scrollBefore;origin?.focus({preventScroll:true});});
 const filters=[...document.querySelectorAll('[data-filter]')];
 for(const button of filters)button.addEventListener('click',()=>{
  for(const b of filters)b.setAttribute('aria-pressed',String(b===button));
  for(const item of document.querySelectorAll('[data-equipment]'))item.hidden=button.dataset.filter!=='all'&&item.dataset.category!==button.dataset.filter;
 });
 const links=[...document.querySelectorAll('.reading-nav a')];
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   const activeEntry=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
   if(!activeEntry)return;
   for(const a of links)if(a.hash==='#'+activeEntry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');
  },{rootMargin:'-15% 0px -60% 0px'});
  for(const section of document.querySelectorAll('.section'))observer.observe(section);
 }
})();
