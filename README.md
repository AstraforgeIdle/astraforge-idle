# Astraryx Idle — Site oficial

Site e distribuição pública da versão Android de **Astraryx Idle**, RPG idle 2D em pixel art desenvolvido na Godot.

**Nome atual:** Astraryx Idle (anteriormente Astraforge Idle). Os endereços do GitHub e as notas históricas permanecem inalterados para preservar links e downloads.

**Site:** https://astraryxidle.github.io/  
**Downloads (atuais):** https://github.com/AstraryxIdle/astraryx-releases/releases  
**Arquivo legado:** https://github.com/AstraryxIdle/astraryxidle.github.io/releases  
**Comunidade:** https://github.com/AstraryxIdle/astraryxidle.github.io/discussions  
**Bugs:** https://github.com/AstraryxIdle/astraryxidle.github.io/issues

## Idiomas do portal

A página inicial, o índice de atualizações e a página de privacidade possuem alternância **🇧🇷 Português / 🇺🇸 English** no cabeçalho. O conteúdo em português permanece no HTML e as traduções editoriais ficam em `i18n.js`. A escolha do idioma é salva apenas no navegador (`localStorage`), sem alterar os links públicos do APK ou a preferência de Analytics.

O menu, os filtros, as mensagens da consulta a GitHub Releases e a faixa de consentimento também acompanham o idioma escolhido. **As páginas detalhadas do arquivo de notas antigas continuam no idioma original (português)**; devem ser localizadas separadamente, sem sobrescrever o histórico.

## O que o visitante encontra

- Página inicial com os cinco mundos, doze heróis jogáveis e sistemas de evolução.
- Capturas reais do runtime Godot, com galeria ampliável e filtros.
- Busca por versão e assunto em [Atualizações](updates/index.html).
- Consulta **sem autenticação** à API pública do GitHub Releases: primeiro em `astraryx-releases`, com fallback ao repositório antigo; o site só exibe APK publicado, carregado e válido. Releases Beta públicas também são aceitas; rascunhos não são ofertados.
- Instruções de instalação e atualização do APK Android.
- Acesso a Discussions e Issues para feedback e suporte.

## Estrutura do site

| Caminho | Responsabilidade |
|---|---|
| `index.html` | Homepage, informações do jogo e CTA de download |
| `updates/index.html` | Índice pesquisável de notas e hotfixes |
| `updates/v*/` | Notas históricas por versão (URLs preservadas) |
| `styles.css` | Estilos compartilhados e legado das notas |
| `assets/css/site-v3.css` | Refinamentos de layout, navegação e filtros do portal |
| `app.js` | Menu, galeria, filtros e busca local |
| `releases.js` | Consulta, seleção e renderização segura dos APKs publicados |
| `config.js` | Repositório principal `astraryx-releases`, fallback legado e rota das notas locais |
| `assets/` | Identidade visual, sprites e capturas de tela |
| `data/` | Dados editoriais e metadados públicos |
| `tests/` | Validação automatizada, sem dependências de frontend |
| `docs/` | Documentação e instruções de manutenção |

## Rodar localmente

É um site estático, sem framework, instalação de dependências ou etapa de compilação.

```bash
python -m http.server 8080
```

Acesse `http://localhost:8080/`. Não use `file://` para verificar módulos JS e consulta a Releases. A disponibilidade do APK depende da API pública e da rede.

## Executar testes

Com Node.js 22 ou superior, execute os testes rápidos:

```bash
node --test tests/*.test.mjs
```

Para uma auditoria visual automatizada em Chromium (360, 390, 768, 920, 1024 e 1440 px):

```bash
npm install --no-save --ignore-scripts playwright@1.56.1
npx playwright install chromium
node tests/browser-audit.mjs
```

O fluxo de pull request executa ambas as etapas e armazena capturas de referência para desktop e celular.

Além dos testes automatizados, confira menu, download, filtros, ampliação de imagens e tamanhos de tela diferentes **em um navegador real** antes de publicar.

## Atualizações e publicação

