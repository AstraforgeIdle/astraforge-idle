import { mountReleases } from './releases.js';

document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (menu && nav) {
  const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
}

const galleryLinks = [...document.querySelectorAll('[data-gallery]')];
if (galleryLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Captura do jogo ampliada');
  const close = document.createElement('button');
  close.type = 'button'; close.textContent = 'Fechar ×';
  const shot = document.createElement('img');
  const caption = document.createElement('p');
  dialog.append(close, shot, caption); document.body.append(dialog);
  let origin;
  for (const link of galleryLinks) link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); origin = link;
    shot.src = link.href; shot.alt = link.querySelector('img')?.alt || '';
    caption.textContent = link.dataset.caption || shot.alt;
    dialog.showModal(); close.focus();
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { shot.removeAttribute('src'); origin?.focus(); });
}

const sections = [...document.querySelectorAll('.patch-body section[id]')];
if (sections.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      document.querySelectorAll('.toc a').forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  sections.forEach(section => observer.observe(section));
}

if (document.querySelector('[data-release-status]')) mountReleases(document);
