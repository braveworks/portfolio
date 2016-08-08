// "Magnific Popup" controller
// https://github.com/dimsemenov/Magnific-Popup/

var magnificPopup = function($) {

  require('magnific-popup');

  var imagesLoaded = require('imagesloaded');
  imagesLoaded.makeJQueryPlugin($);

  var animateFlag = false;

  $.Velocity.defaults.duration = 1000;
  $.Velocity.defaults.easing = 'easeOutQuart';
  $.Velocity.defaults.mobileHA = true;

  var option = {};

  var changeNextPrev = function(self, direction) {
    direction = (direction === 'prev') ? direction : 'next';
    animateFlag = true;
    self.content
      .velocity({ opacity: 0, translateX: (direction === 'prev') ? '50px' : '-50px' }, {
        duration: 300,
        complete: function() {
          self.content.removeAttr('style');
          if (direction === 'next') {
            $.magnificPopup.proto.next.call(self);
          } else if (direction === 'prev') {
            $.magnificPopup.proto.prev.call(self);
          }
          self.content
            .velocity({ opacity: 0, translateX: (direction === 'prev') ? '-50px' : '50px' }, { duration: 0 })
            .velocity({ opacity: 1, translateX: '0' }, {
              duration: 400,
              complete: function() {
                animateFlag = false;
              }
            });
        }
      });
  };

  // common option
  option.common = {
    closeMarkup: '<button class="mfp-close btn" title="%title%" type="button" >&#215;</button>',
    fixedContentPos: false,
    mainClass: 'mfp-fade',
    overflowY: 'auto',
    preloader: true,
    removalDelay: 500,
    callbacks: {
      beforeOpen: function() {
        $('body').addClass('modal-open');
      },
      beforeClose: function() {
        $('body').removeClass('modal-open');
        $('.popup').removeAttr('style');
      },
      open: function() {
        var self = this;
        this.content
          .velocity('stop')
          .velocity({ opacity: 0, scale: 0.92, translateX: 0 }, { duration: 0, display: 'block' })
          .velocity({ opacity: 1, scale: 1 }, { delay: 200 });
        $.magnificPopup.instance.next = function() {
          if (!animateFlag) { changeNextPrev(self, 'next'); } };
        $.magnificPopup.instance.prev = function() {
          if (!animateFlag) { changeNextPrev(self, 'prev'); } };
      },
      close: function() {
        this.wrap.removeClass('mfp-image-loaded');
      },
      imageLoadComplete: function() {
        var self = this;
        setTimeout(function() {
          self.wrap.addClass('mfp-image-loaded');
        }, 16);
      }
    }
  };

  // show description
  option.inline = {
    type: 'inline',
    midClick: true,
    gallery: {
      enabled: true
    }
  };

  // WP gallery
  option.gallery = {
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true
    },
    image: {
      cursor: null,
      titleSrc: function(item) {
        return item.el.parents('figure').find('figcaption').text();
      }
    }
  };

  // add event
  $('[data-mfp^="inline"]').magnificPopup($.extend(option.common, option.inline));
  $('[data-mfp^="gallery"]').magnificPopup($.extend(option.common, option.gallery));

};

module.exports = (magnificPopup)(jQuery);
