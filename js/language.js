(function(){
  'use strict';
  var COOKIE='chimm_language';
  var DAYS=180;
  function getCookie(){
    var m=document.cookie.match(new RegExp('(?:^|; )'+COOKIE+'=([^;]*)'));
    return m?decodeURIComponent(m[1]):'';
  }
  function setCookie(v){
    document.cookie=COOKIE+'='+encodeURIComponent(v)+'; Max-Age='+(DAYS*86400)+'; Path=/; SameSite=Lax';
  }
  function isKannada(){ return location.pathname.indexOf('/kn/')!==-1; }
  function counterpart(){
    var p=location.pathname;
    var marker='/kn/';
    if(p.indexOf(marker)!==-1){
      return p.replace(marker,'/');
    }
    var slash=p.lastIndexOf('/');
    var dir=p.slice(0,slash+1);
    var file=p.slice(slash+1)||'index.html';
    return dir+'kn/'+(file==='index.html'||file===''?'index.html':file);
  }
  function addSwitcher(){
    var host=document.querySelector('.header-ctas') || document.querySelector('.header-inner');
    if(!host || host.querySelector('.language-switcher')) return;
    var a=document.createElement('a');
    a.className='language-switcher btn btn-ghost btn-sm';
    a.href=counterpart();
    a.textContent=isKannada()?'English':'ಕನ್ನಡ';
    a.setAttribute('lang',isKannada()?'en':'kn');
    a.addEventListener('click',function(e){ e.preventDefault(); setCookie(isKannada()?'en':'kn'); location.href=counterpart(); });
    host.insertBefore(a,host.firstChild);
    var mobileList=document.querySelector('.mobile-menu ul');
    if(mobileList && !mobileList.querySelector('.mobile-language-link')){
      var li=document.createElement('li');
      li.className='mobile-language-link';
      var ma=document.createElement('a');
      ma.href=counterpart(); ma.textContent=isKannada()?'English':'ಕನ್ನಡ'; ma.setAttribute('lang',isKannada()?'en':'kn');
      ma.addEventListener('click',function(e){e.preventDefault();setCookie(isKannada()?'en':'kn');location.href=counterpart();});
      li.appendChild(ma); mobileList.appendChild(li);
    }
  }
  function popup(){
    if(getCookie()) return;
    var wrap=document.createElement('div');
    wrap.className='language-modal';
    wrap.setAttribute('role','dialog'); wrap.setAttribute('aria-modal','true');
    wrap.innerHTML='<div class="language-modal-card">'+
      '<span class="language-modal-kicker">ಕೊಡಗಿನ ಆತಿಥ್ಯ</span>'+
      '<h2>ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಬೇಕೇ?</h2>'+
      '<p>ಈ ತಾಣವನ್ನು ಕನ್ನಡದ ಸೊಗಸಾದ ಪದಗಳಲ್ಲಿ ರೂಪಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಪ್ರಯಾಣದ ಕಥೆಯನ್ನು ಕನ್ನಡದಲ್ಲೇ ಆರಂಭಿಸಿ.</p>'+
      '<div class="language-modal-actions">'+
      '<button class="btn btn-primary" data-lang-kn>ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಿರಿ</button>'+
      '<button class="btn btn-outline dark" data-lang-en>English version</button>'+
      '</div></div>';
    document.body.appendChild(wrap);
    wrap.querySelector('[data-lang-kn]').addEventListener('click',function(){setCookie('kn');wrap.remove();});
    wrap.querySelector('[data-lang-en]').addEventListener('click',function(){setCookie('en');location.href=counterpart();});
  }
  function route(){
    var pref=getCookie();
    if(!pref){ if(!isKannada()) location.replace(counterpart()); return; }
    if(pref==='kn' && !isKannada()){ location.replace(counterpart()); return; }
    if(pref==='en' && isKannada()){ location.replace(counterpart()); return; }
  }
  route();
  document.addEventListener('DOMContentLoaded',function(){
    addSwitcher();
    if(isKannada() && !getCookie()) popup();
  });
  window.ChimmsLanguage={set:function(v){setCookie(v);}};
})();
