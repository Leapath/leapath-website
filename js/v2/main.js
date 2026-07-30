/* Shared site behavior — mega-menu hover/click and mobile nav toggle.
   Loaded on every page. */

(function(){
  var items = document.querySelectorAll('.nav__item');
  function setExpanded(item, expanded){
    var btn = item.querySelector('.nav__btn');
    if(btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }
  items.forEach(function(item){
    var mega = item.querySelector('.mega');
    if(!mega) return;
    var btn = item.querySelector('.nav__btn');
    if(btn){ btn.setAttribute('aria-haspopup', 'true'); btn.setAttribute('aria-expanded', 'false'); }
    var timer;
    function open(){
      clearTimeout(timer);
      items.forEach(function(i){ if(i!==item){ i.classList.remove('is-open'); setExpanded(i, false); } });
      item.classList.add('is-open');
      setExpanded(item, true);
    }
    function close(){
      timer = setTimeout(function(){ item.classList.remove('is-open'); setExpanded(item, false); }, 250);
    }
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    mega.addEventListener('mouseenter', function(){ clearTimeout(timer); });
    mega.addEventListener('mouseleave', close);
    item.querySelector('.nav__btn').addEventListener('click', function(e){
      e.preventDefault();
      if(item.classList.contains('is-open')){ item.classList.remove('is-open'); setExpanded(item, false); }
      else { open(); }
    });
  });
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav__item')){ items.forEach(function(i){ i.classList.remove('is-open'); setExpanded(i, false); }); }
  });

  var hamburger = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('navMobile');
  if(hamburger && mobileMenu){
    hamburger.addEventListener('click', function(){
      hamburger.classList.toggle('is-active');
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('nav-open-lock');
    });
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        hamburger.classList.remove('is-active');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('nav-open-lock');
      });
    });
  }

  /* Scroll-reveal: fade+rise cards into view once. Headings are deliberately excluded
     so primary content is never hidden pending JS (no-JS / crawler / perf safety). */
  var revealSelector = '.feat-card,.bc,.job-card,.ben-card,.rcard,.stu-card,.team-card,'
    + '.val-card,.cs-card,.timeline .tl-item,.ci-card,.acc-item,.ic,.rvm,.cologo';
  var revealEls = document.querySelectorAll(revealSelector);
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(revealEls.length && 'IntersectionObserver' in window && !reduceMotion){
    revealEls.forEach(function(el){
      el.classList.add('reveal');
      var parent = el.parentElement;
      var siblingIndex = Array.prototype.indexOf.call(parent.children, el) % 6;
      el.style.setProperty('--reveal-delay', (siblingIndex * 70) + 'ms');
    });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('reveal--in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  }
})();

