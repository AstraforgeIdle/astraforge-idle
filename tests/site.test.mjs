import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const home = read('index.html');
const history = read('updates/index.html');

test('homepage keeps one download, all five worlds and twelve heroes', () => {
  assert.equal((home.match(/id="download"/g) || []).length, 1);
  assert.equal((home.match(/class="world-card"/g) || []).length, 5);
  assert.equal((home.match(/data-hero-category="/g) || []).length, 12);
  assert.equal((home.match(/data-gallery-type="/g) || []).length, 8);
  for (const id of ['inicio','download','mundos','personagens','sistemas','galeria','atualizacoes','comunidade'])
    assert.ok(home.includes('id="' + id + '"'), 'Missing section: ' + id);
});

test('visitor can reach APK early without losing release validation', () => {
  assert.ok(home.indexOf('id="download"') < home.indexOf('id="mundos"'));
  for (const hook of ['data-release-version','data-release-status','data-release-download','data-release-notes','data-release-action','data-release-size'])
    assert.ok(home.includes(hook), 'Missing release hook: ' + hook);
  assert.match(home,/releases\.js|app\.js/);
  assert.match(read('config.js'),/previewVersion: '0\.7\.4'/);
  assert.match(read('releases.js'),/selectPublicApkRelease/);
});

test('v0.7.4 has a visible and accessible notes highlight next to the APK', () => {
  assert.ok(home.includes('class="release-notes-feature"'));
  assert.ok(home.includes('aria-labelledby="release-notes-feature-title"'));
  assert.ok(home.includes('href="updates/v0.7.4/index.html">Explorar todas as novidades'));
  assert.ok(home.includes('Vaelor e Ceryndra'));
  const css = read('assets/css/site-v3.css');
  assert.ok(css.includes('.release-notes-feature {'));
  assert.ok(css.includes('@media (max-width:510px)'));
});

test('Morvann is included with the canonical public sprite and support text', () => {
  assert.match(home,/updates\/v0\.7\.0\/assets\/characters\/hero-morvann\.webp/);
  assert.match(home,/App não instalado/);
  assert.ok(existsSync(resolve(root,'updates/v0.7.0/assets/characters/hero-morvann.webp')));
});

test('v0.7.4 heroes have portrait assets, skill lists, and detail links', () => {
  for (const [name,anchor] of [['Vaelor','vaelor'],['Ceryndra','ceryndra']]) {
    assert.ok(home.includes('<h3>'+name+'</h3>'));
    assert.ok(home.includes('updates/v0.7.4/index.html#'+anchor));
    assert.ok(existsSync(resolve(root, 'assets/characters/hero_'+name.toLowerCase()+'.png')));
  }
  assert.ok(home.includes('12 heróis'));
});

test('progressive enhancement includes hero filters, gallery filters and searchable notes', () => {
  for(const key of ['data-hero-filter','data-gallery-filter']) assert.ok(home.includes(key));
  assert.ok(history.includes('data-update-search'));
  const js=read('app.js');
  assert.ok(js.includes('mountCardFilter'));
  assert.ok(js.includes('updateSearch.addEventListener'));
  assert.ok(read('assets/css/site-v3.css').includes('.character[hidden]'));
});

test('homepage and historical index have no missing local href/src references', () => {
  for (const page of ['index.html','updates/index.html']) {
    const content=read(page);
    const links=[...content.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
    for (const href of links) {
      if (/^(?:#|https?:|mailto:|data:|javascript:)/i.test(href)) continue;
      const target=href.split(/[?#]/)[0]; if(!target) continue;
      const absolute=resolve(root,dirname(page),decodeURIComponent(target));
      assert.ok(absolute.startsWith(root), 'URL leaves repository: '+href);
      assert.ok(existsSync(absolute), 'Missing '+href+' in '+page);
    }
  }
});

test('public editorial update metadata is current, unique, and has notes pages', () => {
  const content=JSON.parse(read('data/updates.json'));
  const paths=new Set();
  for(const update of content.updates){
    assert.ok(!paths.has(update.path), 'Duplicate update '+update.path);
    paths.add(update.path);
    assert.ok(existsSync(resolve(root,update.path)), 'Missing notes '+update.path);
  }
  assert.equal(content.updates[0].slug,'v0.7.4');
  const currentNotes = read('updates/v0.7.4/index.html');
  for (const marker of ['Vaelor','Ceryndra','Investida de Estilhaços','Conquistas'])
    assert.ok(currentNotes.includes(marker), 'Missing v0.7.4 notes section: ' + marker);
  assert.ok(currentNotes.includes('data:image/'), 'Screenshots were not preserved');
  const game = JSON.parse(read('data/game.json'));
  assert.equal(game.version,'0.7.4');
  assert.equal(game.heroes.length,12);
  assert.equal(game.worlds.length,5);
  assert.ok(game.heroes.some(hero => hero.name === 'Morvann'));
  for (const name of ['Vaelor','Ceryndra']) assert.ok(game.heroes.some(hero => hero.name === name));
  assert.ok(game.worlds.some(world => world.name === 'Abismo da Corrupção'));
});
