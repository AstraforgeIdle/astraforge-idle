import test from 'node:test';
import assert from 'node:assert/strict';

// Network responses are controlled here; selection and rendering always run real code.
let releaseModule = {};
let importError;
try { releaseModule = await import('../releases.js'); } catch (error) { importError = error; }
function exported(name) {
  assert.equal(typeof releaseModule[name], 'function', `${name} must exist (${importError?.code || 'missing export'})`);
  return releaseModule[name];
}

const repository = 'https://github.com/AstraforgeIdle/astraforge-idle';
const api = 'https://api.github.com/repos/AstraforgeIdle/astraforge-idle/releases?per_page=100';
function release(overrides = {}) {
  return {
    id: 52, tag_name: 'v0.5.2', name: 'A Oficina Desperta', draft: false,
    prerelease: false, published_at: '2026-09-01T12:00:00Z', created_at: '2026-08-28T12:00:00Z',
    html_url: `${repository}/releases/tag/v0.5.2`,
    assets: [{ id: 7, name: 'Astraforge.apk', size: 1048576, state: 'uploaded',
      content_type: 'application/vnd.android.package-archive',
      browser_download_url: `${repository}/releases/download/v0.5.2/Astraforge.apk` }],
    ...overrides,
  };
}
function asset(overrides = {}) { return { ...release().assets[0], ...overrides }; }
function response(body, status = 200, headers = {}) {
  return { ok: status >= 200 && status < 300, status,
    headers: new Headers(headers), json: async () => body };
}
function fakeDocument() {
  const elements = Object.fromEntries(['status', 'version', 'name', 'download', 'notes', 'action'].map(key => [key, {
    textContent: '', hidden: ['download', 'notes', 'action'].includes(key), disabled: false, attributes: new Map(), listeners: {},
    setAttribute(name, value) { this.attributes.set(name, String(value)); },
    removeAttribute(name) { this.attributes.delete(name); },
    getAttribute(name) { return this.attributes.get(name) ?? null; },
    addEventListener(name, callback) { this.listeners[name] = callback; },
  }]));
  return { elements, querySelectorAll(selector) {
    const key = /^\[data-release-(.+)\]$/.exec(selector)?.[1];
    return key && elements[key] ? [elements[key]] : [];
  }};
}

test('selects the most recently published APK instead of trusting list or semantic version order', () => {
  const newer = release({ id: 53, tag_name: 'v0.5.3', published_at: '2026-09-12T12:00:00Z' });
  const oldHigherTag = release({ id: 60, tag_name: 'v0.6.0', published_at: '2026-08-01T12:00:00Z' });
  const selected = exported('selectPublicApkRelease')([oldHigherTag, release(), newer]);
  assert.equal(selected.tagName, 'v0.5.3');
  assert.equal(selected.publishedAt, '2026-09-12T12:00:00Z');
});

test('falls back to an older published release when the newer one has no APK', () => {
  const selected = exported('selectPublicApkRelease')([
    release({ tag_name: 'v0.6.0', published_at: '2026-10-10T00:00:00Z', assets: [] }), release(),
  ]);
  assert.equal(selected.tagName, 'v0.5.2');
  assert.equal(selected.downloadUrl, `${repository}/releases/download/v0.5.2/Astraforge.apk`);
});

test('accepts a published public Beta prerelease', () => {
  const selected = exported('selectPublicApkRelease')([release({ tag_name: 'v0.6.0-beta', prerelease: true })]);
  assert.equal(selected.prerelease, true);
  assert.equal(selected.tagName, 'v0.6.0-beta');
});

test('does not make draft or explicitly private releases available', () => {
  const select = exported('selectPublicApkRelease');
  for (const rejected of [release({ draft: true }), release({ private: true }), release({ repository: { private: true } }), release({ visibility: 'private' })]) {
    assert.equal(select([rejected]), null);
  }
});

test('does not promote an unpublished or malformed API entry', () => {
  const select = exported('selectPublicApkRelease');
  for (const list of [null, {}, [], [null], [release({ published_at: null })], [release({ published_at: 'invalid' })], [release({ draft: undefined })], [release({ tag_name: '' })]]) {
    assert.equal(select(list), null);
  }
});

test('rejects non-APK, unfinished, and zero-byte assets', () => {
  const select = exported('selectPublicApkRelease');
  for (const rejected of [asset({ name: 'source.zip' }), asset({ size: 0 }), asset({ state: 'new' }), asset({ browser_download_url: null })]) {
    assert.equal(select([release({ assets: [rejected] })]), null);
  }
});

