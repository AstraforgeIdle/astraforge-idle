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


/** Small progressive-enhancement filters. With JS off, every card remains visible. */
function mountCardFilter(groupSelector, buttonAttribute, itemSelector, itemAttribute, counterSelector, label) {
  const group = document.querySelector(groupSelector);
  if (!group) return;
  const items = [...document.querySelectorAll(itemSelector)];
  const buttons = [...group.querySelectorAll('button')];
  const count = document.querySelector(counterSelector);
  if (!items.length || !buttons.length) return;
  const update = value => {
    let shown = 0;
    for (const item of items) {
      const visible = value === 'todos' || item.getAttribute(itemAttribute) === value;
      item.hidden = !visible;
      if (visible) shown++;
    }
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.getAttribute(buttonAttribute) === value));
    if (count) count.textContent = shown + ' ' + label;
  };
  for (const button of buttons) button.addEventListener('click', () => update(button.getAttribute(buttonAttribute)));
  update('todos');
}
mountCardFilter('[data-hero-filter]', 'data-hero-role', '.character[data-hero-category]', 'data-hero-category', '[data-hero-count]', 'heróis');
mountCardFilter('[data-gallery-filter]', 'data-gallery-category', '.gallery [data-gallery-type]', 'data-gallery-type', '[data-gallery-count]', 'capturas');

/** Search local patch history without requests or external services. */
const updateSearch = document.querySelector('[data-update-search]');
if (updateSearch) {
  const cards = [...document.querySelectorAll('.update-list .update-card')];
  const message = document.querySelector('[data-update-count]');
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const search = () => {
    const query = normalize(updateSearch.value);
    let visible = 0;
    for (const card of cards) {
      const matches = !query || normalize(card.textContent).includes(query);
      card.hidden = !matches;
      if (matches) visible++;
    }
    if (message) message.textContent = visible ? visible + ' atualizações encontradas' : 'Nenhuma atualização encontrada';
  };
  updateSearch.addEventListener('input', search);
  search();
}
