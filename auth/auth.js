// Astraryx Idle · convite Supabase Auth via navegador estático (sem backend próprio).
// Esta chave é publishable: não concede privilégios administrativos.
const API_ROOT = 'https://qcwaezahwqrpxcyiuhrh.supabase.co';
const PUBLISHABLE_KEY = "sb_publishable_QJRb9R0BYoZyCeMs86uRnA_O5R1HMCL";
const form = document.getElementById('activation-form');
const message = document.getElementById('message');
const success = document.getElementById('success');
const submit = document.getElementById('submit');
const nicknameField = document.getElementById('nickname');
const passwordField = document.getElementById('password');
const confirmField = document.getElementById('confirm');

// Tokens de autenticação pertencem ao fragmento (#), nunca ao query string.
// Apagar imediatamente o fragmento do histórico para evitar exposição acidental.
const params = new URLSearchParams(location.hash.slice(1));
const accessToken = params.get('access_token');
const authType = params.get('type');
const returnedError = params.get('error_description') || params.get('error');
history.replaceState(null, '', '/auth/');

let userId = null;
let passwordSaved = false;

function inform(text, level='info') {
  message.hidden = false;
  message.textContent = text;
  message.dataset.level = level;
}

async function send(url, options={}) {
  const res = await fetch(API_ROOT + url, {
    ...options,
    headers: {
      'apikey': PUBLISHABLE_KEY,
      'Authorization': 'Bearer ' + accessToken,
      ...(options.body ? {'Content-Type': 'application/json'} : {}),
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(body.msg || body.message || body.error_description || body.error || 'Não foi possível concluir a solicitação.');
    error.status = res.status;
    throw error;
  }
  return body;
}

async function loadInvite() {
  if (returnedError) {
    inform('Link inválido ou expirado. Solicite um novo convite.', 'error');
    return;
  }
  if (!accessToken || !['invite', 'recovery', 'signup'].includes(authType)) {
    inform('Abra o link de convite recebido por e-mail. Se já utilizou o convite, solicite outro para concluir o cadastro.', 'error');
    return;
  }
  if (authType !== 'invite') {
    inform('O link confirma o seu e-mail, mas não é um convite de ativação. Entre em contato com o administrador do Astraryx Idle para concluir o cadastro.', 'error');
    return;
  }
  try {
    const user = await send('/auth/v1/user', {method:'GET'});
    if (!user.id || !user.email) throw new Error('Não foi possível validar a conta.');
    userId = user.id;
    form.hidden = false;
    message.hidden = true;
  } catch(err) {
    inform('Este convite não pôde ser validado. Ele pode ter expirado. Solicite um novo convite.', 'error');
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!userId) return;
  const nickname = nicknameField.value.trim();
  const pw = passwordField.value;
  const confirm = confirmField.value;
  if (Array.from(nickname).length < 3 || Array.from(nickname).length > 20) {
    inform('O apelido precisa ter entre 3 e 20 caracteres.', 'error'); return;
  }
  if (pw.length < 10 && !passwordSaved) { inform('A senha precisa ter ao menos 10 caracteres.', 'error'); return; }
  if (!passwordSaved && pw !== confirm) { inform('As senhas não são iguais.', 'error'); return; }
  submit.disabled = true;
  try {
    if (!passwordSaved) {
      await send('/auth/v1/user', {method:'PUT',body:JSON.stringify({password:pw})});
      passwordSaved = true;
      passwordField.value = '';
      confirmField.value = '';
      passwordField.disabled = true;
      confirmField.disabled = true;
    }
    await send('/rest/v1/player_profiles', {
      method:'POST',
      headers:{'Prefer':'return=minimal'},
      body:JSON.stringify({user_id:userId,nickname}),
    });
    form.hidden = true;
    message.hidden = true;
    success.hidden = false;
  } catch(err) {
    if (err.status === 409) inform('Esse apelido já está em uso. Escolha outro e tente novamente.', 'error');
    else if (passwordSaved) inform('Senha salva, mas o apelido ainda não foi registrado. Verifique sua conexão e tente novamente.', 'error');
    else inform('Não foi possível ativar a conta. Verifique sua conexão e tente novamente.', 'error');
  } finally {
    submit.disabled = false;
  }
});

loadInvite();