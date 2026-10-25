# Publicação futura no GitHub Pages

Este guia prepara uma publicação depois da revisão do material. Nenhuma alteração foi enviada ao site público ou ao repositório remoto nesta entrega.

## Arquivos para atualizar

Faça backup do conteúdo atual do repositório e confira sua configuração de Pages (raiz de branch ou pasta de publicação). Copie o **conteúdo** da pasta deste pacote para a raiz efetivamente servida, mantendo os caminhos:

- substituir/adicionar `index.html`, `styles.css`, `app.js`, `config.js`, `releases.js`;
- adicionar `assets/branding/`, `assets/characters/`, `assets/screenshots/` e os recursos históricos separados;
- adicionar `data/game.json`, `data/updates.json` e `docs/`;
- atualizar `updates/index.html` e adicionar `updates/v0.6.0/`, `updates/v0.5.3/`, `updates/v0.5.2/`.

Preserve outras páginas, assets e notas históricas já existentes. O pacote contém apenas o histórico documentado fornecido; não é uma instrução para excluir arquivos de outras versões do repositório. Não substitua a raiz por apenas o HTML das notas. Não inclua diretórios de Godot, saves, certificados, SDKs, backups de trabalho ou APKs nesta cópia.

## Configuração pública

`config.js` define `owner`, `repo`, `siteUrl`, `locale`, `previewVersion`, `previewStatus` e `notesPath`. Os valores atuais são o endereço oficial fornecido: `https://astraryxidle.github.io/`. Os links internos usam caminhos relativos, incluindo a pasta de projeto de GitHub Pages. Se o domínio ou caminho mudar, atualize também `canonical`, `og:url` e `og:image` nos HTMLs.

Não insira credenciais. A leitura de Releases funciona sem autenticação; o link estático ao histórico permanece disponível quando a API falha ou está limitada. O botão APK só recebe um endereço real retornado por Release pública com `.apk`. Depois de aprovar uma versão futura, revise o texto de preparação e adicione a nova página às atualizações; não renomeie nem apague páginas antigas.

## Pacote independente das notas

`Astraforge_Patch_Notes_V0.6.0.zip` possui `index.html`, `assets/`, `styles.css`, `app.js`, `config.js`, `releases.js` e `docs/` em sua própria raiz. `notesPath` é `index.html`. Seus links ao portal/histórico usam os endereços oficiais. Para uma instalação integrada em `updates/v0.6.0/`, prefira os arquivos do pacote completo do site, que já usam `../../` para os recursos compartilhados. Não copie a raiz independente por cima da Home do portal.

## Conferência após a publicação

Abra a Home, histórico e cada versão. Teste menu em celular, imagens, galeria com teclado, download sem APK e depois com a Release aprovada. Confira os assets e tabelas em uma tela estreita e uma desktop. Verifique que a URL do download aponta ao asset da versão exibida. O teste da publicação só termina depois de conferir o endereço servido pelo GitHub Pages; os testes locais desta entrega não confirmam publicação.

## Internacionalização

Todos os HTMLs usam `lang="pt-BR"`, metadados `pt_BR`, nomes públicos e IDs permanentes separados em JSON. Para um idioma futuro, crie páginas e cópia próprias, mantendo IDs e histórico; adicione links de idioma e `hreflang` somente quando essas páginas existirem. Não foi criado um seletor de idioma fictício.
