/**
 * Smooth scroll
 */

var smooothScroll = (function($) {

  var $scrollBody = $('body,html');
  var count = 0;

  var scroll = {

    animate: function($target) {
      var targetOffset = $target.offset().top;
      var option = {
        offset: targetOffset,
        duration: 1600,
        easing: 'easeOutQuart',
        mobileHA: true
      };
      $scrollBody.velocity('stop').velocity('scroll', option);

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
        $scrollBody.velocity('stop');
        count = 0;
      } else {
        count++;
      }
    }

  };

  // run
  $(document)
    .on('click', '.go-top a', scroll.pageTop)
    .on('click', 'a[href*="#"]:not(.nolink)', scroll.hashCheck)
    .on('mousewheel DOMMouseScroll', scroll.cancel);

})(jQuery);
module.exports = smooothScroll;
