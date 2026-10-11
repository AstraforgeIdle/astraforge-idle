# Astraforge Idle — Site oficial de downloads

Landing page estática para publicar no **GitHub Pages** e distribuir o APK do Astraforge Idle usando **GitHub Releases**. Não há backend e o site não armazena dados de usuários.

## Instalação inicial (sem terminal)

1. No GitHub, crie um repositório **público** chamado `astraforge-idle` (ou outro nome).
2. Envie os arquivos desta pasta **mantendo as pastas** (`index.html`, `styles.css`, `app.js`, `config.js`, `assets/`, `.nojekyll`) para a raiz do repositório na branch `main`.
3. Em **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**, branch **main**, pasta **/(root)**, e clique em **Save**.
4. O site ficará em `https://SEU-USUARIO.github.io/astraforge-idle/` (substitua pelo usuário e nome de repositório reais). Pode levar alguns minutos até ficar acessível.
5. Em **Releases → Draft a new release**, crie a versão estável, por exemplo `v0.5.3`, e anexe o arquivo **Astraforge-Idle.apk** (APK Android de release assinado corretamente). Publique a release como **Latest release**, não como pré-lançamento ou rascunho.
6. Ao visitar a página, ela detectará automaticamente a release mais recente, exibirá o nome, as notas e a versão, e ativará o botão que aponta ao APK anexado.

O **GitHub Pages** só hospeda a página. O **APK fica em GitHub Releases**, não no diretório do site. A distribuição pode ser iniciada sem publicar o código-fonte do jogo.

## Repositório separado para APKs

Por padrão, o site utiliza o mesmo repositório em que ele está hospedado. Se você mantiver o site e os APKs em repositórios públicos diferentes, ajuste `config.js`:

```javascript
window.ASTRAFORGE_CONFIG = {
  githubOwner: "SEU-USUARIO",
  githubRepo: "REPOSITORIO-DAS-RELEASES",
  preferredApkName: "Astraforge-Idle.apk"
};
```

Isto também permite usar um domínio próprio ou executar um teste local com a API real. **Não inclua tokens pessoais** neste arquivo.

## Futuras versões

1. Exporte um novo APK Android de release com o **mesmo application ID e assinatura**.
2. Aumente o versionCode e a versão do jogo.
3. Publique uma nova GitHub Release com tag mais recente e anexe `Astraforge-Idle.apk`.
4. A página atualizará as informações automaticamente na próxima visita.

O sistema **dentro do jogo** que verifica e instala atualizações é um desenvolvimento separado em Godot/Android. Esta página apenas distribui os APKs e mostra as notas públicas.

## Solução de problemas

- **Botão cinza:** não existe release pública estável, não existe asset `.apk`, ou a API não respondeu. Confira Releases.
- **Página 404:** confira Settings → Pages, branch, diretório `/ (root)`, e o arquivo `index.html`.
- **O Android não atualiza por cima:** mantenha application ID, assinatura, e um versionCode superior. Não troque a chave de assinatura.
- **APK muito grande:** o limite de um único asset do GitHub Releases é normalmente de 2 GiB; confira os limites atuais da plataforma.
- **GitHub Pages em URL própria:** configure o owner/repo explicitamente em `config.js`.

## Arquivos

- `index.html` — estrutura e conteúdo.
- `styles.css` — interface responsiva.
- `app.js` — menu mobile, dados de GitHub Releases e botão APK.
- `config.js` — configuração opcional.
- `assets/hero-art.svg` — ilustração conceitual da landing page, **não uma captura do jogo**.
- `assets/favicon.svg` — ícone original de site, **não o ícone final do jogo**.

Licença: o conteúdo visual e textual foi preparado para a página Astraforge Idle. Nenhum APK ou código-fonte privado do jogo está incluído neste pacote.
