# Astraforge Idle — Portal oficial V2

Entrega local para revisão, preparada em **11/10/2026**. A V0.6.0 Beta é apresentada como conteúdo em preparação. Este pacote não publica o site, não inclui APK e não altera a exportação Android.

## Abrir e revisar

Extraia o ZIP mantendo as pastas. Execute um servidor HTTP estático na pasta extraída, por exemplo:

```text
python -m http.server 8080
```

Abra `http://localhost:8080/`. Não há instalação de dependências ou etapa de build. O HTML e as imagens também podem ser abertos diretamente, mas os módulos de JavaScript e a consulta ao GitHub precisam de HTTP/HTTPS; abrir por `file://` não é o teste completo.

## Conteúdo

- `index.html`: página inicial permanente, quatro mundos, nove heróis jogáveis, sistemas, galeria e download.
- `updates/index.html`: histórico independente.
- `updates/v0.6.0/index.html`: doze seções das notas atuais.
- `updates/v0.5.3/index.html`: registro baseado na documentação disponível, sem publicação presumida.
- `updates/v0.5.2/index.html`: notas históricas adaptadas com recursos locais; `original.html` preserva o arquivo fornecido integralmente.
- `styles.css`, `app.js`, `releases.js`, `config.js`: apresentação e interações sem bibliotecas externas.
- `assets/`: capturas reais Godot em WebP, personagens e marca oficiais; imagens históricas ficam separadas.
- `data/game.json` e `data/updates.json`: metadados públicos em PT-BR, com IDs estáveis para evolução futura.
- `docs/`: procedência, auditoria, changelog, validação e instruções de publicação.

## Download

O portal consulta a API pública das Releases do repositório em `config.js`. Escolhe a Release pública mais recente com um APK válido; ignora rascunhos e não constrói URLs de APK por adivinhação. Prereleases públicas podem ser oferecidas como Beta. Falha de rede, limite da API e ausência de APK têm mensagens próprias, com acesso permanente ao histórico público. Não há token, telemetria ou dados de conta.

Em 11/10/2026, a consulta sem autenticação retornou HTTP 200 e lista vazia. Isso registra a disponibilidade naquele momento; o portal consulta novamente quando aberto. A existência da prévia V0.6.0 não torna seu APK disponível automaticamente.

## Publicação futura

Veja [deployment.md](docs/deployment.md). O pacote independente `Astraforge_Patch_Notes_V0.6.0.zip` contém as mesmas notas adaptadas à sua raiz e pode ser hospedado separadamente. Para integrar no portal, use a página já em `updates/v0.6.0/`, cujos caminhos relativos foram preparados para essa posição.

## Validação e limites

Veja [validation.md](docs/validation.md). Foram testados arquivos, imagens, links, módulos e estados da integração de Releases. O acesso do navegador à prévia local foi recusado; a revisão visual e de interação em navegador real continua pendente. As capturas do jogo foram feitas no runtime Godot no PC, com save sintético isolado; não representam teste físico Android.
