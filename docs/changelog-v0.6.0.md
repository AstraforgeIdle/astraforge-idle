# V0.6.0 Beta — Picos Congelados

**Estado: preparação para revisão.** Conteúdo implementado no projeto Godot; publicação, APK e data de lançamento ainda não aprovados. Este documento não anuncia uma Release disponível.

## Destaques

- Mundo 4 nas fases 701–1200, com seis regiões, quinze espécies e ondas comuns de cinco a oito inimigos.
- Fenrir na fase 850, Sacerdotisa de Cristal na 1000, Rei do Inverno na 1200 e Astarok como encontro raro de 2% em fases comuns elegíveis.
- Equipamento de nível 70 em dezoito famílias e onze técnicas permanentes.
- Ajustes de dano, cura, guarda, aparada e esquiva de Kharun; novo atributo de resistência a crítico.
- Correções de ascensão, inventário, recompensas, efeitos e navegação pelos mundos.

## Mundo 4

Picos Congelados atravessa costa, bosque, ruínas, catedral, cidadela e trono. Os três chefes fixos têm cenários próprios, e Astarok tem um covil exclusivo. Quinze espécies compõem ondas com tanques, curandeiros, atiradores, magos e apoiadores. As espécies anteriores continuam no pool quando novas entram, e a força cresce continuamente ao longo das fases.

**Gélido afeta somente heróis e seus servos:** duração de recarga ×0,85; velocidade dos ataques básicos ×0,85. Uma recarga de 10 segundos passa a 8,5 segundos; os básicos ficam 15% mais lentos. Mobs e chefes não recebem esses modificadores. O efeito é normalizado entre encontros e removido ao sair do mundo.

O novo tema original, **Aurora sobre o Permafrost**, dura 96 segundos e usa sinos, flauta, cordas e harpa sintetizados. Loop e preferências usam o sistema de som existente. As músicas fornecidas para os mundos 1–3 são preservadas.

## Novos inimigos

| Primeira fase | Espécie | Característica |
| ---: | --- | --- |
| 701 | Lobo do Permafrost | Mordida com redução de cura |
| 701 | Raposa da Aurora | Cura dois aliados feridos |
| 701 | Corvo Glacial | Plumas contra dois alvos da retaguarda |
| 701 | Aranha de Cristal | Teia que imobiliza a retaguarda |
| 701 | Urso das Geadas | Guarda própria |
| 731 | Golem de Cristal | Impacto frontal com atordoamento |
| 761 | Revenante Gélido | Golpe que reduz defesa |
| 801 | Arqueira da Nevasca | Disparo em dois alvos da retaguarda |
| 821 | Oráculo dos Cristais | Cura três aliados feridos |
| 851 | Sentinela do Inverno | Guarda para a frente aliada |
| 871 | Mago da Geada | Magia na retaguarda e lentidão de básicos |
| 901 | Fagulha Glacial | Bônus de ataque para aliados |
| 951 | Dama da Neve | Cura e guarda para o grupo |
| 1001 | Caçador dos Picos | Investida contra a retaguarda |
| 1051 | Vórtice de Nevasca | Magia em área e redução de ataque |

## Chefes

- **Fenrir, Predador Glacial — 850:** caça a retaguarda, concentra ataques após o salto, reduz cura com garras e desacelera deslocamento com o uivo. A segunda fase aumenta a pressão da caça e acrescenta aceleração temporária.
- **Sacerdotisa de Cristal — 1000:** julgamentos, controles e três espelhos. Resistência mágica e quebra por dano físico criam uma janela curta de exposição. Vários impactos do mesmo uso não consomem cargas indevidas.
- **Rei do Inverno — 1200:** Decreto atinge as duas linhas; Correntes interrompem conjurações ou atrasam uma habilidade; Bastião reforça sua defesa. Resistência e imunidade temporária após controle limitam encadeamentos permanentes.
- **Astarok, Dragão Ancestral da Nevasca:** chance de 2% nas fases comuns 701–849, 851–999 e 1001–1199, sem fase fixa ou garantia acumulada. Stats acompanham a fase. Novos debuffs durante a carga reduzem o Cataclismo; maldições de Nymeris participam. Dano verdadeiro explora a vulnerabilidade do dragão.

## Personagens e habilidades

