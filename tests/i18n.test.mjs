import test from 'node:test';
import assert from 'node:assert/strict';
import { getLanguage, translate } from '../i18n.js';

test('Portuguese remains the default language when no preference is stored', () => {
  assert.equal(getLanguage(), 'pt-BR');
});

test('key navigation strings are translated to English', () => {
  assert.equal(translate('Mundos', 'en'), 'Worlds');
  assert.equal(translate('Atualizações', 'en'), 'Updates');
  assert.equal(translate('Baixar APK', 'en'), 'Download APK');
});

test('technical links and unknown labels are unchanged', () => {
  assert.equal(translate('v0.7.3', 'en'), 'v0.7.3');
  assert.equal(translate('Morvann', 'en'), 'Morvann');
});

test('returning to Portuguese preserves the source text', () => {
  assert.equal(translate('Privacidade', 'pt-BR'), 'Privacidade');
});
