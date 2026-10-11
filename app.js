(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const config = window.ASTRAFORGE_CONFIG || {};
  const year = $('#copyright-year');
  if (year) year.textContent = String(new Date().getFullYear());

  const menuButton = $('.mobile-toggle');
  const menu = $('#nav-links');
  if (menuButton && menu) {
    const close = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
      menu.classList.remove('open');
    };
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  function detectRepository() {
    // Pages: https://usuario.github.io/repositorio/
    const hostname = window.location.hostname;
    const folder = window.location.pathname.split('/').filter(Boolean)[0];
    const inferredOwner = hostname.endsWith('.github.io') ? hostname.split('.')[0] : '';
    const inferredRepo = hostname.endsWith('.github.io') ? (folder || (inferredOwner + '.github.io')) : '';
    const owner = (config.githubOwner || inferredOwner || '').trim();
    const repo = (config.githubRepo || inferredRepo || '').trim();
    // Usar apenas segmentos válidos de nome: evitar construir URLs de dados não confiáveis.
    const valid = /^[a-z\d](?:[a-z\d-]{0,38})$/i.test(owner) && /^[\w.-]+$/.test(repo);
    return valid ? { owner, repo } : null;
  }

  const downloadLink = $('#apk-download');
  const downloadLabel = $('#download-label');
  const downloadMeta = $('#download-meta');
  const releaseTitle = $('#release-title');
  const releaseNotes = $('#release-notes');
  const releaseDate = $('#release-date');
  const releaseStatus = $('#release-status');
  const details = $('#release-details');
  const releases = $('#all-releases');
  const project = $('#github-project');

  function clearDownload() {
    downloadLink.removeAttribute('href');
    downloadLink.classList.add('is-disabled');
    downloadLink.setAttribute('aria-disabled', 'true');
    downloadLink.setAttribute('aria-label', 'Download ainda não disponível');
  }
  function setUnavailable(message, detail) {
    clearDownload();
    releaseStatus.textContent = 'EM PREPARAÇÃO';
    releaseTitle.textContent = 'Primeira versão em preparação';
    releaseNotes.textContent = detail;
    releaseDate.textContent = 'ASTRAFORGE IDLE';
    downloadLabel.textContent = 'DOWNLOAD EM BREVE';
    downloadMeta.textContent = message;
  }
  function formatFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '';
    return (bytes / (1024 * 1024)).toFixed(1).replace('.', ',') + ' MB';
  }
  function releaseCopy(body) {
    // Renderizar como texto, nunca como HTML (os dados vêm de uma API externa).
    const cleaned = String(body || '').replace(/\r/g, '').replace(/^#{1,6}\s*/gm, '').trim();
    if (!cleaned) return 'Uma nova versão do Astraforge Idle está disponível. Confira as notas completas no GitHub.';
    return cleaned.length > 490 ? cleaned.slice(0, 487).trimEnd() + '…' : cleaned;
  }

  async function fetchLatestRelease() {
    const repo = detectRepository();
    if (!repo) {
      setUnavailable('Publicação do primeiro APK pendente.', 'Assim que o repositório do jogo for conectado, as novidades aparecerão aqui automaticamente.');
      return;
    }
    const repoUrl = `https://github.com/${repo.owner}/${repo.repo}`;
    project.href = repoUrl;
    releases.href = repoUrl + '/releases';
    details.href = repoUrl + '/releases';
    details.target = releases.target = '_blank';
    details.rel = releases.rel = 'noopener noreferrer';
    const apiUrl = `https://api.github.com/repos/${repo.owner}/${repo.repo}/releases/latest`;
    try {
      const response = await fetch(apiUrl, { headers: { 'Accept': 'application/vnd.github+json' }, cache: 'no-store' });
      if (!response.ok) throw new Error('Status ' + response.status);
      const data = await response.json();
      const tag = (typeof data.tag_name === 'string' ? data.tag_name : '').trim();
      const version = tag || 'Versão disponível';
      const assets = Array.isArray(data.assets) ? data.assets : [];
      const apk = assets.find(asset => asset.name === config.preferredApkName && typeof asset.browser_download_url === 'string')
        || assets.find(asset => typeof asset.name === 'string' && /\.apk$/i.test(asset.name) && typeof asset.browser_download_url === 'string');
      const publishedDate = data.published_at ? new Date(data.published_at) : null;
      releaseTitle.textContent = (data.name && String(data.name).trim()) || ('Atualização ' + version);
      releaseNotes.textContent = releaseCopy(data.body);
      releaseDate.textContent = publishedDate && !isNaN(publishedDate.valueOf())
        ? publishedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()
        : version.toUpperCase();
      releaseStatus.textContent = 'DISPONÍVEL';
      if (typeof data.html_url === 'string' && /^https:\/\/github\.com\//.test(data.html_url)) details.href = data.html_url;
      if (apk && /^https:\/\/(?:github\.com|objects\.githubusercontent\.com)\//.test(apk.browser_download_url)) {
        downloadLink.href = apk.browser_download_url;
        downloadLink.classList.remove('is-disabled');
        downloadLink.removeAttribute('aria-disabled');
        downloadLink.setAttribute('aria-label', 'Baixar Astraforge Idle ' + version + ' para Android');
        downloadLabel.textContent = 'BAIXAR PARA ANDROID';
        const size = formatFileSize(apk.size);
        downloadMeta.textContent = [version, size, 'APK para Android'].filter(Boolean).join('  ·  ');
      } else {
        clearDownload();
        downloadLabel.textContent = 'APK AINDA NÃO DISPONÍVEL';
        downloadMeta.textContent = 'Esta versão existe no GitHub, mas ainda não contém um arquivo APK.';
      }
    } catch (error) {
      setUnavailable('Não foi possível consultar as versões agora.', 'As atualizações serão exibidas automaticamente quando houver uma GitHub Release pública disponível.');
    }
  }
  clearDownload();
  fetchLatestRelease();
})();
