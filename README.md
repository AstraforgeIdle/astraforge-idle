# Astraforge Idle — Site oficial

Site e distribuição pública da versão Android de **Astraforge Idle**, RPG idle 2D em pixel art desenvolvido na Godot.

**Site:** https://astraforgeidle.github.io/astraforge-idle/  
**Downloads:** https://github.com/AstraforgeIdle/astraforge-idle/releases  
**Comunidade:** https://github.com/AstraforgeIdle/astraforge-idle/discussions  
**Bugs:** https://github.com/AstraforgeIdle/astraforge-idle/issues

## O que o visitante encontra

- Página inicial com os cinco mundos, dez heróis jogáveis e sistemas de evolução.
- Capturas reais do runtime Godot, com galeria ampliável e filtros.
- Busca por versão e assunto em [Atualizações](updates/index.html).
- Consulta **sem autenticação** à API pública do GitHub Releases: o site só exibe download de APK publicado e válido; versões em rascunho não são ofertadas.
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
| `config.js` | Repositório, versão e rota das notas locais |
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

1. Publique a nova APK em uma Release pública do GitHub e confirme a existência do asset `.apk` carregado.
2. Crie a página de notas em `updates/vX.Y.Z/index.html` e adicione ao índice.
3. Se a nova versão tiver notas locais no portal, atualize `previewVersion` e `notesPath` em `config.js`.
4. Sincronize `data/updates.json` e os textos editoriais da homepage, sem presumir funcionalidades ainda não lançadas.
5. Valide links e testes. A publicação da branch `main` alimenta o GitHub Pages conforme as configurações do repositório.

O site **não** contém APK e não altera o código da Godot. A consulta às Releases não utiliza tokens, cookies, analytics ou armazenamento de contas.

Mais informações: [Guia de manutenção](docs/site-maintenance.md).

## Limites

As imagens exibidas vêm do projeto e as notas mais antigas continuam arquivadas. Informação de lançamento, tamanho do APK e links de download só devem ser tratados como confirmados quando forem devolvidos pela Release pública correspondente. A assinatura Android usada para atualizar uma instalação existente precisa ser compatível com a versão já instalada.
