/* Shared local translation engine for Astraforge Idle archival release notes. */
export function mountPatchLanguage(english) {
  const storageKey='astraforge_site_language_v1';
  const originalText=new WeakMap();
  const originalAttributes=new WeakMap();
  let language='pt-BR';
  try { language=localStorage.getItem(storageKey)==='en'?'en':'pt-BR'; } catch {}
  const translate=(value)=>{
    if(language!=='en')return value;
    return english[value] ?? value.replace(/(\\d+ \\/ \\d+ · )Use as setas para navegar/, '$1Use the arrows to navigate');
  };
  const title=document.title;
  const meta=[...document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[property="og:locale"]')];
  const metadata=meta.map(el=>({element:el,value:el.content}));
  function apply(){
    document.documentElement.lang=language==='en'?'en':'pt-BR';
    const targetTitle=translate(title);
    if(document.title!==targetTitle)document.title=targetTitle;
    for(const {element,value} of metadata){
      const translated=element.getAttribute('property')==='og:locale'
        ? (language==='en'?'en_US':'pt_BR') : translate(value);
      if(element.content!==translated)element.content=translated;
    }
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(walker.nextNode()){
      const node=walker.currentNode;
      if(!node.parentElement||node.parentElement.closest('script,style,noscript,template,svg'))continue;
      if(!originalText.has(node))originalText.set(node,node.nodeValue);
      const source=originalText.get(node),trimmed=source.trim();
      if(!trimmed)continue;
      const desired=source.replace(trimmed,translate(trimmed));
      if(node.nodeValue!==desired)node.nodeValue=desired;
    }
    for(const element of document.querySelectorAll('[alt],[title],[aria-label],[placeholder],[data-title]')){
      let attrs=originalAttributes.get(element);
      if(!attrs){attrs={};originalAttributes.set(element,attrs);}
      for(const name of ['alt','title','aria-label','placeholder','data-title']){
        if(!(name in attrs)&&element.hasAttribute(name))attrs[name]=element.getAttribute(name);
        if(name in attrs){
          const desired=translate(attrs[name]);
          if(element.getAttribute(name)!==desired)element.setAttribute(name,desired);
        }
      }
    }
    for(const button of document.querySelectorAll('.patch-language-picker button')){
      const active=button.dataset.siteLang===language;
      if(button.getAttribute('aria-pressed')!==String(active))button.setAttribute('aria-pressed',String(active));
    }
    const group=document.querySelector('.patch-language-picker');
    if(group)group.setAttribute('aria-label',language==='en'?'Website language':'Idioma do site');
  }
  for(const button of document.querySelectorAll('.patch-language-picker button')){
    button.addEventListener('click',()=>{
      language=button.dataset.siteLang==='en'?'en':'pt-BR';
      try {localStorage.setItem(storageKey,language);}catch{}
      apply();
    });
  }
  let pending=false;
  const dynamic=document.querySelector('#lightbox');
  if(dynamic){
    new MutationObserver(()=>{
      if(pending)return;
      pending=true;
      queueMicrotask(()=>{pending=false;apply();});
    }).observe(dynamic,{subtree:true,characterData:true,childList:true});
  }
  window.astraforgePatchT=translate;
  apply();
}
