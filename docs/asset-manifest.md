# Manifesto dos recursos visuais

Todas as imagens são recursos oficiais ou capturas reais do runtime Godot. Nenhuma imagem de gameplay foi gerada ou composta. Fontes originais permanecem intactas no projeto; capturas originais e relatório do fixture ficam em `work/site_v2_2026_10_11/captures_original/`.

As capturas usam progressão sintética criada em armazenamento isolado, sem dados de conta ou save pessoal. Retratam as mesmas cenas e sistemas usados por Main em produção. O fixture controla o momento da batalha para revisão visual; não altera o runtime ou os dados canônicos.

## Kit de HUD fornecido pelo usuário

Fonte: `Astraforge_Idle_Assets_HUD_Topo.zip`. SHA-256 do ZIP original: `cc44575d76852bb393834074e621881371aaf6e9aa3dfe3aa81f6a485ffeb06a`. As cinco imagens do ZIP foram preservadas byte a byte; os aliases de runtime mantêm os nomes originais.

Painéis e áreas clicáveis são Controls do Godot; HudTopArt.gd desenha a base do painel em código e suas bordas usam regiões do kit fornecido. Os números e rótulos pintados no kit não entram na área monetária: os contadores são labels vivos do runtime. Nenhum mockup foi gerado para estas capturas e nenhum HUD foi composto depois da captura.

| Arquivo no ZIP | Alias no runtime | Original preservado | SHA-256 |
| --- | --- | --- | --- |
| `assets/01_painel_astraforge_idle.png` | `godot/assets/ui/hud_top_v2/01_painel_astraforge_idle.png` | `work/hud_top_pack_2026_10_11/01_painel_astraforge_idle.png` | `f5632f01a35da8bf1b1b1d62698a8d08f42227cf33cb7752b891270c72ec626d` |
| `assets/02_painel_ouro.png` | `godot/assets/ui/hud_top_v2/02_painel_ouro.png` | `work/hud_top_pack_2026_10_11/02_painel_ouro.png` | `cbc696a778b95441aa549d2f069d788eb48fd138f87fb897aab9cbcf271072eb` |
| `assets/03_painel_gemas.png` | `godot/assets/ui/hud_top_v2/03_painel_gemas.png` | `work/hud_top_pack_2026_10_11/03_painel_gemas.png` | `a72f79362fd5c767d51677d7e84b769ae93f65943190cd876d0a3395a22e6c57` |
| `assets/04_botao_adicionar.png` | `godot/assets/ui/hud_top_v2/04_botao_adicionar.png` | `work/hud_top_pack_2026_10_11/04_botao_adicionar.png` | `607090a1bdb28d6cf526d0725238e9861ed7e9c7165c8d40fcc635f84bb19a87` |
| `assets/05_ornamento_diamante.png` | `godot/assets/ui/hud_top_v2/05_ornamento_diamante.png` | `work/hud_top_pack_2026_10_11/05_ornamento_diamante.png` | `9e022610deafb5ffdf76f1d609b4672f661b3a7d19ca854526630713cf17248c` |

Uso no runtime: `assets/01_painel_astraforge_idle.png` → Arte da marca / botão do menu principal; `assets/02_painel_ouro.png` → Bordas e ícone do contador de ouro; `assets/03_painel_gemas.png` → Bordas e ícone do contador de gemas; `assets/04_botao_adicionar.png` → Art dos atalhos ShopShortcut para a loja; `assets/05_ornamento_diamante.png` → HeaderJunctionDiamond0 e HeaderJunctionDiamond1.


Os hashes do código e dos cinco PNGs usados no lote constam em `work/site_v2_2026_10_11/capture-batch.json`; a verificação das cópias do ZIP está em `work/site_v2_2026_10_11/asset-inputs.json`.

## Recursos entregues

