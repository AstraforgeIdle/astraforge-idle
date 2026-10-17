import { siteConfig } from './config.js';

const moduleRoot = new URL('./', import.meta.url);
const messages = Object.freeze({
  loading: 'Consultando as versões públicas disponíveis para Android…',
  unavailable: 'O APK será disponibilizado aqui quando houver uma versão pública válida no GitHub Releases.',
  rate_limited: 'A consulta pública ao GitHub está temporariamente limitada. Tente novamente mais tarde ou confira os Releases.',
  not_found: 'Não foi possível encontrar Releases públicos nesta consulta. Confira o GitHub Releases; o download aparecerá quando houver um APK público.',
  timeout: 'A consulta ao GitHub demorou mais que o esperado. Tente novamente ou confira os Releases.',
  error: 'Não foi possível confirmar o APK agora. Verifique sua conexão, tente novamente ou confira os Releases.',
});

function configuration(config = {}) { return { ...siteConfig, ...config }; }

function repositoryUrl(value, config, kind) {
  if (typeof value !== 'string' || !value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.origin !== 'https://github.com' || url.username || url.password) return null;
    const parts = url.pathname.split('/').slice(1);
    if (parts[0]?.toLowerCase() !== config.owner.toLowerCase() || parts[1]?.toLowerCase() !== config.repo.toLowerCase() || parts[2] !== 'releases') return null;
    if (kind === 'apk') {
      if (parts[3] !== 'download' || !parts[4] || parts.length < 6 || !/\.apk$/i.test(decodeURIComponent(parts.at(-1)))) return null;
    } else if (parts[3] !== 'tag' || !parts[4]) return null;
    return url.href;
  } catch { return null; }
}

function localNotesUrl(config) {
  try {
    const url = new URL(config.notesPath, moduleRoot);
    // Configured notes stay inside the package; do not permit remote redirects.
    return url.href.startsWith(moduleRoot.href) ? url.href : null;
  } catch { return null; }
}

function matchesPreview(tag, config) {
  const version = tag.replace(/^v/i, '').split(/[-+]/, 1)[0];
  return version === config.previewVersion;
}

/** Returns the latest published public release with a usable uploaded APK, or null. */
export function selectPublicApkRelease(list, options = {}) {
  if (!Array.isArray(list)) return null;
  const config = configuration(options);
  const candidates = [];
  for (const item of list) {
    if (!item || item.draft !== false || item.private === true || item.repository?.private === true || (item.visibility && item.visibility !== 'public')) continue;
    if (typeof item.tag_name !== 'string' || !item.tag_name.trim() || typeof item.published_at !== 'string') continue;
    const published = Date.parse(item.published_at);
    if (!Number.isFinite(published) || !Array.isArray(item.assets)) continue;
    const apk = item.assets.find(asset => asset && typeof asset.name === 'string' && /\.apk$/i.test(asset.name)
      && asset.state === 'uploaded' && Number.isFinite(asset.size) && asset.size > 0
      && repositoryUrl(asset.browser_download_url, config, 'apk'));
    if (!apk) continue;
    const tagName = item.tag_name.trim();
    const releaseUrl = repositoryUrl(item.html_url, config, 'notes');
    candidates.push({
      tagName,
      name: typeof item.name === 'string' && item.name.trim() ? item.name.trim() : tagName,
      publishedAt: item.published_at,
      prerelease: item.prerelease === true,
      assetName: apk.name,
      assetSizeBytes: apk.size,
      downloadUrl: repositoryUrl(apk.browser_download_url, config, 'apk'),
      releaseUrl,
      notesUrl: matchesPreview(tagName, config) ? localNotesUrl(config) : releaseUrl,
      published,
    });
  }
  candidates.sort((a, b) => b.published - a.published);
  if (!candidates.length) return null;
  const { published, ...selected } = candidates[0];
  return selected;
}

function nextPageUrl(linkHeader, apiUrl, visited) {
  const next = linkHeader?.split(',').find(part => /;\s*rel="next"/.test(part));
  if (!next) return null;
  const value = /<([^>]+)>/.exec(next)?.[1];
  const url = new URL(value);
  const endpoint = new URL(apiUrl);
  if (url.origin !== endpoint.origin || url.pathname !== endpoint.pathname || url.username || url.password
    || url.searchParams.get('per_page') !== '100' || !/^[1-9]\d*$/.test(url.searchParams.get('page') || '') || visited.has(url.href)) {
    throw new Error('Invalid public releases pagination');
  }
  return url.href;
}

