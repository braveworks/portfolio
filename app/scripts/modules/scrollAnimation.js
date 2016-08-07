/**
 * scrollmagic controller
 */

var scrollAnimation = function($) {

  require('browsernizr/test/css/transforms.js');
  var Modernizr = require('browsernizr');
  var ScrollMagic = require('scrollmagic');
  var controller = new ScrollMagic.Controller();

  var $slideElement = $('.slide-in');
  var $staggerBlock = $('.stagger-block');
  var $staggerElement = '.stagger';

  var slide = [],
    stagger = [];

  var option = {
    scene: {
      triggerHook: 0.88,
      reverse: false
    }
  };

  var animation = {

    slideIn: function() {
      $slideElement.velocity({ opacity: 0, translateY: '100px' }, { duration: 0 }); // reset style
      $slideElement.each(function(i, elem) {
        option.scene.triggerElement = elem;
        slide[i] = new ScrollMagic.Scene(option.scene)
          .on('add', function() { $(elem).velocity({ opacity: 1, translateY: '0' }, { duration: 1000, easing: 'easeOutQuad' }); })
          .addTo(controller);
      });
    },

    stagger: function() {
      $staggerBlock.each(function(i, elem) {
        var child = $(elem).find($staggerElement);
        child.velocity({ opacity: 0, translateY: '100px' }, { duration: 0 });
        option.scene.triggerElement = elem;
        stagger[i] = new ScrollMagic.Scene(option.scene)
          .on('add', function() { child.delay(450).velocity('transition.slideUpIn', { stagger: 150 }); })
          .addTo(controller);
      });
    },

    kill: function() {
      $slideElement.velocity('stop').removeAttr('style');
    },

    load: function() {
      if (Modernizr.csstransforms) {
      animation.slideIn();
      animation.stagger();
      }
    }

  };

  // set event
  $(window).on({
    'resize': animation.kill,
    'load': animation.load
  });

};
module.exports = (scrollAnimation)(jQuery);
