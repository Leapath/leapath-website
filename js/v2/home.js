/* Homepage-only behavior — parallax effect on the photo hero. */

/* ── Hero parallax ── */
(function(){
  var hero = document.querySelector('.hero');
  if(!hero) return;
  var ticking = false;
  function onScroll(){
    if(!ticking){
      requestAnimationFrame(function(){
        var y = window.scrollY;
        /* background moves at 35% of scroll speed — creates depth */
        hero.style.backgroundPositionY = 'calc(0px + ' + (y * 0.25) + 'px)';
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
})();
