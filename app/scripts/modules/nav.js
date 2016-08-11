var navCtrl = function($) {

  var modules = require('./modules');
  var MD = modules.mq.MD;
  var checkMQ = modules.checkMQ;

  var $body = $('body');
  var $header = $('.gnav');
  var $icon = $('.sp-nav-icon');

  var menu = {
    sp: {
      // sp menu slide animation
      slide: function(isActive) {
        TweenMax.to($header, 1, {
          x: (isActive) ? '0' : '-100px',
          autoAlpha: (isActive) ? '1' : '0',
          ease: Expo.easeOut
        });
      },
      // sp menu toggle & change hamberger icon
      toggleMenu: function() {
        var isActive = (checkMQ(MD)) ? true : $icon.hasClass('is-active');
        if (isActive) {
          // close
          $icon.removeClass('is-active');
          $body.removeClass('modal-open');
          menu.sp.slide(false);
        } else {
          // open
          $icon.addClass('is-active');
          $body.addClass('modal-open');
          menu.sp.slide(true);
        }
      },
    },
    init: function() {
      TweenMax.killTweensOf($header);
      $header.removeAttr('style');
      $body.removeClass('modal-open');
      if (!checkMQ(MD)) {
        $icon.removeClass('is-active');
        menu.sp.slide(false);
      }
    }
  };
  $(document).on('click', '.sp-nav-icon', menu.sp.toggleMenu);
  $(window).on('load', menu.init);
  window.matchMedia(MD).addListener(menu.init);
};
module.exports = (navCtrl)(jQuery);
