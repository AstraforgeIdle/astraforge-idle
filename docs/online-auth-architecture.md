# Astraryx Idle v0.8.0 — autenticação no jogo

## Limites e responsabilidades
- O site https://astraryxidle.github.io/ permanece público, sem login ou convite.
- A página /auth/ **não** cadastra jogadores: serve apenas como callback para links de confirmação do Supabase e, quando necessário, redefinição de senha.
- Login, cadastro e escolha do apelido acontecem no APK Godot 4.x.
- PostgreSQL/Supabase Auth guarda contas; `public.player_profiles` guarda o apelido do usuário autenticado via políticas RLS.
- Brevo entrega os e-mails do Supabase.

## Fluxo do APK
1. Tela inicial do Godot: **Entrar**, **Criar conta**, **Esqueci minha senha** (sem convite obrigatório).
2. Criar conta: coletar e-mail e senha e chamar Supabase Auth `/auth/v1/signup`. Exigir confirmação por e-mail.
3. O usuário confirma pelo link e chega ao callback público `/auth/`, que instrui retornar ao APK. Se o cadastro for iniciado no Godot, utilizar o fluxo implícito de autenticação (emailRedirectTo do site oficial) para que a sessão não dependa de um verificador PKCE ausente no navegador.
4. O APK autentica com e-mail/senha, obtendo tokens de acesso e renovação. Não armazenar tokens em código, logs nem repositório. Gerenciar renovação e logout.
5. Após login, consultar `player_profiles` usando token JWT autenticado. Se ainda não há perfil, exibir **Escolher apelido** no APK e inserir `{user_id: user.id, nickname}`. Tratar apelido duplicado com nova tentativa.
6. Solicitação de redefinição de senha: Supabase Auth `/auth/v1/recover`, com retorno ao site `/auth/`; a página oferece **apenas** nova senha, sem criação de perfil.
7. Regras de segurança: incluir no APK apenas a chave pública `sb_publishable_...`; **nunca** a `service_role` ou credenciais SMTP. Todas as tabelas de dados pessoais devem usar RLS.
8. Salvar progressão na nuvem e competições somente em próximas etapas, após validar sessões/contas e definir lógica de servidor contra trapaças.

## Estado atual
O projeto Supabase é `qcwaezahwqrpxcyiuhrh`. O site não contém o projeto-fonte Godot; o cliente do jogo ainda deve ser implementado no repositório do jogo. Não confundir um convite administrativo de teste com o cadastro dos jogadores.
