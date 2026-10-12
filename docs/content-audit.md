# Auditoria de conteúdo — Portal V2 e V0.6.0 Beta

Auditoria realizada para o pacote local de revisão em 11/10/2026. Essa data é da preparação, **não uma data de lançamento**. As páginas não afirmam publicação de V0.6.0, APK disponível, métricas de jogadores ou resultados Android sem evidência.

## Fontes e marco histórico

Ordem aplicada: runtime `godot/`, dados canônicos `data/`, relatórios atuais `docs/` e assets aprovados. O HTML legado do jogo não foi consultado. O HTML de patch V0.5.2 fornecido pelo usuário foi utilizado exclusivamente como documento histórico e referência visual.

O marco V0.5.3 é o guia `docs/ANDROID_053_MANUAL_EXPORT.md`, com a entrada de preparação correspondente no `CHANGELOG.md`. O guia registra 0.5.3-beta/código 10 e conteúdo preparado para exportação manual; também foi revisado em 11/10 para incorporar seletor, nomes 60 e músicas dos mundos 1–3. Essas mudanças são tratadas como conteúdo documentado de V0.5.3, **não novidades V0.6.0**.

Não há Git neste workspace nem snapshot comprovado de uma Release pública V0.5.3. Portanto “desde V0.5.3” significa aqui as revisões posteriores explicitamente identificadas nos relatórios de formação, ascensão, bosses/craft, Kharun e M4. O pacote não reconstrói um diff de APKs ou uma lista histórica de publicação não documentada. A consulta pública inicial ao site e Releases não confirmou conteúdo acessível; histórico publicado e data continuam não verificados.

V0.5.3 recebe um resumo documental curto, sem data de lançamento e com título descritivo identificado como tal. V0.5.2 conserva a data impressa em seu original; ela não é reutilizada como data de V0.6.0 ou como prova de Release pública.

## Rastreabilidade das afirmações

Os caminhos abaixo são relativos ao repositório local auditado. Os relatórios listam condições e evidências; os dados e runtime confirmam a implementação. Fontes antigas conflitantes são subordinadas às revisões finais.

