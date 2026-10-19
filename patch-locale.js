import { getLanguage, setLanguage, translateSubtree, translate as translateBase } from './i18n.js';
import { patchTranslations } from './patch-translations.js';
const pathname = location.pathname;
const version = (pathname.match(/\/updates\/(v[0-9.]+)\//) || [])[1] || '';
const dictionary = { ...(patchTranslations.common || {}), ...(patchTranslations[version] || {}) };
const originalNodes = new WeakMap();
const originalAttrs = new WeakMap();
const replaceText = (text, lang) => lang === 'en' ? (dictionary[text] ?? translateBase(text,'en')) : text;
function syncPatchLanguage(){
 const lang = getLanguage(), english = lang === 'en';
 const root = document.body;
 const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[];
 while(walker.nextNode()){const n=walker.currentNode;if(n.parentElement && !n.parentElement.closest('script,style,template,svg,noscript'))nodes.push(n);}
 for(const node of nodes){
   if(!originalNodes.has(node)) originalNodes.set(node,node.nodeValue);
   const source = originalNodes.get(node);
   const trim = source.trim();
   if(trim)node.nodeValue=source.replace(trim,replaceText(trim,lang));
 }
 for(const element of root.querySelectorAll('[alt],[title],[aria-label],[placeholder],[data-title]')){
   let attrs=originalAttrs.get(element);
   if(!attrs){attrs={};originalAttrs.set(element,attrs);}
   for(const attr of ['alt','title','aria-label','placeholder','data-title']){
      if(!(attr in attrs) && element.hasAttribute(attr)) attrs[attr]=element.getAttribute(attr);
      if(attr in attrs) element.setAttribute(attr,replaceText(attrs[attr],lang));
   }
 }
 document.documentElement.lang = english ? 'en' : 'pt-BR';
 const baseTitle=document.documentElement.dataset.originalPatchTitle || document.title;
 document.documentElement.dataset.originalPatchTitle = baseTitle;
 document.title=replaceText(baseTitle,lang);
 for(const button of document.querySelectorAll('.patch-locale-bar [data-site-lang]')){
   const active=button.dataset.siteLang === lang;
   button.setAttribute('aria-pressed',String(active));
   button.classList.toggle('active',active);
 }
 for(const bar of document.querySelectorAll('.patch-locale-bar [data-language-picker]'))
   bar.setAttribute('aria-label',english?'Website language':'Idioma do site');
}
document.querySelectorAll('.patch-locale-bar [data-site-lang]').forEach(button=>{
 button.addEventListener('click',()=>setLanguage(button.dataset.siteLang));
});
document.addEventListener('astraforge:languagechange',syncPatchLanguage);
syncPatchLanguage();