| Recurso | Dimensões | Bytes | Fonte | SHA-256 do arquivo web |
| --- | ---: | ---: | --- | --- |
| `assets/characters/hero_kael.webp` | 201 × 192 | 49484 | `godot/assets/sprites/isolated_runtime/preview_hero_kael.png` | `972a802645e852c0cfc0613680807783984c4d450094e9ab46d33b6b1f80d704` |
| `assets/characters/hero_aelia.webp` | 130 × 209 | 47346 | `godot/assets/sprites/isolated_runtime/preview_hero_aelia.png` | `46a8d43bc845dd81d84e61d27ef11375c3729346654d14f7f5f503eeb7f2e444` |
| `assets/characters/hero_lyn.webp` | 335 × 342 | 150624 | `godot/assets/sprites/isolated_runtime/preview_hero_lyn.png` | `e1e26af74e000270252d639245035c6f1d02cac6e0decb036d72aadc8b882647` |
| `assets/characters/hero_mira.webp` | 198 × 218 | 65558 | `godot/assets/sprites/isolated_runtime/preview_hero_mira.png` | `0f50daf6ed15dd98e8909416dc51b84ca29dc8b0b6feb261107f3d46c206492e` |
| `assets/characters/hero_dorrik.webp` | 149 × 167 | 42348 | `godot/assets/sprites/isolated_runtime/preview_hero_dorrik.png` | `d0f42da9311f9c0b2de801779ed19f8f1e2ecc41f1d9f8a55f878a89ea6a305d` |
| `assets/characters/hero_fae.webp` | 169 × 169 | 40466 | `godot/assets/sprites/isolated_runtime/preview_hero_fae.png` | `12a261b0d341eb866e057ff32c35056af2a745e79f0ea4ecee607690f4ea4b6e` |
| `assets/characters/hero_bardo.webp` | 124 × 110 | 25632 | `godot/assets/sprites/isolated_runtime/preview_hero_bardo.png` | `4feebc719cb244130a8dad6cdb6b71999e725e662007880fe3d4d6063eb63f20` |
| `assets/characters/hero_kharun.webp` | 356 × 477 | 223618 | `godot/assets/sprites/isolated_runtime/preview_hero_kharun.png` | `0d1bb240a17a813ff41dabf0d5cb562d54fc2fa29f5cba34f607bfba6814d754` |
| `assets/characters/hero_nymeris.webp` | 303 × 290 | 134422 | `godot/assets/sprites/isolated_runtime/preview_hero_nymeris.png` | `7196fd8bdec95706ca2700c058a490549cad3dae39b438114a6188cbde339b04` |
| `assets/branding/emblem.webp` | 128 × 128 | 21884 | `godot/assets/ui/battle_chrome/icons/runtime/hud/icon_astraforge_emblem.png` | `f81e786de55d610a2bacd1c1ff2c76cfb0362a1b0c6ea03295da4e1d7b03f8b7` |
| `assets/branding/favicon.png` | 128 × 128 | 24356 | `godot/assets/ui/battle_chrome/icons/runtime/hud/icon_astraforge_emblem.png` | `4681eea0c401187fd9b975a5e123396f3d2f337174d8444f721dfdad85fd46d8` |
| `assets/screenshots/world1.webp` | 540 × 960 | 218650 | `work/site_v2_2026_10_11/captures_original/world1.png` | `30fc6fb7bb7f9921920fdc716592332179365b398ad2f95ff82bc9eaa45cf2e4` |
| `assets/screenshots/world2.webp` | 540 × 960 | 289176 | `work/site_v2_2026_10_11/captures_original/world2.png` | `5beff2c5c1604397e24206983982f33d8e0ca06c0f545f6e7884cd44bb380053` |
| `assets/screenshots/world3.webp` | 540 × 960 | 272920 | `work/site_v2_2026_10_11/captures_original/world3.png` | `26b0b580d8730a9be9d61a3448d888a12c5e0a8e44582e1c4a309c02a4993d96` |
| `assets/screenshots/world4.webp` | 540 × 960 | 227800 | `work/site_v2_2026_10_11/captures_original/world4.png` | `007c57fddac34038709147c1061f8906fe0603c09877fa3b3696006752a76d5f` |
| `assets/screenshots/fenrir.webp` | 540 × 960 | 216720 | `work/site_v2_2026_10_11/captures_original/fenrir.png` | `deff105f07bcf53803ea0b9f61d40964681068d847ca5fa15c3f317969e91267` |
| `assets/screenshots/priestess.webp` | 540 × 960 | 249726 | `work/site_v2_2026_10_11/captures_original/priestess.png` | `dc17f06593f5df6a2981d8d280855a773fbd415703f4604ae7ed76c0001d0735` |
| `assets/screenshots/winter-king.webp` | 540 × 960 | 225912 | `work/site_v2_2026_10_11/captures_original/winter-king.png` | `bb85f5741fd90ef29d405dbea7d5854c321ab417bc503dad43b9e71ba0fd12bd` |
| `assets/screenshots/astarok.webp` | 540 × 960 | 219702 | `work/site_v2_2026_10_11/captures_original/astarok.png` | `ef192bf23c10fb6e1b55fa930c94f1b3638eaa5df15b603748f2e2fbf05c2927` |
| `assets/screenshots/inventory.webp` | 540 × 960 | 118466 | `work/site_v2_2026_10_11/captures_original/inventory.png` | `d41ef3d8d2edfe2c7d36ca60e9de47e1cbd97847bfab3b7bbd81623b5c76b74b` |
| `assets/screenshots/forge.webp` | 540 × 960 | 110496 | `work/site_v2_2026_10_11/captures_original/forge.png` | `8f7d28920964ad5d889eb17ccf21b61ee236e30c0bf0b4914302a85f8938a123` |
| `assets/screenshots/forge-overview.webp` | 540 × 960 | 132782 | `work/site_v2_2026_10_11/captures_original/forge-overview.png` | `0e1200c23ed8bbca9bb8541f29b6677a72c1923238de1aad34a536190acfee55` |
| `assets/screenshots/heroes.webp` | 540 × 960 | 133810 | `work/site_v2_2026_10_11/captures_original/heroes.png` | `b9426a8a7eb17d1783bbf120867c327d4257795c0b41c87a34def703428b2ac3` |
| `assets/screenshots/missions.webp` | 540 × 960 | 89374 | `work/site_v2_2026_10_11/captures_original/missions.png` | `bc3410430cd62aa6b08a9cd5f5a31cea51b4719792254de7136f927d96e4c4d5` |
| `assets/screenshots/world-map.webp` | 540 × 960 | 188634 | `work/site_v2_2026_10_11/captures_original/world-map.png` | `b5388671c8c67dbd05e079ead8dc15305691363fdc28debcaa5e0c557d9b5a51` |
| `assets/screenshots/kharun-skill.webp` | 540 × 960 | 269518 | `work/site_v2_2026_10_11/captures_original/kharun-skill-26.png` | `40af7212d872e95722c28ba3267f1a71d113ce34ec83919a7835487b93392061` |
| `assets/screenshots/shop-gems.webp` | 540 × 960 | 144970 | `work/site_v2_2026_10_11/captures_original/shop-gems.png` | `5b9329ca71686bfd76585e4845fb67c9d408138f9aa7878deb36b32522d6f838` |
| `assets/screenshots/shop-gold.webp` | 540 × 960 | 144972 | `work/site_v2_2026_10_11/captures_original/shop-gold.png` | `17ebfbbd0ef12d0bfdb6b21cefc5e418e7e4fbf6d544783dce236369125060a1` |