Nenhum personagem novo é divulgado como jogável nesta atualização. O portal apresenta os nove heróis implementados; Thorin e Nox têm cadastro histórico, mas ficam fora da galeria jogável.

### Kharun

- Quatro ativas: coeficientes de dano **+20%**, incluindo perfuração e colisão do Bastão do Céu Partido. Recargas, impactos, velocidades e controles permanecem iguais.
- Roda das Mil Sombras: roubo de vida **15–24%** do HP removido, conforme o nível, com limite de cura de **12% do HP máximo por uso**. Escudos, esquivas e dano excedente não geram cura; redução de cura, HP máximo e KO continuam válidos.
- Guarda da Roda: **16%** contra um ou dois alvos; **24%** contra três ou mais. Começa no primeiro acerto e dura até cinco segundos após a conclusão. Novo uso substitui a proteção. AUTO prioriza Roda.
- Disciplina do Renegado: Aparar conserva **60%** de redução em básicos e ganha **35%** contra habilidades diretas físicas/mágicas. Chance **20–29%** por nível, além de bônus de postura, e recarga compartilhada de **1,5 segundo** após sucesso.
- Aparar exclui dano periódico, refletido, ambiental e verdadeiro. A esquiva vem antes, não consome a recarga de aparada e impede que as duas defesas sejam usadas no mesmo ataque.
- Esquiva própria da Disciplina: **5–9,5 pontos percentuais**, somados à base, atributos e equipamento. Precisão inimiga e limite de 50% continuam válidos.
- Caminho Sem Mestre: posturas de **15% / 25% / 35%** de defesa no nível 1, mantendo o crescimento por nível.
- Reações distintas de esquiva e aparada com bastão, sincronizadas ao relógio da batalha.

### Lyn

Pacotes passivos de dano verdadeiro passam a respeitar a vulnerabilidade de Astarok. Não há novo buff global de dano anunciado para Lyn.

### Mira

A mesma correção inclui suas passivas de dano verdadeiro contra Astarok. Não há aumento global dos coeficientes de Mira nesta revisão.

### Nymeris

Maldições nativas aplicadas ou reaplicadas durante a carga do Cataclismo participam da reação de Astarok. Pilhas de uma mesma maldição contam como uma categoria. Gélido inclui seus servos.

### Todos os heróis

Resistência a crítico passa a ser o 14º atributo distribuível: **+0,5 ponto percentual por ponto**, até **25 pontos** de investimento por atributo. Subtrai a chance crítica do atacante, com piso zero, sem mudar o multiplicador de dano crítico. Aparece em atributos, status, inventário e opções defensivas da Oficina. Saves anteriores recebem zero na nova opção e conservam as alocações existentes.

## Equipamento e Oficina

Dezoito famílias de nível 70: nove armas, quatro peças leves, quatro pesadas e um acessório universal. A identidade é vulcânica: lava, cinzas, ferro e obsidiana do Mundo 3.

- Armas: Espada da Caldeira Eterna; Arco das Brasas Ancestrais; Martelo do Núcleo Ígneo; Gêmeas da Lava Negra; Cajado da Chama Vital; Cajado da Erupção Astral; Grimório da Obsidiana Ardente; Bastão do Sol Vulcânico; Harpa das Cinzas Luminosas.
- Proteções: elmo, armadura, luvas e botas das Cinzas Sagradas e da Obsidiana Imperial.
- Acessório universal: Talismã do Coração Vulcânico.

Onze técnicas de nível 70 começam a cair na fase **650**: roll de **2% por abate comum** e **10% em chefe/minichefe**, escolhendo uma técnica desconhecida elegível. Não há concessão automática ou um roll individual de 2% para cada técnica.

Cada receita pede 300 Essências, 32 Núcleos do Vigia, 28 Núcleos do Arauto, dois materiais de Malkor e três materiais de espécies do M4, nas quantidades 40/32/24. Origens entre 600 e 849 permitem preparar o equipamento antes de Fenrir, sem pedir materiais dos chefes fixos do M4.

## Balanceamento

Valores atuais de Malkor e Soberano substituem as rodadas intermediárias de nerf. Mecânicas, cadência, fases, raiva e regeneração são preservadas.