1. Publique a nova APK em uma Release pública de `AstraryxIdle/astraryx-releases` e confirme que o arquivo `.apk` está anexado. O site prioriza esse repositório e usa o antigo só quando não há APK público válido no principal.
2. Crie a página de notas em `updates/vX.Y.Z/index.html` e adicione ao índice.
3. Se a nova versão tiver notas locais no portal, atualize `previewVersion` e `notesPath` em `config.js`.
4. Sincronize `data/updates.json` e os textos editoriais da homepage, sem presumir funcionalidades ainda não lançadas.
5. Valide links e testes. A publicação da branch `main` alimenta o GitHub Pages conforme as configurações do repositório.

**Migração de endereço:** a conta GitHub e o repositório devem ser renomeados administrativamente antes de mesclar a branch de migração para `https://astraryxidle.github.io/`.

O site **não** contém APK e não altera o código da Godot. A consulta às Releases não utiliza tokens, cookies ou armazenamento de contas; eventos opcionais de Analytics, quando autorizados pelo visitante, são tratados separadamente.

Mais informações: [Guia de manutenção](docs/site-maintenance.md).

## Limites

As imagens exibidas vêm do projeto e as notas mais antigas continuam arquivadas. Informação de lançamento, tamanho do APK e links de download só devem ser tratados como confirmados quando forem devolvidos pela Release pública correspondente. A assinatura Android usada para atualizar uma instalação existente precisa ser compatível com a versão já instalada.


## Métricas e privacidade (GA4)

O módulo `analytics.js` prepara a medição de visitas, cliques de chamada para download e cliques reais no APK, preservando a página no ar mesmo sem Analytics.

**Estado atual:** GA4 configurado com ID público `G-SZHF2LMYG0` (propriedade Astraryx Idle), ativo **somente após o consentimento do visitante**. Nenhuma chave secreta foi incluída.

**Para manter ou alterar a propriedade:**
1. Crie ou selecione uma propriedade GA4 e um fluxo **Web** para `https://astraryxidle.github.io/`.
2. Copie o **ID de medição** (formato `G-XXXXXXXXXX`) e defina-o em `config.js`, propriedade pública `ga4MeasurementId`.
3. Publique o ajuste. Para desativar o GA4 no futuro, defina `ga4MeasurementId: ''`. Não coloque tokens, segredos ou credenciais neste arquivo.
4. Acesse o site, aceite as estatísticas na faixa de consentimento e acompanhe o Realtime/DebugView da propriedade.
5. Eventos: `download_cta_click` (CTA), `apk_download_click` (clique no APK validado, inclui `release_version` e `file_size_mb`) e `release_notes_click`.

O script do Google só é carregado **após aceite explícito**. Recusa é lembrada no navegador e pode ser alterada pela página `privacidade.html`. Os eventos captam cliques, **não comprovam download concluído nem instalação**. Sem consentimento, não há coleta GA4 por esse módulo.

## Busca, comunidade e novas Releases

- `sitemap.xml` relaciona homepage, histórico, privacidade e notas arquivadas. Envie `https://astraryxidle.github.io/sitemap.xml` ao Google Search Console caso deseje indexação monitorada.
- `robots.txt` fica no diretório do **projeto GitHub Pages**: robôs aplicam o arquivo do **raiz do domínio**, não necessariamente `/astraforge-idle/robots.txt`. Não é uma regra global de rastreamento do domínio. O sitemap pode ser submetido diretamente.
- A homepage usa a API pública de `AstraryxIdle/astraryx-releases` para destacar uma Release pública com APK válido, inclusive Beta. Se ainda não houver APK válido nesse repositório, consulta o arquivo de releases antigo; nunca promove rascunhos. Os cartões históricos e suas páginas continuam editoriais e não são reescritos automaticamente.
- `.github/ISSUE_TEMPLATE/` contém formulários para bugs e sugestões. Para publicá-los o jogador precisa entrar em sua conta GitHub.
- Sobre o tamanho do APK e assinatura Android, veja `docs/android-apk-checklist.md`.