## Procedência e transformação

### `assets/characters/hero_kael.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_kael.png` (201 × 192). SHA-256 original: `bed80fcf9a83c13cded4d046c5cd46317a306cfe30a11dd528758a7c53dedb0c`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://assets/sprites/heroes/hero_kael/visual_v2_2026_10_10/idle_01.png`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/characters/hero_aelia.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_aelia.png` (130 × 209). SHA-256 original: `e4da81df72228d5f907ccf48f24c54127c1f4ca2259408d91d82af8dd714b9a0`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://assets/sprites/heroes/hero_aelia/visual_v2_2026_10_10/idle_01.png`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/characters/hero_lyn.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_lyn.png` (335 × 342). SHA-256 original: `02d26ed79977621125be5f213e50f610ca5fe630695692d82d06f89b97e01f73`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://assets/sprites/heroes/hero_lyn/refined_v2/frame_00.tres`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/characters/hero_mira.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_mira.png` (198 × 218). SHA-256 original: `bcd2a37be3fb56c164d15a160425c69d81a812a457315e412235ab6f1ee45059`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://assets/sprites/heroes/hero_mira/visual_v2_2026_10_10/idle_01.png`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/characters/hero_dorrik.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_dorrik.png` (149 × 167). SHA-256 original: `7d69e0cca40356ec4d00807563cf16e4adb60ff75654d2a61edabc48576ec126`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://assets/sprites/heroes/hero_dorrik/idle/idle_01.tres`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/characters/hero_fae.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_fae.png` (169 × 169). SHA-256 original: `c054b018084afab2171f7f3fed79659a714dff1a60004f44ddddf6eb74cd55de`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://assets/sprites/heroes/hero_fae/visual_v2_2026_10_10/idle_01.png`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/characters/hero_bardo.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_bardo.png` (124 × 110). SHA-256 original: `334232f1a96d851d2589c31b34bc25fb16f90ad0b9ef6e4f1b96390655945899`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://assets/sprites/heroes/hero_bardo/idle/idle_01.png`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/characters/hero_kharun.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_kharun.png` (356 × 477). SHA-256 original: `013491f984fa1bb153e8c283050ddebc5d13481560f8a084631040d2cae4cf19`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://assets/sprites/heroes/hero_kharun/clean_v2/idle_01.tres`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/characters/hero_nymeris.webp`

