import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const home=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const auth=readFileSync(new URL('../auth/index.html',import.meta.url),'utf8');
const script=readFileSync(new URL('../auth/auth.js',import.meta.url),'utf8');
test('invite URL hash is routed from the homepage before site scripts',()=>{
  assert.ok(home.indexOf('location.replace(\'/auth/\'') < home.indexOf('src="app.js'), 'early invite redirect');
  assert.match(home,/params\.has\('access_token'\)/);
  assert.match(home,/params\.has\('refresh_token'\)/);
});
test('auth page is not indexed and processes token only on the client',()=>{
  assert.match(auth,/noindex,nofollow/);
  assert.match(auth,/id="activation-form"/);
  assert.match(script,/history\.replaceState\(null, '', '\/auth\/'\)/);
  assert.match(script,/\/auth\/v1\/user/);
  assert.match(script,/\/rest\/v1\/player_profiles/);
  assert.doesNotMatch(script,/service_role|sb_secret_|xsmtpsib-/i);
});
