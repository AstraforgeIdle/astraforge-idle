import { getLanguage, setLanguage, translateSubtree, extendEnglishDictionary } from './i18n.js';
import { historicalEnglish } from './patch-notes-en.js';

extendEnglishDictionary(historicalEnglish);
const toolbar = document.querySelector('.patch-locale-toolbar');
if (toolbar) {
  const updateButtons = () => {
    const current = getLanguage();
    for (const button of toolbar.querySelectorAll('[data-site-lang]')) {
      const active = button.dataset.siteLang === current;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
    }
    toolbar.setAttribute('aria-label', current === 'en' ? 'Release notes navigation and language' : 'Navegação das notas e idioma');
  };
  for (const button of toolbar.querySelectorAll('[data-site-lang]')) {
    button.addEventListener('click', () => setLanguage(button.dataset.siteLang));
  }
  document.addEventListener('astraforge:languagechange', updateButtons);
  updateButtons();
}
translateSubtree();

// Some archived patch notes generate cards and modal contents after page load.
// Translate only new subtrees, leaving embedded fonts, images and scripts untouched.
const watch = new MutationObserver(records => {
  if (getLanguage() !== 'en') return;
  const nodes = new Set();
  for (const record of records) {
    for (const node of record.addedNodes) if (node.nodeType === Node.ELEMENT_NODE) nodes.add(node);
  }
  for (const node of nodes) {
    if (node.isConnected && !node.closest('script,style,svg')) translateSubtree(node);
  }
});
watch.observe(document.body, { childList:true, subtree:true });