Pose idle aprovada, usada por DataManager.get_hero_idle_preview_resource() na UI atual.

Fonte: `godot/assets/sprites/isolated_runtime/preview_hero_nymeris.png` (303 × 290). SHA-256 original: `2dbbc00afb7b5012148514d72f14334517e7eda90fea4e52fb7848397797d41b`. Conversão WebP sem perdas.

Mapeamento canônico: `godot/resources/ui/hero_idle_preview_regions.json`; asset BODY original: `res://resources/nymeris_rework/walk_00.tres`. A cópia web mantém a mesma pose recortada já usada na UI.

### `assets/branding/emblem.webp`

Emblema oficial da TopBarV2.tscn; arquivo PNG atual do HUD.

Fonte: `godot/assets/ui/battle_chrome/icons/runtime/hud/icon_astraforge_emblem.png` (128 × 128). SHA-256 original: `f80c3d54a46e306579b83f861b65977de0b72d2279917c3ab1b0008d63aa4163`. Conversão WebP sem perdas.

### `assets/branding/favicon.png`

Mesmo emblema oficial do HUD, em PNG sem alteração de pixels.

Fonte: `godot/assets/ui/battle_chrome/icons/runtime/hud/icon_astraforge_emblem.png` (128 × 128). SHA-256 original: `f80c3d54a46e306579b83f861b65977de0b72d2279917c3ab1b0008d63aa4163`. Conversão WebP sem perdas.

### `assets/screenshots/world1.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/world1.png` (540 × 960). SHA-256 original: `583da991ccc9edab992f98d980650770abc8a3ce05671bf3613cb2d8b03b5fdd`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/world2.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/world2.png` (540 × 960). SHA-256 original: `00d175e796361930fc7d68b05048322a8581182e0627feb0e578ae46f1908df0`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/world3.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/world3.png` (540 × 960). SHA-256 original: `99acd1f7c0ba7805dab1de3bd82edf6b1a1af047630827bfa40798b410ade6a3`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/world4.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/world4.png` (540 × 960). SHA-256 original: `beddbd35ad3a9c2452185b4c0d311b00d7ed0e5d20fef13ab510e8f3cd8de4a5`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/fenrir.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/fenrir.png` (540 × 960). SHA-256 original: `bd584e3ad5b4df3b0d157023200db6bbffbcb20b230d53d1f2bb92989dfb53cd`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/priestess.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/priestess.png` (540 × 960). SHA-256 original: `45e585d858fb50e76d9e80b85a4d8bd55e21a5857fe6d015f0b6f48103a8b747`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/winter-king.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/winter-king.png` (540 × 960). SHA-256 original: `d70272c0de57b2ecf09c4fedc0e002a562edd2f430388222bf2d48b20ef58b88`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/astarok.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/astarok.png` (540 × 960). SHA-256 original: `f253d4e4b7e9f979e4820aafb741c46dc066717838622dadc3d11a62bc0794b3`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/inventory.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/inventory.png` (540 × 960). SHA-256 original: `7f914bf48d39d065b5d2286ea9a4f4cd15ccc758b5946f0a00cb0377e5e64aac`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/forge.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/forge.png` (540 × 960). SHA-256 original: `9759c7807927d0bb317c42f65d9b8d59ce8eeba6e9ac1d9e657dba62321fc915`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/forge-overview.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/forge-overview.png` (540 × 960). SHA-256 original: `0ab2567a46b7ca4c8f1219fbb0bb6a0fbb5842b6a8d73213e8e26913cf6abde9`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/heroes.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/heroes.png` (540 × 960). SHA-256 original: `0e582fd12dcc64550a315d9f1af93194bd71f206195b20c9cf5e9a6af3bd5a0c`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/missions.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/missions.png` (540 × 960). SHA-256 original: `2a4eddde79f2aefecbd5a4548af2cfe39b67e29c9ed1b4cb01b613d29f8724c6`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/world-map.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/world-map.png` (540 × 960). SHA-256 original: `edd4369b431ea5ebc79f7bf736e68c984bfca2a6c9b2493b1f012592714f0566`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/kharun-skill.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/kharun-skill-26.png` (540 × 960). SHA-256 original: `f07fdee1f5b5b9df24162913d42bc578eb9b76354f194bb90d7f415e65ec25cd`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/shop-gems.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/shop-gems.png` (540 × 960). SHA-256 original: `15eeffe2813995f00ee1a17bbbf890e8a00b9bd71d4aa1d7a786fb91b405a0af`. Conversão WebP qualidade 90; sem redimensionamento.

