/**
 * Smooth scroll
 */

var smooothScroll = function() {

  var $scrollBody = $('body,html');
  var count = 0;
  var scroll = {

    animate: function($target) {
      var targetOffset = $target.offset().top;
      var tweenOption = {
        scrollTo: {
          y: targetOffset,
          autoKill: true,
          force3D: true
        },
        ease: Power4.easeOut
      };
      TweenMax.to(window, 2, tweenOption);
      return false;
    },

    hashCheck: function(e) {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var $target = $(this.hash);
        if (this.hash.slice(1)) {
          $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
          if ($target.length) {
            e.preventDefault();
            scroll.animate($target);
          }
        }
      }
    },

    pageTop: function() {
      scroll.animate($scrollBody);
    },

    kill: function(e) {
      if (count <= 20) {
        TweenMax.killTweensOf(window);
        count = 0;
      } else {
        count++;
      }
    }

  };

  // add event
  $(document)
    .on('click', '.go-top a', scroll.pageTop)
    .on('click', 'a[href*="#"]:not(.nolink,[data-mfp])', scroll.hashCheck)
    .on('mousewheel DOMMouseScroll', scroll.cancel);

};
module.exports = (smooothScroll)();
