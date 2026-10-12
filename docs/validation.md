# Verificação da entrega — 12/10/2026

O jogo é a implementação Godot; o portal é uma entrega local estática para revisão. Não houve publicação do site, envio de código remoto ou nova exportação de APK.

## Jogo

- Mundo 4: fechamento anterior de 39 suítes/validadores e 41.218 verificações, com 105 execuções de combate, 85 pares únicos de cenário/semente e nenhum timeout.
- Home/menu/Resumo: 989 verificações da rodada anterior ao kit final, incluindo dois viewports. O kit de topo recebido depois tem sua própria rodada final, preservada separadamente.
- Inventário/Heróis/Loja/têmpera visual: 819 verificações finais sem falhas. Crafts reais dos seis slots 50/60/70 e nove nomes completos; renders em 540×960/390×844 e têmpera também em 1080px.
- Têmpera de cura recebida: 7.694 verificações focais de eventos, Oficina, refino e campanha. O delta de HP e a deduplicação são os mesmos do combate.
- Orientação: 19 bosses/minibosses, 33.252 verificações, 108 capturas em dois tamanhos; quatro bosses M4 com orientação específica por quadro e movimento reaproveitado.
- Offline: 72 verificações da regra de cinco minutos, 571 de economia e 33 do overlay. Recibos pendentes não são apagados.
- A revisão final separa resistência a dano de resistência a controle, acrescenta Cura aos adicionais da arma da Sacerdotisa e refina a leitura da tela de atributos. Alocações/instâncias antigas são conservadas e CC novo inicia em zero. Evidências dessa etapa são registradas separadamente no relatório de status, sem modificar os totais das rodadas anteriores.
- Backend da divisão de resistências/cura live:350.272 verificações; UI/adicionais:10.498; revisão independente:349, sem achados materiais. Testes atuais dos nove heróis, orçamento/caps/save e dano/CC/cura passaram. Fixtures históricas que esperavam nove atributos ou tuning antigo de Malkor foram registradas como incompatíveis e não contadas como aprovadas.
- HUD reduzido em cerca de15%, cantos transparentes e cenários M1–3 até o topo receberam captura e validação própria, preservando a projeção do Mundo4.
- Reconfirmação de seis lutas após as resistências separadas: Fenrir850 duas vitórias229,56–232,56s; Sacerdotisa1000 duas derrotas94,20–164,20s; Rei1200 duas derrotas81,06–109,06s, usando a build anterior75/70+5 sem conceder os novos opcionais de Cura/CC automaticamente.
- Regressões exigidas 4C/4D/5A/5B/5C, validação de CSVs/Oficina, editor e carga de recursos passaram no fechamento. Contagens finais e logs ficam na evidência de QA do projeto.

Essas contagens incluem reexecuções e viewports repetidos. Não foram somadas como se representassem verificações independentes. O ensaio inicial do overlay offline foi lançado indevidamente em headless e não completou o marcador de render; foi repetido no renderer apropriado, com 33/33. A primeira captura de têmpera com scroll incorreto foi preservada como falha de fixture, e a nova validação usa Main real com texto inteiro visível.

## Portal e pacotes

- Integração de Releases: 26 testes de seleção, paginação, falhas, visibilidade de tentativas, metadados, URL segura e notas independentes; 14 testes de interações de menu/galeria/índice. São testes Node com fixtures, sem navegador.
- Arquivos, módulos, links, âncoras, dimensões, hashes, metadados e ausência de credenciais verificados. Validações finais do HTML e dos ZIPs estão no relatório de QA da entrega.
- Home permanente, histórico separado, nove heróis canônicos e quatro mundos. V0.5.2 original preservada byte a byte; V0.5.3 é registro documental, sem Release presumida.
- API pública consultada sem autenticação: HTTP200 e lista vazia no momento registrado. O portal consulta de novo quando aberto e só oferece APK retornado por Release pública.
- As duas pastas de site são independentes. ZIPs conferidos por CRC, inventário seguro e referências locais, incluindo CSS/JS/imagens e as doze seções das notas.

## Recursos e preservação

28 imagens atuais, incluindo 17 capturas selecionadas, nove heróis e dois recursos de marca. Foram preservados 21 PNGs integrais do lote final. Validação de assets: 269 verificações, nenhuma falha.

Originais do kit HUD são mantidos byte a byte. Regiões/molduras são montadas pelo Godot; números pintados da referência não são dados de economia nem aparecem sob os contadores vivos. As capturas mostram runtime real com progresso sintético isolado. Veja asset-manifest.md para fontes e hashes.

3425 arquivos originais protegidos permanecem idênticos, sem exclusões. Dados canônicos e espelhos conferidos; APKs e configurações Android preservados. Testes usam APPDATA/LOCALAPPDATA/TEMP isolados; o save pessoal não foi restaurado nem usado como fixture. A comparação com seu hash antigo foi omitida porque houve jogo humano confirmado.

## Limitações

- O acesso ao navegador para a prévia local foi recusado. A inspeção visual e de interação do site em navegador real continua pendente; testes estáticos/Node não são prova de layout ou toque reais.
- Desempenho, áudio, temperatura e consumo desta revisão em Android físico não foram medidos.
- O catálogo conserva 69 avisos históricos de assets ausentes. Fixtures visuais anteriores e de orientação registram avisos ObjectDB/RefCounted ao encerrar, sem erros de script; eles permanecem documentados nos respectivos relatórios.
- Equipamentos 80/90 e ascensão 2 não foram implementados. Mundo 5 permanece reservado. Vitórias e derrotas simuladas valem para as builds/sementes testadas.