### `assets/screenshots/shop-gold.webp`

Captura integral do runtime Godot Main, CampaignBattleSession e VerticalSliceBattle; fixture local com progressão sintética e save isolado. Sem overlay de depuração e sem montagem de gameplay.

Fonte: `work/site_v2_2026_10_11/captures_original/shop-gold.png` (540 × 960). SHA-256 original: `bddb5690b2b87b0dffd2e87a21aeac71ef4e565dc54419dcd7eb07b520098c97`. Conversão WebP qualidade 90; sem redimensionamento.

## Roster divulgado

Nove heróis jogáveis confirmados em `data/hero_roster.json` e DataManager. Thorin e Nox têm registros em `heroes.csv`, mas não constam no roster jogável atual; por isso não aparecem na galeria. Nerissa usa o ID permanente `hero_bardo`.

## Capturas indisponíveis

Nenhuma das capturas selecionadas para a galeria ficou indisponível.

A galeria mostra combate dos quatro mundos, quatro chefes do M4, habilidade de Kharun, inventário/equipamento, oficina/forja, heróis, missões e mapa. O mapa geral preserva o fluxo verdadeiro: escolher a ilha mostra sua descrição e o botão ABRIR MUNDO. Não se afirma verificação em aparelho Android a partir destas capturas de PC.

O fixture de captura passou com 80 verificações e 0 falhas. Foram preservados 21 PNGs integrais, dos quais 17 vistas foram selecionadas para o portal (quatro momentos da habilidade de Kharun e a visão geral do mapa são mantidos como evidência). O primeiro ensaio histórico falhou porque o fixture tentou gerar um item de nível não aceito pelo gerador antigo; apenas o fixture foi corrigido para um nível válido. A evidência RED original foi preservada, assim como as capturas anteriores à renovação da Home.

Lote de captura atual: `20261012T024054Z`. Evidência anterior preservada em `work/site_v2_2026_10_11/capture_history/20261012T024054Z`. Hashes das fontes de runtime utilizadas e dos PNGs originais em `work/site_v2_2026_10_11/capture-batch.json`.

Entrega visual atual: 28 imagens, 4,079,366 bytes (3.89 MiB). Screenshots preservam o viewport de 540 × 960, sem recorte ou redimensionamento.

Verificação de assets: caminhos, dimensões, hashes, roster/skills do DataManager, cópia RGBA sem perdas para personagens/branding e ausência de EXIF privado. Resultado em `work/site_v2_2026_10_11/assets-validation.json`.

Metadados de verificação completos (hash da fonte, hash web, dimensão, transformação e mapeamento): `work/site_v2_2026_10_11/asset-manifest.json`.
