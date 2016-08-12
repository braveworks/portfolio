var navCtrl = function($) {

  var modules = require('./modules');
  var Hammer = require('hammerjs');

  var MD = modules.mq.MD;
  var checkMQ = modules.checkMQ;

  var $body = $('body');
  var $header = $('.gnav');
  var $icon = $('.sp-nav-icon');

  var mc = new Hammer(document);

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

  // click
  $(document).on('click', '.sp-nav-icon', menu.sp.toggleMenu);

  // load
  $(window).on('load', menu.init);

  // Media Query
  window.matchMedia(MD).addListener(menu.init);

  //swipe
  mc.on('swipeleft', function(event) {
    if (!checkMQ(MD) && $body.hasClass('modal-open')) {
      menu.sp.toggleMenu();
    }
  });
  mc.on('swiperight', function(event) {
    if (!checkMQ(MD) && !$body.hasClass('modal-open')) {
      menu.sp.toggleMenu();
    }
  });
};
module.exports = (navCtrl)(jQuery);