| Chefe | HP | PATK / MATK, cada | PDEF / MDEF, cada |
| --- | ---: | ---: | ---: |
| Malkor · 600 | 518.700 | 7.000 | 1.300 |
| Soberano Infernal · 700 | 691.600 | 9.000 | 1.800 |

Receitas 50 usam origens 300–500; receitas 60 usam 300–699. Volumes foram redistribuídos. Nenhuma receita/evolução desses tiers pede material do Soberano 700. Equipamentos existentes permanecem válidos.

Na comparação real dos resolvers, a troca 60+5 → 70+5 aumenta o poder total em **9,81–10,57%** nos cinco heróis da build de teste. Não representa um multiplicador universal dos stats finais.

Com heróis nível 75, ascensão 1, seis peças compatíveis 70+5, atributos/skills e formação fixos, HP cheio e AUTO x1: a equipe derrotou Fenrir em **5/5 tentativas**; contra Sacerdotisa e Rei, teve **0/10 vitórias em cada**, sem timeout. Os resultados valem para essa configuração e sementes. Os chefes finais guardam a progressão futura; equipamento 80/90 e ascensão 2 não foram implementados ou simulados.

## Interface

- Ilhas dos mundos 1–4 mostram descrição e ABRIR MUNDO antes da trilha. No rodapé da trilha, VOLTAR AO M1/M2/M3/M4 fica habilitado depois de concluir todos os chefes fixos do próprio mundo, com motivo de bloqueio enquanto faltarem. Retorna a 1/201/401/701. M3 exige 500/600/700; não inicia o último boss vencido. Astarok não entra nessa condição; não existe seletor livre de fases.
- Seletor da tela Heróis amplia o nome e remove a miniatura redundante; retrato grande preservado. Feedback do autoequipar usa total dinâmico de heróis jogáveis (testado com 5,7,9), mantendo a ação em todos eles.
- Inventário oferece seis tipos de equipamento. Itens e Materiais conservam filtros de categoria, raridade e ordenação próprios durante a sessão.
- Recompensas ficam em grupos horizontais, mantendo números inteiros; Essência zero é omitida.
- Dezoito livros de ascensão exibem 1/1. Excesso legado é preservado em overflow.
- Formação mais próxima conserva escala, colunas e pixel art. Ícones antigos de status saem imediatamente do layout.
- Etiquetas dos mapas deixam de formar blocos altos. Bosses 300/400/500/600/700 recebem cenários próprios, sem alterar suas definições de combate.

## Desempenho

Mundos e batalha reutilizam telas, suspendem a apresentação oculta e carregam mapas pela fila assíncrona existente. Trilhas e bosses invisíveis não são carregados na visão geral.

Mediana de sete trocas repetidas na mesma máquina: abrir Mundos **253,23 → 0,76 ms**; retornar à batalha **122,13 → 6,00 ms**. São durações locais da chamada de navegação, sujeitas a cache/disco/carga, não FPS ou resultado Android.

O **teto de 60 FPS** e as otimizações anteriores de HUD, poses e efeitos são preservados. Como já constam de V0.5.2, não são anunciados como novidade V0.6.0. Não foi medida nova redução de CPU, GPU, consumo ou aquecimento em Android desta revisão.

## Correções

- VFX ocultos até receber posição, eliminando o primeiro frame na origem do campo.
- Recuperação única de jornadas de ascensão em andamento: rota paga e materiais preservados; contadores de abate reiniciados; concluídas/estrelas mantidas; backup e rollback em falha de escrita.
- Filtros independentes de Itens/Materiais e quantidades de recompensas sem quebra no meio do número.
- Cadência real de Gélido nos básicos de heróis/servos, normalização entre fases e remoção ao sair do mundo.
- Maldições de Nymeris e dano verdadeiro passivo de Lyn/Mira respeitando Astarok.
- Múltiplos impactos de um uso não gastam várias cargas indevidas de espelhos.
- Limpeza de referências antigas de escudos entre encontros.

## Verificação e limitações

O fechamento do M4 registra **39 suítes/validadores e 41.218 checks aprovados**, incluindo regressões 4C/4D/5A/5B/5C; 105 execuções de combate, 85 pares únicos de cenário/semente e zero timeout. Há cenários repetidos entre rodadas. Render inspecionado em 540×960 e 390×844. CSVs sem erros, com 69 avisos históricos de assets ausentes.