| Afirmação do portal/notas | Fonte canônica ou runtime | Evidência e estado |
| --- | --- | --- |
| M4 Picos Congelados, 701–1200; catálogo 1.400; M5 1201–1400 indisponível | `data/combat/world4_rules.json:4–5`, `data/stages.csv`, `data/world/WORLD_200_STAGE_PROGRESSION.json`, `docs/WORLD4_PATCH_2026_10_11.md` | Implementado; campanha/migração testadas no fechamento M4. M5 não anunciado jogável. |
| Quinze espécies, fases de entrada e habilidades | `data/combat/world4_rules.json:mobs`, `data/enemies.csv` | Tabela cruzada com relatório M4. Não há espécie inventada. |
| Ondas 5–8 e pressão em ambas as linhas | `godot/scripts/progression/encounter_builder.gd`, `godot/scripts/battle/world4_combat.gd:setup/action`, regras M4 | Testes de targeting, ondas e rampas aprovados; texto não promete imunidade da retaguarda. |
| Gélido: CD ×0,85 e velocidade básica ×0,85 somente em heróis/servos | `data/combat/world4_rules.json:environment`, `world4_combat.gd:setup/apply_environment`, `vertical_slice_battler.gd:effective_attack_interval` | Revisão final hero-only. A descrição evita confundir duração menor de recarga com multiplicador de taxa. Mobs/bosses excluídos; transição testada. |
| Fenrir 850, Sacerdotisa 1000 e Rei 1200 | `data/bosses.csv`, regras M4 | Fases, sinais, controles/espelhos e passivas testados. Não usa stats de CSV bruto M3 sem scaling. |
| Astarok 2% em comuns; sem fase fixa/pity; força com a fase | `data/workshop/workshop.json:rare_encounters`, `world4_combat.gd`, `EncounterBuilder` | Faixas 701–849/851–999/1001–1199. 202 aparições em 10.000 rolls de QA; site divulga taxa canônica 2%, não estimativa como promessa. |
| Cataclismo reage a debuffs novos e a maldições Nymeris | `world4_combat.gd:tick/debuff_category/record_debuff`, `vertical_slice_battler.gd:apply_status` | Suíte de counters Nymeris, 28 checks. Aplicação anterior ao cast não é anunciada como nova. |
| Lyn/Mira: vulnerabilidade verdadeira de Astarok | regras M4 `true_multiplier`, pipeline de dano em `vertical_slice_battle.gd` | 102 checks de passivas verdadeiras. Correção contextual; nenhum buff global inventado. |
| Kharun quatro ativas +20% | `data/skills.csv:77–80`, `data/skill_upgrades.csv`, `data/combat/kharun_rules.json:skybreak` | Relatório Kharun confirma antes/depois; recargas/controles preservados. |
| Roda: 15–24%, cap 12%, guarda 16–24%; aparar 60%/35%, CD 1,5 s; esquiva 5–9,5 p.p.; postura 15/25/35 | regras Kharun `wheel/discipline/path`, `godot/scripts/battle/kharun_combat.gd` | 1.431 checks de sustain/counter. Cura mede HP removido, não dano teórico; exclusões e chance 20–29% confirmadas. |
| Resistência a crítico: 14º atributo, 0,5 p.p./ponto, cap 25; redução de chance | `data/attributes/ATTRIBUTE_SYSTEM_RULES.json`, `ATTRIBUTE_GAINS_BY_HERO.json`, `DERIVED_STATS_FORMULAS.json`, `AttributeMathV1` | Relatório Kharun + testes de atributos/caps e save. Não reduz multiplicador crítico. |
| Dezoito famílias 70; onze técnicas 650+, 2% comum/10% boss; receita 300/32/28/2/40/32/24 | `data/workshop/workshop.json:recipes/recipe_unlocks`, `WorkshopSystem` | 187 checks de craft 70/taxas. Fontes 600–849, nenhuma peça depende de bosses 850/1000/1200. |
| Poder final 60+5→70+5 +9,81–10,57% | `work/world4_2026_10_11/benchmark_late_final.json:equipment_60_to_70` | Cinco heróis da build fixa; não confundir orçamento base 1,50→1,75 com poder final. |
| Malkor 518.700 HP/7.000 ATK/1.300 DEF; Soberano 691.600/9.000/1.800 | `data/progression/enemy_world_scaling.json`, resolvers oficiais, relatório Kharun | Valores finais absolutos prevalecem sobre rodadas intermediárias do relatório Boss Craft. |
| Receitas 50: 300–500; 60: 300–699; sem material 700 | `data/workshop/workshop.json`, `docs/BOSS_CRAFT_REBALANCE_2026_10_11.md` | 36 fabricações e 18 evoluções reais; custos/refino/identidade persistidos. |
| Formação, VFX, ascensão, livros 1/1, filtros e recompensas | `docs/FORMATION_SPACING_POLISH.md`, `docs/ASCENSION_INVENTORY_VISUAL_FIXES.md`; telas/sistemas correspondentes | Ascensão 169; inventário 61; render e formação aprovados. Texto declara reset de contadores em jornadas em andamento, não promete conservar esses contadores. |
| Mapas internos M1–4 e atalho condicionado a bosses fixos | `WorldNavigationScreenV2`, `GameProgressionManager`, relatório M4 | Navegação/atalhos testados. Sem teleporte livre ou exigência de Astarok. |
| Navegação PC 253,23→0,76 ms e 122,13→6 ms | `docs/ASCENSION_INVENTORY_VISUAL_FIXES.md`, `work/ascension_vfx_fix_2026_10_11/world_navigation_before.json` e `world_navigation_after.json` | Mediana de 7 chamadas repetidas locais. Não equivale a tempo de render ou FPS Android. |
| Teto 60 FPS preservado | `godot/project.godot:17`; original V0.5.2 | Existe, mas precede este patch. Sem novo ganho CPU/GPU ou garantia de 60 FPS constantes. |
| Seis regiões, arenas/covil, cenários de bosses M2/M3 e música M4 | `data/ui/world_navigation.json`, `data/audio/world_music.json`, manifestos art/source e relatório M4 | Recursos/importação/visuais e áudio decodificado conferidos. Áudio físico Android pendente. |
| Nove heróis jogáveis | `data/hero_roster.json`, `DataManager.get_playable_hero_ids()` | Kael, Aelia, Lyn, Mira, Dorrik, Fae, Nerissa (`hero_bardo`), Kharun, Nymeris. Onze linhas em heroes.csv não significam onze jogáveis; Thorin/Nox excluídos. |
| 39 suítes/41.218 checks; 105 execuções/85 pares únicos; zero timeout | `work/world4_2026_10_11/completion_final.json`, `regressions_final_verified.json`, `balance_summary_final.json` | Fechamento completo. Reexecução de 22 suítes/35.819 checks confirma Gélido/counters atuais. São evidências do M4, não testes novos do site. |

