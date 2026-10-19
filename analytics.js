// GA4 is loaded only after an explicit choice. No ID = no analytics requests.
// The measurement ID is public (G-...), never store credentials or API secrets here.
import { siteConfig } from './config.js';
import { translateSubtree } from './i18n.js';

export const CONSENT_KEY = 'astra_forge_analytics_consent_v1';
export function validMeasurementId(value) {
  return typeof value === 'string' && /^G-[A-Z0-9]{6,20}$/.test(value);
}

let active = false;
let currentId = '';
let mounted = false;
let consentPanel;
let currentWindow;

/** No personal identifiers or raw URLs should be passed in event parameters. */
export function trackEvent(name, params = {}) {
  if (!active || !currentWindow?.gtag || !/^[a-z][a-z0-9_]{0,39}$/.test(name)) return false;
  const payload = {};
  for (const [key, value] of Object.entries(params)) {
    if (!/^[a-z][a-z0-9_]{0,39}$/.test(key)) continue;
    if (typeof value === 'string') payload[key] = value.slice(0, 100);
    else if (typeof value === 'number' && Number.isFinite(value)) payload[key] = value;
    else if (typeof value === 'boolean') payload[key] = value;
  }
  currentWindow.gtag('event', name, payload);
  return true;
}

function readChoice(win) {
  try {
    const value = win.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch { return null; }
}

function saveChoice(win, value) {
  try { win.localStorage.setItem(CONSENT_KEY, value); } catch { /* Private browsing may disallow storage. */ }
}

function loadTag(doc, win, id) {
  if (active) return;
  active = true;
  win['ga-disable-' + id] = false;
  win.dataLayer = win.dataLayer || [];
  win.gtag = win.gtag || function (...args) { win.dataLayer.push(args); };
  win.gtag('consent', 'default', {
    analytics_storage: 'denied', ad_storage: 'denied',
    ad_user_data: 'denied', ad_personalization: 'denied'
  });
  win.gtag('js', new Date());
  win.gtag('consent', 'update', { analytics_storage: 'granted' });
  win.gtag('config', id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    anonymize_ip: true,
  });
  const script = doc.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  script.dataset.astraAnalytics = 'ga4';
  doc.head.append(script);
}

function stopTag(win, id) {
  active = false;
  win['ga-disable-' + id] = true;
  if (typeof win.gtag === 'function') {
    win.gtag('consent', 'update', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
  }
}

function closePanel() { consentPanel?.remove(); consentPanel = null; }

function showPanel(doc, win, id) {
  closePanel();
  const panel = doc.createElement('aside');
  panel.className = 'analytics-consent';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Preferências de estatísticas');
  panel.innerHTML = `<div class="analytics-consent-text">
    <strong>Estatísticas opcionais</strong>
    <p>Podemos usar o Google Analytics para entender visitas e cliques no download do Astraforge Idle. Nenhuma ferramenta de estatísticas do Google é carregada antes da sua autorização.</p>
    <a href="${new URL('privacidade.html', import.meta.url).href}">Como seus dados são utilizados</a>
  </div>
  <div class="analytics-consent-actions">
    <button type="button" data-analytics-decline>Somente essenciais</button>
    <button type="button" data-analytics-accept>Permitir estatísticas</button>
  </div>`;
  const decide = value => {
    saveChoice(win, value);
    if (value === 'accepted') loadTag(doc, win, id);
    else stopTag(win, id);
    closePanel();
  };
  panel.querySelector('[data-analytics-accept]').addEventListener('click', () => decide('accepted'));
  panel.querySelector('[data-analytics-decline]').addEventListener('click', () => decide('declined'));
  doc.body.append(panel);
  translateSubtree(panel);
  consentPanel = panel;
}

export function mountAnalytics(doc = document, win = window, config = siteConfig) {
  const id = config.ga4MeasurementId;
  if (!validMeasurementId(id) || mounted) return false;
  mounted = true;
  currentId = id;
  currentWindow = win;
  for (const button of doc.querySelectorAll('[data-privacy-settings]')) {
    button.hidden = false;
    button.addEventListener('click', () => showPanel(doc, win, id));
  }
  if (readChoice(win) === 'accepted') loadTag(doc, win, id);
  else if (readChoice(win) === null) showPanel(doc, win, id);
  return true;
}
