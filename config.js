// Public website configuration only. Never add tokens or private project paths here.
export const siteConfig = Object.freeze({
  owner: 'AstraryxIdle',
  repo: 'astraryxidle.github.io',
  locale: 'pt-BR',
  siteUrl: 'https://astraryxidle.github.io/',
  // Public GA4 measurement ID. Events are sent only after visitors opt in.
  ga4MeasurementId: 'G-SZHF2LMYG0',
  previewVersion: '0.8.0',
  previewStatus: 'published',
  // Resolved against this module directory, so deep pages work in GitHub Pages.
  // The local notes path is used when the published APK matches previewVersion.
  notesPath: 'updates/v0.8.0/index.html',
  requestTimeoutMs: 8000,
});
