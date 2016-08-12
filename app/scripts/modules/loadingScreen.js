/**
 * fakeloader overlay animation
 */

var loading = function($) {

  var $overlay    = $('.loading');
  var $icon       = $('.loading-center-absolute');
  var $hrefTarget = $('a:not([href*="#"],[href*="tel:"],[href*="javascript:"],[target],[data-mfp])');
  var fade        = {

    // fade aniamtion
    animate: function(flag, callback) {
      var mode = (flag === 'out') ? true : (flag === 'in') ? false : false;
      var tl = new TimelineMax();
      tl.to($icon, (mode) ? 1 : 0.5, { opacity: (mode) ? 1 : 0 }, 0)
        .to($overlay, (mode) ? 1 : 0.5, { autoAlpha: (mode) ? 1 : 0, onComplete: callback }, 0.5);
    },

    // page in
    inPage: function() {
      fade.animate('in', null);
    },

    // page out
    outPage: function(e) {
      var attr = $(this).attr('href');
      var host = new RegExp('^(#|\/|(https?:\/\/' + location.hostname + '))');
      if (attr) {
        e.preventDefault();
        if (!this.href.match(host)) {
          window.open(attr);
        } else {
          fade.animate('out', function() {
            location.href = attr;
          });
        }
      }
    },

    init: function() {
      if ($overlay.length) {
        // page back event
        window.onpageshow = function(evt) {
          if (evt.persisted) {
            location.reload();
          }
        };
        // page in event
        $(window).on('load', fade.inPage);
        // page out event
        // $(document).on('click', $hrefTarget, fade.outPage);
      }
    }

  };

  // start event
  fade.init();

};
module.exports = (loading)(jQuery);