## Simulações: limites da conclusão

Condições da revisão M4: heróis 75, ascensão 1, seis peças 70+5 por herói, formação/atributos/skills fixos, HP cheio, AUTO x1, sem bônus carregados, passo 0,02 s e teto 900 s. Fenrir 5/5 vitórias, Sacerdotisa 0/10, Rei 0/10. As 105 execuções incluem cenários/sementes repetidos; não são 105 amostras independentes.

Não se afirma que toda party está matematicamente impedida de vencer Sacerdotisa/Rei. Equipamentos 80/90 e ascensão 2 não existem; sua vitória ou orçamento não podem ser validados. Cenários comuns após 1000 são fixtures de QA, não prova de acesso pela campanha atual antes de vencer Sacerdotisa.

Não foram anunciados como novidade: novos heróis jogáveis, V0.6.0 exportada, redução térmica, novo ganho de GPU, teto de 60 FPS recém-criado, reforma visual completa de Fae/Kael/Aelia/Mira de V0.5.2 ou músicas M1–3 documentadas em V0.5.3. O resumo histórico 0.5.3 não vira uma falsa Release.

## Preservação do HTML V0.5.2

O original fornecido foi copiado byte a byte para `updates/v0.5.2/original.html`.

- SHA-256: `ad7d31c5464b5024f27caeb5b82b37de0f743220ced93947d1a76f79dc506811`.
- Tamanho: 9.501.157 bytes.
- 22 ocorrências de imagens WebP embutidas; 20 imagens únicas extraídas sem transformação de pixels para `updates/v0.5.2/assets/`.
- Dependências originais: CSS/JS embutidos, âncoras locais e imagens data URI. Não foram encontradas URLs privadas ou de arquivos locais, credenciais ou dependências externas de imagem.
- A página adaptada conserva a prosa, estilos e comportamento originais, com navegação ao portal, aviso histórico, skip link, canonical/OG, dimensões e carregamento diferido de imagens. A data original 10/10/2026 permanece no documento histórico.
- `archive-manifest.json` registra hashes, dimensões e transformações. Conteúdo histórico não foi reescrito para refletir balanceamento atual.

## Pendências de publicação e problemas registrados

- Conteúdo/lançamento V0.6.0 dependem da aprovação humana; nenhuma publicação ou exportação de APK foi feita nesta tarefa.
- Não se confirmou Release pública V0.5.3 por meio do registro de exportação. O portal trata indisponibilidade de API/APK sem inventar URLs.
- Android físico da revisão atual não testado: FPS, CPU, GPU, áudio, temperatura e consumo pendentes.
- Validador de dados conserva 69 avisos históricos de assets ausentes; fixture visual registra 4 avisos RefCounted no encerramento, sem erros de script. Não se declara “zero avisos” no portal.
- As capturas são reais do Godot, algumas preparadas com perfil isolado de QA. Sua procedência e limites são descritos no manifesto de assets; não são ilustrações de gameplay.
- O runtime, balanceamento, saves, presets Android e APKs permanecem fora do escopo de edição deste site.

## Pedidos adicionais de interface (11/10/2026)

O congelamento para o portal recebeu exceções autorizadas: ilhas→descrição→ABRIR MUNDO, trilha com retorno à primeira fase gated pelos bosses fixos; seletor de heróis sem miniatura redundante e feedback autoequipar dinâmico. QA: `work/world_map_flow_2026_10_11/final_qa_summary.json` (124/58/209checks e dois tamanhos). A renovação da Home, do topo, de Heróis e do Inventário está incluída na verificação final documentada em validation.md.


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
