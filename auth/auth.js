// Astraryx Idle 0.8.0 — página de retorno dos e-mails de autenticação.
// Cadastro, apelido e login pertencem exclusivamente ao aplicativo Godot.
// Não colocar credenciais administrativas nesta página.
const API_ROOT = 'https://qcwaezahwqrpxcyiuhrh.supabase.co';
const PUBLISHABLE_KEY = "sb_publishable_QJRb9R0BYoZyCeMs86uRnA_O5R1HMCL";

const form = document.getElementById('password-form');
const message = document.getElementById('message');
const success = document.getElementById('success');
const successTitle = document.getElementById('success-title');
const successDetail = document.getElementById('success-detail');
const submit = document.getElementById('submit');
const passwordField = document.getElementById('password');
const confirmField = document.getElementById('confirm');

// Links Supabase com fluxo implícito retornam o token no fragmento (#).
// O token é lido apenas na memória; o fragmento sai imediatamente do histórico.
const params = new URLSearchParams(location.hash.slice(1));
const accessToken = params.get('access_token');
const authType = params.get('type');
const returnedError = params.get('error_description') || params.get('error');
history.replaceState(null, '', '/auth/');

function inform(text, level = 'info') {
  message.hidden = false;
  message.textContent = text;
  message.dataset.level = level;
}

function finish(title, description) {
  message.hidden = true;
  form.hidden = true;
  success.hidden = false;
  successTitle.textContent = title;
  successDetail.textContent = description;
}

async function callAuth(path, method = 'GET', body) {
  const response = await fetch(API_ROOT + path, {
    method,
    headers: {
      apikey: PUBLISHABLE_KEY,
      Authorization: 'Bearer ' + accessToken,
      ...(body ? {'Content-Type': 'application/json'} : {}),
    },
    ...(body ? {body: JSON.stringify(body)} : {}),
    cache: 'no-store',
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error('Falha de autenticação.');
    error.status = response.status;
    throw error;
  }
  return data;
}

async function handleReturn() {
  if (returnedError) {
    inform('O link não pôde ser validado ou expirou. Solicite um novo e-mail pelo jogo.', 'error');
    return;
  }

  if (!accessToken || !authType) {
    inform('Nenhuma confirmação pendente. O site é público: para criar uma conta ou entrar, abra o Astraryx Idle no Android.');
    return;
  }
  try {
    const user = await callAuth('/auth/v1/user');
    if (!user.id) throw new Error('Invalid session');

    switch (authType) {
      case 'signup':
        finish('E-mail confirmado!', 'Sua conta está confirmada. Volte ao Astraryx Idle no Android e faça login. O apelido será configurado dentro do jogo.');
        return;
      case 'recovery':
        inform('Sua identidade foi verificada. Defina uma nova senha para entrar no jogo.');
        form.hidden = false;
        return;
      case 'invite':
        inform('Convite validado. Defina sua senha e depois entre pelo aplicativo. Os novos jogadores não precisam de convite.');
        form.hidden = false;
        return;
      case 'email_change':
        finish('E-mail atualizado!', 'Seu endereço foi confirmado. Volte ao aplicativo para continuar.');
        return;
      default:
        inform('Link validado. Volte ao Astraryx Idle no Android para continuar.');
    }
  } catch {
    inform('Não foi possível validar este link. Solicite um novo e-mail pelo aplicativo.', 'error');
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  const password = passwordField.value;
  if (password.length < 10) {
    inform('A senha deve ter pelo menos 10 caracteres.', 'error');
    return;
  }
  if (password !== confirmField.value) {
    inform('As senhas informadas não são iguais.', 'error');
    return;
  }
  submit.disabled = true;
  try {
    await callAuth('/auth/v1/user', 'PUT', {password});
    passwordField.value = '';
    confirmField.value = '';
    finish('Senha salva!', 'Agora volte ao aplicativo Astraryx Idle e faça login usando seu e-mail e sua nova senha.');
  } catch {
    inform('Não foi possível alterar sua senha. Solicite um novo link pelo aplicativo.', 'error');
  } finally {
    submit.disabled = false;
  }
});

handleReturn();
