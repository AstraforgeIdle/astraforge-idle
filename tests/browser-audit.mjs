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
    if(width<=920) {
      check(await navButton.isVisible(),width+' requires responsive menu');
      await navButton.click();
      check(await page.locator('#site-nav a[href="#mundos"]').isVisible(),width+' cannot open nav');
      check((await navButton.getAttribute('aria-expanded'))==='true',width+' aria-expanded not opened');
      await page.locator('#site-nav a[href="#mundos"]').click();
      check((await navButton.getAttribute('aria-expanded'))==='false',width+' nav not closed');
    } else {
      check(await page.locator('#site-nav .nav-download').isVisible(),width+' desktop nav missing');
    }
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
    await page.locator('#update-search').fill('Morvann');
    check((await page.locator('.update-card:visible').count())>=1,width+' update search missing Morvann');
    await page.locator('#update-search').fill('xxnenhuma-entrada-do-astroxx');
    check((await page.locator('.update-card:visible').count())===0,width+' update search expected zero');
    const updateWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    check(updateWidth<=width+2,width+' updates page horizontal overflow '+updateWidth);
    console.log('PASS',width,'homepage + filters + dialog + search + downloads');
    await page.close();
  }
  assert.deepEqual(errors,[], 'Uncaught browser errors');
  console.log('BROWSER AUDIT PASSED: 6 screen widths');
} finally {
  await browser?.close();
  await new Promise(resolve=>server.close(resolve));
}
