import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { validMeasurementId, trackEvent, CONSENT_KEY } from '../analytics.js';
import { siteConfig } from '../config.js';

const root=resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file=p=>readFileSync(resolve(root,p),'utf8');

test('GA4 requires an explicit public measurement ID',()=>{
  assert.equal(siteConfig.ga4MeasurementId,'G-SZHF2LMYG0');
  assert.equal(validMeasurementId(siteConfig.ga4MeasurementId),true);
  assert.equal(validMeasurementId(''),false);
  assert.equal(validMeasurementId('G-XXXXXXXXXX'),true);
  assert.equal(validMeasurementId('G-TEST123456'),true);
  for(const id of ['UA-123-1','G-X','G-VALID ID','http://example.com','G-BAD_SCRIPT!']) assert.equal(validMeasurementId(id),false,id);
  assert.equal(trackEvent('apk_download_click',{release_version:'v0.7.2'}),false);
  assert.equal(typeof CONSENT_KEY,'string');
});

test('site does not embed Google Tag Manager or GA4 remote scripts before consent',()=>{
  const html=file('index.html'),notes=file('updates/index.html');
  for(const page of [html,notes]){
    assert.doesNotMatch(page,/googletagmanager\.com\/gtag\/js/);
    assert.doesNotMatch(page,/google-analytics\.com\/collect/);
  }
  const js=file('analytics.js');
  assert.match(js,/data-analytics-accept/);
  assert.match(js,/analytics_storage: 'denied'/);
  assert.match(js,/analytics_storage: 'granted'/);
  assert.match(js,/ga-disable-/);
});

test('site exposes clean consent, current release and download funnel hooks',()=>{
  assert.match(file('index.html'),/data-latest-release-highlight/);
  assert.match(file('index.html'),/data-track-event="download_cta_click"/);
  assert.match(file('releases.js'),/apk_download_click/);
  assert.match(file('releases.js'),/data-release-tag/);
  assert.match(file('privacidade.html'),/data-privacy-settings/);
  assert.match(file('index.html'),/privacidade\.html/);
});

test('SEO sitemap matches existing pages and its URLs are canonical',()=>{
  const xml=file('sitemap.xml'), urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  assert.ok(urls.length>=12);
  for(const url of urls){
    const u=new URL(url);
    assert.equal(u.origin,'https://astraforgeidle.github.io');
    assert.ok(u.pathname.startsWith('/astraforge-idle/'));
    let path=u.pathname.slice('/astraforge-idle/'.length);
    if(!path || path.endsWith('/')) path+='index.html';
    assert.ok(file(path).includes('<html'),path+' missing HTML');
  }
  assert.match(file('robots.txt'),/sitemap\.xml/);
});

test('community issue templates include a direct report path',()=>{
  const home=file('index.html');
  assert.match(home,/issues\/new\?template=bug_report\.yml/);
  assert.match(home,/issues\/new\?template=sugestao\.yml/);
  for(const path of ['.github/ISSUE_TEMPLATE/bug_report.yml','.github/ISSUE_TEMPLATE/sugestao.yml']){
    assert.match(file(path),/description:/);
    assert.match(file(path),/validations:/);
  }
});

test('every published update page loads GA4 through the same opt-in consent module',()=>{
  for(const version of ['0.5.2','0.5.3','0.6.0','0.6.1','0.6.2','0.6.3','0.7.0','0.7.1','0.7.2','0.7.3']){
    const path='updates/v'+version+'/index.html';
    const html=file(path);
    assert.match(html,/href="\.\.\/\.\.\/assets\/css\/analytics-consent\.css"/,path+' consent styling missing');
    assert.match(html,/<script type="module" src="\.\.\/\.\.\/(?:privacy|app)\.js">/,path+' opt-in loader missing');
    assert.doesNotMatch(html,/<script[^>]+src="https:\/\/www\.googletagmanager\.com/,path+' should not pre-load GA4');
  }
});
