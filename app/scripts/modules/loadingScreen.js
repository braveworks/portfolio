/**
 * fakeloader overlay animation
 */

var loading = function($) {

  var $overlay    = $('.loading');
  var $hrefTarget = $('a:not([href*="#"],[href*="tel:"],[href*="javascript:"],[target],[data-mfp])');

  var fade        = {

    // fade aniamtion
    animate: function(flag, callback) {
      var mode = (flag === 'out') ? true : (flag === 'in') ? false : false;
      $overlay.velocity('stop').velocity({
        opacity : (mode) ? '1'     : '0',
        scale   : (mode) ? '1'     : '1.1'
      }, {
        delay   : (mode) ? 0       : 20,
        display : (mode) ? 'block' : 'none',
        duration: (mode) ? 200     : 500,
        mobileHA: true,
        complete: callback
      });
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
        // add page in event
        $(window).on('load', fade.inPage);
        // add page out event
        // $(document).on('click', $hrefTarget, fade.outPage);
      }
    }

  };

  // start event
  fade.init();

};
module.exports = (loading)(jQuery);
