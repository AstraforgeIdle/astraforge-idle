// Public website configuration only. Never add tokens or private project paths here.
export const siteConfig = Object.freeze({
  owner: 'AstraforgeIdle',
  repo: 'astraforge-idle',
  locale: 'pt-BR',
  siteUrl: 'https://astraforgeidle.github.io/astraforge-idle/',
  previewVersion: '0.6.1',
  previewStatus: 'published',
  // Resolved against this module directory, so deep pages work in GitHub Pages.
  // Use 'index.html' when packaging the V0.6.1 notes as a standalone site root.
  notesPath: 'updates/v0.6.1/index.html',
  requestTimeoutMs: 8000,
});
