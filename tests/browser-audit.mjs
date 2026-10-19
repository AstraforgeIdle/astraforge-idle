// Browser audit: desktop, tablets and phones with authentic local assets.
// Run after: npm install --no-save playwright && npx playwright install chromium
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, mkdirSync } from 'node:fs';
import { resolve, extname, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8',
  '.webp':'image/webp', '.png':'image/png', '.svg':'image/svg+xml', '.jpg':'image/jpeg' };
const server = createServer((req,res) => {
  let path;
  try {
    const url = new URL(req.url, 'http://localhost');
    path = resolve(root, decodeURIComponent(url.pathname).replace(/^\/+/, ''));
    if (path !== root && !path.startsWith(root + sep)) throw Error('Unsafe URL');
    if (url.pathname.endsWith('/')) path=resolve(path, 'index.html');
    const body = readFileSync(path);
    res.writeHead(200, {'content-type': mime[extname(path)] || 'application/octet-stream'});
    res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = 'http://127.0.0.1:' + server.address().port + '/';
const release = {
  tag_name:'v0.7.2',name:'Astraforge Idle v0.7.2',draft:false,prerelease:true,
  published_at:'2026-10-17T19:54:34Z',
  html_url:'https://github.com/AstraforgeIdle/astraforge-idle/releases/tag/v0.7.2',
  assets:[{name:'Astraforge-Idle-v0.7.2.apk',size:868380318,state:'uploaded',
    browser_download_url:'https://github.com/AstraforgeIdle/astraforge-idle/releases/download/v0.7.2/Astraforge-Idle-v0.7.2.apk'}]
};
const screenshots = resolve(root, 'site-audit');
mkdirSync(screenshots,{recursive:true});
let browser,errors=[];
const check = (predicate,message) => {if(!predicate)throw Error(message);};
try {
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  for(const width of [360,390,768,920,1024,1440]) {
    const page=await browser.newPage({ viewport:{width,height:900}, deviceScaleFactor:1, reducedMotion:'reduce' });
    // Baseline UX checks run with a saved refusal to keep consent unobtrusive.
    await page.addInitScript(() => localStorage.setItem('astra_forge_analytics_consent_v1','declined'));
    page.on('pageerror',e=>errors.push(width+': '+e.message));
    await page.route(/https:\/\/api\.github\.com\/repos\/AstraforgeIdle\/astraforge-idle\/releases/, route =>
      route.fulfill({status:200,contentType:'application/json',body:JSON.stringify([release])}));
    await page.goto(base,{waitUntil:'networkidle',timeout:30000});
    await page.locator('[data-release-download]:visible').waitFor({timeout:15000});
    check((await page.locator('[data-release-version]').innerText()).includes('v0.7.2'),width+' release text');
    const layout=await page.evaluate(() => {
      const out=[...document.querySelectorAll('body *')]
        .filter(el => {const r=el.getBoundingClientRect(), style=getComputedStyle(el);
          return style.position!=='fixed' && style.display!=='none' && r.width>0 &&
            (r.right>innerWidth+2 || r.left< -2);})
        .slice(0,8).map(el=>({tag:el.tagName,className:typeof el.className==='string'?el.className.slice(0,70):'',left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}));
      return {viewport:innerWidth,pageWidth:document.documentElement.scrollWidth,offenders:out};
    });
    console.log('LAYOUT',width,JSON.stringify(layout));
    check(layout.pageWidth <= width+2,width+' has horizontal overflow: '+JSON.stringify(layout));
    const navButton=page.locator('.menu-toggle');
    if(width<=1120) {
      check(await navButton.isVisible(),width+' requires responsive menu');
      await navButton.click();
      check(await page.locator('#site-nav a[href="#mundos"]').isVisible(),width+' cannot open nav');
      check((await navButton.getAttribute('aria-expanded'))==='true',width+' aria-expanded not opened');
      await page.locator('#site-nav a[href="#mundos"]').click();
      check((await navButton.getAttribute('aria-expanded'))==='false',width+' nav not closed');
    } else {
      check(await page.locator('#site-nav .nav-download').isVisible(),width+' desktop nav missing');
    }
    // The picker is HTML, not an asynchronously injected DOM element.
    check((readFileSync(resolve(root, 'index.html'),'utf8').match(/data-site-lang=/g)||[]).length===2,'Language flags must be included in source HTML');
    const languageButtons=page.locator('[data-site-lang]');
    check((await languageButtons.count())===2,width+' language picker missing');
    const apkUrlBefore=await page.locator('[data-release-download]').getAttribute('href');
    await page.locator('[data-site-lang="en"]').click();
    check(await page.evaluate(()=>document.documentElement.lang)==='en',width+' English document language missing');
    check((await page.locator('#site-nav a[href="#mundos"]').innerText())==='Worlds',width+' untranslated nav');
    check((await page.locator('[data-release-download]').innerText()).includes('Download APK'),width+' untranslated download');
    check((await page.locator('[data-release-download]').getAttribute('href'))===apkUrlBefore,width+' changed APK URL after language toggle');
    check(await page.evaluate(()=>localStorage.getItem('astraforge_site_language_v1'))==='en',width+' language not persisted');
    await page.locator('[data-site-lang="pt-BR"]').click();
    check(await page.evaluate(()=>document.documentElement.lang)==='pt-BR',width+' Portuguese restore failed');
    check((await page.locator('#site-nav a[href="#mundos"]').innerText())==='Mundos',width+' original navigation not restored');
    const damage=page.locator('[data-hero-role="dano"]');
    await damage.click();
    check((await page.locator('.character:visible').count())===5,width+' filtered heroes not 5');
    await page.locator('[data-hero-role="todos"]').click();
    check((await page.locator('.character:visible').count())===10,width+' hero total not 10');
    await page.locator('[data-gallery-category="equipamento"]').click();
    check((await page.locator('.gallery [data-gallery]:visible').count())===1,width+' gallery equipment count');
    await page.locator('[data-gallery-category="todos"]').click();
    const firstShot=page.locator('[data-gallery]').first();
    await firstShot.click();
    const dialog=page.locator('dialog.lightbox');
    check(await dialog.isVisible(),width+' lightbox cannot open');
    const before=await dialog.locator('img').getAttribute('src');
    await page.keyboard.press('ArrowRight');
    const after=await dialog.locator('img').getAttribute('src');
    check(before!==after,width+' lightbox next did not change image');
    await page.keyboard.press('Escape');
    check(!(await dialog.isVisible()),width+' lightbox did not close');
    const morvann=page.locator('img[alt^="Morvann"]');
    await morvann.scrollIntoViewIfNeeded();
    await morvann.evaluate(img=>img.decode());
    check(await morvann.evaluate(img=>img.naturalWidth>0),width+' Morvann image missing');
    if(width===390||width===1440) {
      await page.goto(base,{waitUntil:'networkidle'});
      const broken = await page.evaluate(async () => {
        const imgs = [...document.images].filter(img => img.hasAttribute('src') && img.getAttribute('src').trim());
        for(const img of imgs) img.loading='eager';
        await Promise.all(imgs.map(img => img.decode().catch(() => {})));
        return imgs.filter(img => !img.naturalWidth).map(img => img.currentSrc || img.src);
      });
      check(!broken.length,width+' has broken visual assets: '+broken.join(', '));
      await page.screenshot({path:resolve(screenshots,'home-'+width+'.png'),fullPage:true,animations:'disabled'});
    }
    await page.goto(base+'updates/',{waitUntil:'networkidle'});
    check((await page.locator('[data-site-lang]').count())===2,width+' updates picker missing');
    await page.locator('#update-search').fill('Morvann');
    check((await page.locator('.update-card:visible').count())>=1,width+' update search missing Morvann');
    await page.locator('#update-search').fill('xxnenhuma-entrada-do-astroxx');
    check((await page.locator('.update-card:visible').count())===0,width+' update search expected zero');
    const updateWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    check(updateWidth<=width+2,width+' updates page horizontal overflow '+updateWidth);
    console.log('PASS',width,'homepage + filters + dialog + search + downloads');
    await page.close();
  }

  // v0.7.4 patch notes: source artwork, English, Portuguese and persisted language.
  const patchPage=await browser.newPage({viewport:{width:390,height:844}});
  const patchErrors=[];
  patchPage.on('pageerror',error=>patchErrors.push(error.message));
  await patchPage.addInitScript(()=>localStorage.setItem('astraforge_site_language_v1','en'));
  await patchPage.goto(base+'updates/v0.7.4/',{waitUntil:'load',timeout:30000});
  await patchPage.locator('.patch-language-picker button[data-site-lang="en"]').waitFor();
  check((await patchPage.locator('.patch-language-picker button').count())===2,'v0.7.4 missing flags');
  check(await patchPage.evaluate(()=>document.documentElement.lang==='en'),'v0.7.4 did not load English preference');
  check(await patchPage.evaluate(()=>document.body.innerText.includes('Two forces.')),'v0.7.4 English translation missing');
  check((await patchPage.locator('img[src^="data:image"]').count())>=20,'v0.7.4 original illustrations missing');
  await patchPage.locator('[data-site-lang="pt-BR"]').click();
  check(await patchPage.evaluate(()=>document.documentElement.lang==='pt-BR'),'v0.7.4 Portuguese selection failed');
  check(await patchPage.evaluate(()=>document.body.innerText.includes('Duas forças.')),'v0.7.4 Portuguese source text not restored');
  await patchPage.locator('[data-site-lang="en"]').click();
  check(await patchPage.evaluate(()=>document.body.innerText.includes('Two forces.')),'v0.7.4 English re-selection failed');
  check(await patchPage.evaluate(()=>localStorage.getItem('astraforge_site_language_v1')==='en'),'v0.7.4 locale preference not saved');
  check(patchErrors.length===0,'v0.7.4 javascript errors: '+patchErrors.join('; '));
  console.log('PASS PATCH v0.7.4: flags, PT/EN, artwork and persisted preference');
  await patchPage.close();

  // Consent-enabled preview uses a test measurement ID without contacting Google.
  const analyticsPage=await browser.newPage({viewport:{width:390,height:900}});
  let googleLoads=0;
  await analyticsPage.route('https://www.googletagmanager.com/gtag/js**', route => {
    googleLoads++;
    return route.fulfill({status:200,contentType:'text/javascript',body:'/* mock Google tag */'});
  });
  await analyticsPage.route(/https:\/\/api\.github\.com\/repos\/AstraforgeIdle\/astraforge-idle\/releases/, route =>
    route.fulfill({status:200,contentType:'application/json',body:JSON.stringify([release])}));
  await analyticsPage.goto(base,{waitUntil:'networkidle'});
  check(await analyticsPage.locator('.analytics-consent').isVisible(),'Consent banner missing');
  check(googleLoads===0,'Google tag requested before consent');
  await analyticsPage.locator('[data-analytics-decline]').click();
  check(googleLoads===0,'Google tag requested after decline');
  await analyticsPage.reload({waitUntil:'networkidle'});
  check((await analyticsPage.locator('.analytics-consent').count())===0,'Refusal not persisted');
  check(googleLoads===0,'Google tag requested despite saved refusal');
  await analyticsPage.goto(base+'privacidade.html',{waitUntil:'networkidle'});
  check((await analyticsPage.locator('[data-site-lang]').count())===2,'Privacy language picker missing');
  await analyticsPage.locator('[data-privacy-settings]').click();
  await analyticsPage.locator('[data-analytics-accept]').click();
  check(googleLoads===1,'Google tag not loaded exactly once on acceptance');
  check(await analyticsPage.evaluate(() => window.dataLayer.some(
    entry => entry[0] === 'config' && entry[1] === 'G-SZHF2LMYG0'
  )), 'The published Google measurement ID is not being configured');
  await analyticsPage.goto(base,{waitUntil:'networkidle'});
  await analyticsPage.locator('[data-release-download]:visible').waitFor();
  check(googleLoads===2,'Google tag not loaded for consenting returning visitor');
  await analyticsPage.locator('.hero-copy a[data-track-event="download_cta_click"]').click();
  await analyticsPage.evaluate(() => document.querySelector('[data-release-download]')
    .addEventListener('click', event => event.preventDefault(), {capture:true}));
  await analyticsPage.locator('[data-release-download]').click();
  const events=await analyticsPage.evaluate(() => window.dataLayer
    .filter(args => args[0]==='event').map(args => ({name:args[1],params:args[2]})));
  check(events.some(event=>event.name==='download_cta_click'),'Missing CTA event');
  check(events.some(event=>event.name==='apk_download_click' && event.params.release_version==='v0.7.2'),
    'Missing validated APK click event');
  check(await analyticsPage.locator('[data-latest-release-highlight]').isVisible(),
    'Latest release should be highlighted automatically');
  await analyticsPage.goto(base+'updates/v0.7.2/',{waitUntil:'networkidle'});
  check(googleLoads===3,'A standalone patch notes page did not load Google tag after consent');
  check(await analyticsPage.evaluate(() => window.dataLayer.some(
    entry => entry[0] === 'config' && entry[1] === 'G-SZHF2LMYG0'
  )), 'Patch notes did not configure the correct GA4 measurement ID');
  console.log('PASS CONSENT: no Google calls before consent, rejection persists, CTA and APK events work');
  await analyticsPage.close();

  assert.deepEqual(errors,[], 'Uncaught browser errors');
  console.log('BROWSER AUDIT PASSED: 6 screen widths');
} finally {
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
