module.exports = function() {

  var sleep = require('./modules').sleep;
  var ua = require('./ua');

  var $slideElement = $('.slide-in');
  var $staggerBlock = $('.stagger-block');
  var $staggerElement = $('.stagger');

  var controller = new ScrollMagic.Controller();
  var slide = [];
  var stagger = [];

  var option = {
    tween: {
      y: 80,
      opacity: 0,
      ease: Quad.easeOut,
      force3D: (Modernizr.csstransforms3d) ? true : false
    },
    scene: {
      triggerHook: 0.88,
      reverse: false
    }
  };

  function initSlideTween() {
    if (!ua('sp') && Modernizr.csstransforms3d) {
      //slide in
      $slideElement.each(function(i, elem) {
        option.scene.triggerElement = elem;
        slide[i] = new ScrollMagic
          .Scene(option.scene)
          .setTween(TweenMax.from(elem, 1, option.tween))
          .addTo(controller);
      });

      //stagger slide in
      $staggerBlock.each(function(i, elem) {
        var child = $(elem).find($staggerElement);
        option.scene.triggerElement = elem;
        option.tween.y = 50;
        stagger[i] = new ScrollMagic
          .Scene(option.scene)
          .setTween(TweenMax.staggerFrom(child, 0.8, option.tween, 0.2))
          .addTo(controller);
      });

      $(window).on('resize', function() {
        TweenMax.killAll();
        $slideElement.removeAttr('style');
      });
    }
  }
  initSlideTween();
};
