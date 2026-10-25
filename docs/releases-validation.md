# Download Android — integração pública

O portal consulta `https://api.github.com/repos/AstraryxIdle/astraryxidle.github.io/releases?per_page=100` por HTTPS, sem token, cookies, autenticação ou backend. A lista pública inclui versões Beta publicadas; o endpoint `releases/latest` não é usado porque exclui prereleases. Referência: [API de Releases do GitHub](https://docs.github.com/en/rest/releases/releases#list-releases).

## Seleção e segurança

- Ordena por `published_at`; uma versão mais recente sem APK não oculta uma versão anterior válida.
- Exclui drafts, entradas não publicadas, dados malformados e qualquer indicação explícita de acesso privado.
- Aceita somente assets `.apk` enviados (`uploaded`) com tamanho positivo e `browser_download_url` HTTPS de `github.com/AstraforgeIdle/astraforge-idle/releases/download/…`. Nenhum endereço de APK é criado por adivinhação.
- Segue a paginação pública para avaliar todas as páginas retornadas, aceitando apenas o mesmo endpoint HTTPS da API. Links externos de paginação são recusados.
- A consulta inteira tem limite de oito segundos. Ausência de APK, HTTP 403/429, HTTP 404, falhas de rede, resposta inválida e timeout possuem mensagens legíveis em português. Cada falha mantém os botões de APK e de notas ocultos, sem `href` residual.
- Nomes e tags recebidos da API são inseridos com `textContent`, nunca como HTML.
- Notas locais V0.6.0 são associadas somente a tags V0.6.0, com ou sem prefixo `v` e sufixo de prerelease. Outras versões apontam para seu `html_url` público validado; sem uma URL segura, o link de notas fica oculto.

A apresentação da V0.6.0 Beta em preparação permanece separada da versão de download confirmada. Uma falha na consulta não prova que não existam Releases e não anuncia a V0.6.0 como lançada.

## Integração e caminhos

`app.js` importa `mountReleases` de `./releases.js` e chama `mountReleases(document)`. A função só consulta a API em páginas com `[data-release-status]`. Os elementos aceitos são:

| Seletor | Uso |
|---|---|
| `[data-release-status]` | Mensagem com `role="status"` e `aria-live="polite"` |
| `[data-release-version]` | Tag pública confirmada ou disponibilidade futura |
| `[data-release-name]` | Nome público da atualização |
| `[data-release-download]` | Link de APK; começa oculto e sem `href` |
| `[data-release-notes]` | Notas correspondentes à versão confirmada; começa oculto |
| `[data-release-action]` | Botão opcional para verificar novamente |

Mantenha no HTML um link estável para [GitHub Releases](https://github.com/AstraryxIdle/astraryxidle.github.io/releases), inclusive para usuários sem JavaScript. Os estados de falha convidam a utilizá-lo.

`config.js` contém apenas configuração pública. `notesPath` é resolvido a partir da pasta do módulo, usando `import.meta.url`; não depende da profundidade da página nem de `/` na raiz do domínio. No portal, o valor é `updates/v0.6.0/index.html`. No pacote independente com as notas na raiz, configure `index.html`. Para conferir módulos no navegador local, sirva o pacote por HTTP; a abertura direta por `file://` pode bloquear módulos ES.

## Verificação de 11/10/2026

Comando executado na raiz do workspace:

```text
node --test deliverables/astraforge-idle-v2/tests/releases.test.mjs
```

Resultado: **25 testes aprovados, zero falhas**, usando Node.js 24.19.0 e somente bibliotecas nativas. O arquivo de testes foi criado antes da implementação; o primeiro ciclo registrou 25 falhas de contrato por ausência das funções, seguido de 25 aprovações com o módulo implementado. Logs de desenvolvimento: `work/site_v2_2026_10_11/release_red.log` e `release_green.log`.

Os testes executam os seletores, o fetch, o renderer e o mount reais. Apenas a rede e os elementos de DOM são substituídos por fixtures locais, sem dependências adicionais. Cobrem ordenação, fallback, Beta, draft/privado, URLs, assets incompletos, notas da versão correta, caminhos dos dois pacotes, paginação, respostas HTTP, timeout, texto seguro, limpeza de links após falha e tentativa manual.

A primeira leitura pública real, sem autenticação, em **11/10/2026 às 21:24 UTC**, falhou com `ENOTFOUND`; a abertura da API pelo navegador de pesquisa também retornou `Internal Error`. Essa tentativa permanece registrada em `work/site_v2_2026_10_11/release_public.json`; sua falha não foi tratada como prova de ausência de Releases.

A revisão independente repetiu a consulta por HTTP, sem credenciais, em **11/10/2026 às 21:48 UTC**: **HTTP 200**, `application/json; charset=utf-8`, corpo `[]` e **zero Releases públicas** no snapshot. Evidência: `work/site_v2_2026_10_11/qa_api_verification.json`. A chamada real de `fetchPublicApkRelease()` com o fetch nativo do Node também retornou `status: unavailable`. Portanto, a disponibilidade futura exibida no portal corresponde ao estado público consultado; não existe APK público nessa resposta para validar uma transferência real. O estado poderá mudar após a publicação de uma Release.

Além dos 25 testes de Releases repetidos com sucesso, a revisão executou **14 testes puros de `app.js`** (menu, foco, galeria/lightbox e índice), totalizando **39 testes Node aprovados**. Evidência: `work/site_v2_2026_10_11/qa_node_tests.log`. Essas fixtures substituem elementos por objetos locais e não validam renderização, viewport ou comportamento do DOM de um navegador. A QA visual no navegador foi bloqueada pela política do ambiente; nenhum caminho alternativo de GUI/browser foi usado.

Nenhum Release, site, APK ou arquivo de produção foi publicado ou modificado por esta integração.

## Fechamento em 12/10/2026

A revisão final encontrou o botão de tentativa ainda oculto pelo HTML inicial. A fixture agora reproduz esse estado, e o renderer torna o botão visível, mantendo-o desativado durante a consulta. O novo caso falhou antes da correção e passou depois. Resultado atual: **26 testes de Releases +14 testes de interações =40 testes Node aprovados**, além de três verificações de sintaxe. Evidência final: `work/site_v2_2026_10_11/node-validation-final.json` e `qa_node_tests_final.log`. As contagens25/39 acima registram a rodada histórica anterior.