Pendências e limites:

- Aprovação do material, data, exportação e distribuição Android V0.6.0.
- Medição e teste físico de desempenho/áudio desta revisão em Android.
- Equipamento 80/90 e ascensão 2 futuros, sem orçamento validado nesta Beta.
- Mundo 5 indisponível, reservado em 1201–1400.
- Simulações não provam vitória ou impossibilidade para toda composição.
- Quatro avisos de referências ao encerrar a fixture visual permanecem documentados; nenhum erro de script no fechamento do M4.

## Fontes desta preparação

As fontes são do projeto local auditado; não são arquivos exigidos na hospedagem do portal.

- `docs/WORLD4_PATCH_2026_10_11.md` e `data/combat/world4_rules.json`.
- `docs/KHARUN_CRITICAL_COUNTER_BALANCE_2026_10_11.md`, `data/combat/kharun_rules.json`, `data/skills.csv` e `data/attributes/`.
- `docs/BOSS_CRAFT_REBALANCE_2026_10_11.md`, `data/progression/enemy_world_scaling.json` e `data/workshop/workshop.json`; valores posteriores do relatório Kharun prevalecem sobre os intermediários.
- `docs/ASCENSION_INVENTORY_VISUAL_FIXES.md` e `docs/FORMATION_SPACING_POLISH.md`.
- `work/world4_2026_10_11/completion_final.json`, `regressions_final_verified.json` e benchmarks finais com Gélido somente em heróis/servos.
- [Auditoria editorial](content-audit.md), que define o marco V0.5.3 e diferencia implementação, teste e pendências.

## Verificação adicional da interface

Após o fechamento do M4, os pedidos adicionais de mapas e cabeçalho passaram em 124 verificações do fluxo, 58 de cabeçalho/feedback,209 do alvo de UI e renders em duas resoluções:136 do mapa e61 dos heróis em cada. São registros adicionais; o total anterior de41.218 não foi recontado.


## Interface e correções finais de 11/10/2026

- Topo com marca, Ouro e Gemas seguindo a referência final; menu sobreposto com Loja/Missões/Configurações, fechamento por marca/fora/Esc e acentos legíveis.
- Home com batalha real e seus controles, HP e avisos de skills. Nenhuma segunda implementação de combate.
- Loja separa Gemas/Ouro, recrutamento/ascensão/resets e Pacotes em breve; os vinte produtos e preços canônicos permanecem.
- Status alterna o resumo completo; ações de Heróis agrupadas. Seletor sem miniatura repetida mantém nome ampliado.
- Inventário separa Nome/Nível/Poder da silhueta e usa o mesmo ícone canônico da receita no slot e nos detalhes dos seis tipos de peça 50/60/70.
- Resumo acumulado pertence ao encontro e sobrevive à navegação; eventos ocultos e servos mantêm atribuição sem duplicação.
- Têmpera de acessório soma cura realizada ou recebida, usando HP efetivo e contando autocura uma vez.
- Novos recibos offline exigem ausência mínima de 300 segundos; visitas curtas não se acumulam. A ausência elegível inteira usa os limites anteriores; recibos pendentes são preservados.
- Orientação dos bosses revisada em apresentação e animações, sem modificar suas estatísticas ou imagens aprovadas.

Estas mudanças adicionais foram autorizadas depois do congelamento inicial do M4. Evidências específicas e regressões finais constam no relatório de entrega; não foram incorporadas artificialmente ao total anterior de 41.218 checks do M4.

### Ajustes finais de atributos e fundos

Resistência a dano e resistência a controle passam a ter contribuições independentes. O ID antigo resistance continua dano; a nova alocação control_resistance inicia em zero em saves existentes, sem reembolsar ou perder pontos. É o 15º atributo distribuível, com 0,5 p.p./ponto, máximo25pontos e capfinal45% para duração de controles aceitos. Resumo de status e adicionais da Oficina mostram as duas resistências e ícones distintos de crítico. Armas da Sacerdotisa50/60/70 permitem o extra Cura, reutilizando healing_pct e o refino canônico. Precisão e Esquiva ficam em sequência e as letras da tabela foram ampliadas. O topo usa o kit entregue com altura reduzida em cerca de15%, cantos transparentes e fundos M1–3 até o topo, sem modificar a projeção de chão do M4.
