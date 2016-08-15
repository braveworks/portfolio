var navCtrl = function($) {

  var modules = require('./modules');
  var Hammer  = require('hammerjs');

  var MD      = modules.mq.MD;
  var checkMQ = modules.checkMQ;

  var $body   = $('body');
  var $header = $('.gnav');
  var $icon   = $('.sp-nav-icon');

  var mc      = new Hammer(document);

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
      }

    },

    reset: function() {
      TweenMax.killTweensOf($header);
      $header.removeAttr('style');
      $body.removeClass('modal-open');
      if (!checkMQ(MD)) {
        $icon.removeClass('is-active');
        menu.sp.slide(false);
      }
      menu.stagger();
    },

    stagger: function() {
      if (checkMQ(MD)) {
        TweenMax.staggerFromTo($header.find('ul>li,.stagger'), 1, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          delay: 0.2,
          ease: Expo.easeOut,
          clearProps: 'all'
        }, 0.1);
      }
    },

    swipeClse: function(event) {
      if (!checkMQ(MD) && $body.hasClass('modal-open')) {
        menu.sp.toggleMenu();
      }
    },

    start: function() {
      //add backdrop
      $body.prepend('<div class="backdrop"></div>');

      // click event
      $(document).on('click', '.sp-nav-icon,.backdrop,.modal-open .gnav a', menu.sp.toggleMenu);

      // load event
      $(window).on('load', menu.reset);

      // matchMedia event
      window.matchMedia(MD).addListener(menu.reset);

      //swipe event
      mc.on('swipeleft', menu.swipeClse);
    }

  };

  menu.start();

};
module.exports = (navCtrl)(jQuery);