/** Fetches public metadata only; no token, cookies, local save, or backend is used. */
export async function fetchPublicApkRelease({ fetchImpl = globalThis.fetch, config: options = {}, timeoutMs } = {}) {
  const config = configuration(options);
  if (typeof fetchImpl !== 'function') return { status: 'error' };
  const apiUrl = `https://api.github.com/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}/releases?per_page=100`;
  const controller = new AbortController();
  let timeoutReached = false;
  let timer;
  const deadline = new Promise((_resolve, reject) => {
    timer = setTimeout(() => {
      timeoutReached = true;
      controller.abort();
      reject(new Error('Public releases timeout'));
    }, timeoutMs ?? config.requestTimeoutMs);
  });
  const request = async () => {
    const releases = [];
    const visited = new Set();
    let url = apiUrl;
    while (url) {
      visited.add(url);
      const response = await fetchImpl(url, { method: 'GET', credentials: 'omit',
        headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal });
      if (response.status === 403 || response.status === 429) return { status: 'rate_limited' };
      if (response.status === 404) return { status: 'not_found' };
      if (!response.ok) return { status: 'error' };
      const list = await response.json();
      if (!Array.isArray(list)) return { status: 'error' };
      releases.push(...list);
      url = nextPageUrl(response.headers?.get('link'), apiUrl, visited);
    }
    const release = selectPublicApkRelease(releases, config);
    return release ? { status: 'available', release } : { status: 'unavailable' };
  };
  try { return await Promise.race([request(), deadline]); }
  catch { return { status: timeoutReached ? 'timeout' : 'error' }; }
  finally { clearTimeout(timer); }
}

function nodes(root, name) { return root.querySelectorAll(`[data-release-${name}]`); }
function text(root, name, value) {
  for (const node of nodes(root, name)) node.textContent = value;
}
function link(root, name, url, label) {
  for (const node of nodes(root, name)) {
    node.hidden = !url;
    node.removeAttribute('href');
    if (url) {
      node.setAttribute('href', url);
      node.setAttribute('rel', 'noopener noreferrer');
      node.textContent = label;
    }
  }
}

/** Keeps stale or unconfirmed links out of the document, including failed retries. */
export function renderReleaseState(root, state, options = {}) {
  const config = configuration(options);
  const release = state.release;
  const download = state.status === 'available' && release ? repositoryUrl(release.downloadUrl, config, 'apk') : null;
  const status = state.status === 'available' && !download ? 'unavailable' : state.status;
  let notes = null;
  if (download) {
    notes = matchesPreview(release.tagName || '', config) ? localNotesUrl(config) : repositoryUrl(release.notesUrl, config, 'notes');
  }
  text(root, 'status', download ? `APK público disponível para Android${release.prerelease ? ' · versão Beta' : ''}.` : messages[status] || messages.error);
  text(root, 'version', download ? release.tagName : 'Disponibilidade futura');
  text(root, 'name', download ? release.name : 'Acompanhe as versões públicas do Astraforge Idle');
  text(root, 'size', download && Number.isFinite(release.assetSizeBytes) ? 'Tamanho aproximado: ' + (release.assetSizeBytes / (1024 * 1024)).toFixed(0) + ' MB · arquivo hospedado no GitHub' : '');
  link(root, 'download', download, `Baixar APK · ${release?.tagName || ''}`);
  link(root, 'notes', notes, 'Notas desta versão');
  for (const node of nodes(root, 'status')) {
    node.setAttribute('aria-live', 'polite');
    node.setAttribute('role', 'status');
  }
  for (const node of nodes(root, 'action')) {
    node.hidden = false;
    node.disabled = status === 'loading';
    node.textContent = status === 'loading' ? 'Consultando…' : 'Verificar novamente';
  }
}

/** Mount once per page. `.ready` resolves after the initial query; `.retry()` refreshes it. */
export function mountReleases(root = document, options = {}) {
  if (!nodes(root, 'status').length) return { ready: Promise.resolve(), retry: async () => {} };
  let pending;
  const retry = () => {
    if (pending) return pending;
    renderReleaseState(root, { status: 'loading' }, options.config);
    pending = fetchPublicApkRelease(options).then(state => {
      renderReleaseState(root, state, options.config);
      return state;
    }).finally(() => { pending = null; });
    return pending;
  };
  for (const node of nodes(root, 'action')) node.addEventListener('click', retry);
  return { ready: retry(), retry };
}