test('rejects unsafe or unrelated download URLs', () => {
  const select = exported('selectPublicApkRelease');
  const unsafe = [
    'javascript:alert(1)', 'http://github.com/AstraforgeIdle/astraforge-idle/releases/download/v0.5.2/Astraforge.apk',
    'https://github.com.evil.test/AstraforgeIdle/astraforge-idle/releases/download/v0.5.2/Astraforge.apk',
    'https://evil.test/Astraforge.apk', 'https://github.com/Someone/astraforge-idle/releases/download/v0.5.2/Astraforge.apk',
    'https://github.com/AstraforgeIdle/another-game/releases/download/v0.5.2/Astraforge.apk',
    'https://user:secret@github.com/AstraforgeIdle/astraforge-idle/releases/download/v0.5.2/Astraforge.apk',
    'https://github.com/AstraforgeIdle/astraforge-idle/blob/main/Astraforge.apk',
    'https://github.com/AstraforgeIdle/astraforge-idle/releases/download/v0.5.2/Astraforge.exe',
  ];
  for (const url of unsafe) assert.equal(select([release({ assets: [asset({ browser_download_url: url })] })]), null, url);
});

test('skips a bad first asset and uses the next valid APK', () => {
  const selected = exported('selectPublicApkRelease')([release({ assets: [asset({ browser_download_url: 'javascript:alert(1)' }), asset({ name: 'Astraforge.APK' })] })]);
  assert.equal(selected.assetName, 'Astraforge.APK');
});

test('older releases link their own public release notes instead of V0.6.1 notes', () => {
  const selected = exported('selectPublicApkRelease')([release()]);
  assert.equal(selected.notesUrl, `${repository}/releases/tag/v0.5.2`);
});

test('untrusted older release notes URLs are omitted', () => {
  const selected = exported('selectPublicApkRelease')([release({ html_url: 'javascript:alert(1)' })]);
  assert.equal(selected.notesUrl, null);
  assert.equal(selected.releaseUrl, null);
});

test('V0.6.1 tags resolve notes against the module root, including Beta suffixes', () => {
  const select = exported('selectPublicApkRelease');
  for (const tag of ['v0.6.1', '0.6.1', 'v0.6.1-beta.1']) {
    const selected = select([release({ tag_name: tag })]);
    assert.equal(selected.notesUrl, new URL('../updates/v0.6.1/index.html', import.meta.url).href);
  }
  assert.equal(select([release({ tag_name: 'v0.6.01' })]).notesUrl, `${repository}/releases/tag/v0.5.2`);
});

test('a standalone notes package can configure the module-relative notes path', () => {
  const selected = exported('selectPublicApkRelease')([release({ tag_name: 'v0.6.1' })], { notesPath: 'index.html' });
  assert.equal(selected.notesUrl, new URL('../index.html', import.meta.url).href);
});

test('fetches the public list without credentials or Authorization and returns available data', async () => {
  const state = await exported('fetchPublicApkRelease')({ fetchImpl: async (url, options) => {
    assert.equal(url, api);
    assert.equal(options.credentials, 'omit');
    assert.equal(options.headers.Authorization, undefined);
    return response([release()]);
  }});
  assert.equal(state.status, 'available');
  assert.equal(state.release.tagName, 'v0.5.2');
});

test('a successful response without a published APK reports future availability', async () => {
  const state = await exported('fetchPublicApkRelease')({ fetchImpl: async () => response([release({ assets: [] })]) });
  assert.equal(state.status, 'unavailable');
  assert.equal(state.release, undefined);
});

test('follows public pagination before selecting the latest published APK', async () => {
  const state = await exported('fetchPublicApkRelease')({ fetchImpl: async url => {
    if (url === api) return response([release()], 200, { link: `<${api}&page=2>; rel="next"` });
    assert.equal(url, `${api}&page=2`);
    return response([release({ tag_name: 'v0.5.3', published_at: '2026-10-01T00:00:00Z' })]);
  }});
  assert.equal(state.status, 'available');
  assert.equal(state.release.tagName, 'v0.5.3');
});

test('never follows an unrelated pagination URL', async () => {
  const state = await exported('fetchPublicApkRelease')({ fetchImpl: async url => {
    assert.equal(url, api);
    return response([release()], 200, { link: '<https://evil.test/releases?page=2>; rel="next"' });
  }});
  assert.equal(state.status, 'error');
  assert.equal(state.release, undefined);
});

test('403 and 429 remain useful rate limit states without a download', async () => {
  for (const status of [403, 429]) {
    const state = await exported('fetchPublicApkRelease')({ fetchImpl: async () => response({ message: 'rate limit' }, status) });
    assert.equal(state.status, 'rate_limited');
    assert.equal(state.release, undefined);
  }
});

