# Manutenção do site Astraforge Idle

## Princípios da V3

- Prioridade de navegação: **entender o jogo → ver capturas → baixar APK → acompanhar atualizações**.
- Um CTA principal: download Android. A versão exibida é consultada nas Releases públicas do próprio repositório.
- Não substituir screenshots reais do Godot por ilustrações genéricas, sprites esticados ou mockups anunciados como captura real.
- Dar informações objetivas: mundo, faixa de fases, papel dos heróis e instruções de instalação.
- Separar novidades editoriais (homepage) do histórico detalhado (páginas em `updates/`).
- Garantir que filtros e busca sejam aprimoramentos opcionais: com JS desativado, todos os itens permanecem visíveis.
- Usar links relativos, preservando o subdiretório do GitHub Pages.

## Checklist de nova versão

1. Conferir Release e APK públicos (não rascunho).
2. Registrar notas em `updates/vX.Y.Z/index.html`; manter URLs anteriores funcionando.
3. Atualizar `updates/index.html`, `data/updates.json` e os cards de destaque do `index.html`.
4. Ajustar `config.js` para a versão mais recente com notas locais.
5. Conferir textos sobre número de mundos, heróis, progressão, chefes e sistemas contra a build real.
6. Executar `node --test tests/*.test.mjs`.
7. Verificar manualmente a página em larguras 360, 390, 768, 1024 e 1440 px, incluindo menu e links.
8. Checar acessibilidade: Tab, Enter, Escape, contraste, foco visível, textos alternativos.
9. Confirmar API de Releases no navegador sem autenticação, incluindo o estado de falha.
10. Publicar apenas após revisar o diff e conferir o ambiente de teste.

## Conteúdo editorial

- `styles.css`: componentes antigos e estilos das notas. Evitar remover seletores sem auditar as páginas históricas.
- `assets/css/site-v3.css`: camada de ajustes do portal, aplicada depois da base.
- `app.js`: filtros e busca na homepage/índice, além da galeria e menu.
- `releases.js`: lógica protegida por testes. Não inserir link fixo para APK de versão futura.
- `data/game.json`: metadados publicados; a fonte de verdade de atributos e habilidades continua sendo a build Godot.

## Segurança / privacidade

Sem tokens em frontend, sem acesso a contas de jogadores, sem analytics adicionados por esta reformulação. Links externos abertos em nova aba devem usar `rel="noopener noreferrer"`.
