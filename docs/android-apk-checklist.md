# Guia de distribuição e diagnóstico Android

Este repositório hospeda o **site** e links para os APKs via GitHub Releases; não contém o projeto-fonte completo do Godot nem faz exportações Android.

## Tamanho e experiência de download

O APK publicado como **v0.7.2** tinha cerca de **828 MiB** (868.380.318 bytes) em 17/10/2026. Essa dimensão pode desestimular instalações em redes móveis. O botão de download do site sempre aponta para um asset publicado e validado no GitHub; o site não recompacta o APK.

## Diagnóstico antes de alterar a build

1. Exportar uma build Release de teste e comparar o arquivo com a versão Debug, sem mudar a assinatura de distribuições existentes por engano.
2. Inspecionar a pasta de recursos exportados e os tipos de asset que mais ocupam espaço: texturas, folhas de sprites, áudio e vídeos.
3. Revisar o formato e qualidade de importação de áudio e imagens no Godot, preservando transparência, nitidez da pixel art e os efeitos no Android.
4. Conferir se assets de teste e versões intermediárias foram incluídos indevidamente na exportação. Evitar remover recursos carregados dinamicamente.
5. Rever ABIs Android exportadas conforme dispositivos-alvo (por exemplo, ARM64), testando compatibilidade antes de restringir arquiteturas.
6. Instalar sobre a versão anterior em um dispositivo de teste para confirmar assinatura e preservação de saves. **Não orientar usuários a desinstalarem a versão anterior sem backup do progresso.**
7. Monitorar tamanho do APK, duração do primeiro carregamento, memória RAM e performance em aparelho real antes e depois.

**Importante:** nenhuma redução de tamanho é aplicada neste repositório. Otimizar o APK requer acesso ao projeto Godot e testes de instalação.