test('404 reports that public releases could not be found without claiming the repo is private', async () => {
  const state = await exported('fetchPublicApkRelease')({ fetchImpl: async () => response({ message: 'Not Found' }, 404) });
  assert.equal(state.status, 'not_found');
});

test('HTTP failures, malformed responses and network errors never supply a download', async () => {
  for (const fetchImpl of [async () => response({}, 500), async () => response({ message: 'not a list' }), async () => { throw new TypeError('Failed to fetch'); }]) {
    const state = await exported('fetchPublicApkRelease')({ fetchImpl });
    assert.equal(state.status, 'error');
    assert.equal(state.release, undefined);
  }
});

test('an unresponsive request times out and aborts instead of leaving the UI loading indefinitely', async () => {
  const state = await exported('fetchPublicApkRelease')({ timeoutMs: 15, fetchImpl: async (_url, options) => new Promise((_resolve, reject) => {
    options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
  }) });
  assert.equal(state.status, 'timeout');
});

test('available rendering displays API text safely and exposes only validated links', () => {
  const doc = fakeDocument();
  const selected = exported('selectPublicApkRelease')([release({ name: '<img src=x onerror=alert(1)>' })]);
  exported('renderReleaseState')(doc, { status: 'available', release: selected });
  assert.equal(doc.elements.name.textContent, '<img src=x onerror=alert(1)>');
  assert.equal(doc.elements.version.textContent, 'v0.5.2');
  assert.equal(doc.elements.download.hidden, false);
  assert.equal(doc.elements.download.getAttribute('href'), `${repository}/releases/download/v0.5.2/Astraforge.apk`);
  assert.equal(doc.elements.notes.getAttribute('href'), `${repository}/releases/tag/v0.5.2`);
});

test('a failed retry clears stale APK and notes links and never labels preview as released', () => {
  const render = exported('renderReleaseState');
  for (const status of ['loading', 'unavailable', 'rate_limited', 'not_found', 'timeout', 'error']) {
    const doc = fakeDocument();
    render(doc, { status: 'available', release: exported('selectPublicApkRelease')([release()]) });
    render(doc, { status });
    assert.equal(doc.elements.download.hidden, true);
    assert.equal(doc.elements.download.getAttribute('href'), null);
    assert.equal(doc.elements.notes.hidden, true);
    assert.equal(doc.elements.notes.getAttribute('href'), null);
    assert.ok(doc.elements.status.textContent.length > 15);
    assert.equal(doc.elements.status.getAttribute('aria-live'), 'polite');
    assert.equal(doc.elements.version.textContent.includes('0.6.0'), false);
  }
});

test('renderer does not trust an unsafe prebuilt available state', () => {
  const doc = fakeDocument();
  exported('renderReleaseState')(doc, { status: 'available', release: { tagName: 'v0.6.0', downloadUrl: 'javascript:alert(1)', notesUrl: 'javascript:alert(1)' } });
  assert.equal(doc.elements.download.hidden, true);
  assert.equal(doc.elements.download.getAttribute('href'), null);
});

test('mount renders available results and retry safely', async () => {
  const doc = fakeDocument();
  let attempts = 0;
  const retry = exported('mountReleases')(doc, { fetchImpl: async () => ++attempts === 1 ? response([release()]) : response({}, 403) });
  assert.equal(doc.elements.download.hidden, true);
  await retry.ready;
  assert.equal(doc.elements.download.hidden, false);
  await doc.elements.action.listeners.click();
  assert.equal(doc.elements.download.hidden, true);
  assert.equal(doc.elements.action.disabled, false);
});

test('pages without the release section do not make unnecessary API requests', async () => {
  let requested = false;
  const mounted = exported('mountReleases')({ querySelectorAll: () => [] }, { fetchImpl: async () => { requested = true; return response([]); } });
  await mounted.ready;
  assert.equal(requested, false);
});

test('retry becomes visible from the actual initially hidden HTML state', () => {
  const render = exported('renderReleaseState');
  for (const status of ['unavailable', 'timeout', 'error', 'rate_limited', 'not_found']) {
    const doc = fakeDocument();
    assert.equal(doc.elements.action.hidden, true);
    render(doc, { status });
    assert.equal(doc.elements.action.hidden, false, status);
    assert.equal(doc.elements.action.disabled, false, status);
    render(doc, { status: 'loading' });
    assert.equal(doc.elements.action.hidden, false);
    assert.equal(doc.elements.action.disabled, true);
  }
});
