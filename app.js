import { mountReleases } from './releases.js?v=20261029-v082';
import { mountAnalytics, trackEvent } from './analytics.js';
import { mountLanguagePicker, t, translateSubtree } from './i18n.js?v=20261029-v082';
mountLanguagePicker();
mountAnalytics();
document.addEventListener('click', event => {
  const element = event.target.closest?.('a[data-track-event]');
  if (element && !element.hidden) trackEvent(element.dataset.trackEvent, { origin: element.dataset.trackOrigin || 'site' });
});

document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (menu && nav) {
  const setMenuState = open => {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', t(open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'));
    menu.textContent = t(open ? 'Fechar ×' : 'Menu ☰');
  };
  setMenuState(false);
  document.addEventListener('astraforge:languagechange', () => setMenuState(nav.classList.contains('open')));
  menu.addEventListener('click', () => setMenuState(!nav.classList.contains('open')));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setMenuState(false); });
  document.addEventListener('pointerdown', event => {
    if (nav.classList.contains('open') && !event.target.closest('.site-header')) setMenuState(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) { setMenuState(false); menu.focus(); }
  });
  window.matchMedia('(min-width: 1121px)').addEventListener('change', event => {
    if (event.matches) setMenuState(false);
  });
}

const galleryLinks = [...document.querySelectorAll('[data-gallery]')];
if (galleryLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', t('Captura do jogo ampliada'));
  const close = document.createElement('button');
  close.type = 'button'; close.textContent = 'Fechar ×';
  const shot = document.createElement('img');
  const caption = document.createElement('p');
  const controls = document.createElement('div');
  controls.className = 'lightbox-controls';
  const previous = document.createElement('button');
  previous.type = 'button'; previous.textContent = '← Anterior';
  const following = document.createElement('button');
  following.type = 'button'; following.textContent = 'Próxima →';
  controls.append(previous, following);
  dialog.append(close, shot, caption, controls); document.body.append(dialog);
  translateSubtree(dialog);
  const visibleShots = () => galleryLinks.filter(link => !link.hidden);
  const showShot = link => {
    if (!link) return;
    origin = link;
    shot.src = link.href; shot.alt = link.querySelector('img')?.alt || '';
    caption.textContent = t(link.dataset.caption || shot.alt);
    controls.hidden = visibleShots().length < 2;
  };
  document.addEventListener('astraforge:languagechange', () => { if (dialog.open && origin) showShot(origin); });
  const navigate = offset => {
    const options = visibleShots();
    const current = options.indexOf(origin);
    if (!options.length || current < 0) return;
    showShot(options[(current + offset + options.length) % options.length]);
  };
  previous.addEventListener('click', () => navigate(-1));
  following.addEventListener('click', () => navigate(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1); }
  });
  let origin;
  for (const link of galleryLinks) link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); showShot(link);
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

if (document.querySelector('[data-release-status]')) {
  const manager = mountReleases(document);
  manager.ready.then(state => {
    // Curated patch notes remain archival; the current public release highlight is live.
    const highlight = document.querySelector('[data-latest-release-highlight]');
    if (!highlight || state.status !== 'available') return;
    const title = highlight.querySelector('[data-latest-release-title]');
    const notes = highlight.querySelector('[data-latest-release-notes]');
    const published = state.release;
    if (title) title.textContent = t('Última Release Android') + ': ' + published.tagName;
    const url = published.notesUrl || published.releaseUrl;
    if (notes && url) { notes.href = url; notes.hidden = false; }
    highlight.hidden = false;
  });
}


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
    if (count) count.textContent = shown + ' ' + t(label);
  };
  for (const button of buttons) button.addEventListener('click', () => update(button.getAttribute(buttonAttribute)));
  update('todos');
  document.addEventListener('astraforge:languagechange', () => update(group.querySelector('button[aria-pressed="true"]')?.getAttribute(buttonAttribute) || 'todos'));
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
    if (message) message.textContent = visible ? visible + ' ' + t('atualizações encontradas') : t('Nenhuma atualização encontrada');
  };
  updateSearch.addEventListener('input', search);
  search();
  document.addEventListener('astraforge:languagechange', search);
}
