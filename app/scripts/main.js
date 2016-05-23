(function($) {

  // WebFont loader
  var fonts = [
    'https://fonts.googleapis.com/css?family=Roboto:400,300,700',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.0/css/font-awesome.min.css'
  ];
  var webfont = {
    add: function(d, f) {
      var l = d.createElement('link');
      l.rel = 'stylesheet';
      l.href = f;
      var s = d.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(l, s);
    },
    loader: function(fonts) {
      if (fonts) {
        fonts.forEach(function(element, index, array) {
          webfont.add(document, element);
        });
      }
    }
  };

  // common js
  var common = {

    // blur消去
    onFocusBlur: function() {
      $(document).on('click', 'a', function() {
        this.blur();
      });
    },

    // トップに戻るボタンフェード
    goTopbtnFade: function(element) {
      element = (!element) ? '.go-top' : element;
      var getBrowserSize = require('../modules/getBrowserSize.js');
      var goTop = $(element);
      var current;
      var option = {
        'in': 'fadeIn',
        'out': 'fadeOut',
        'duration': 300
      };
      goTop.hide();
      var scrollPosition = function() {
        var triggerOffset = getBrowserSize.height / 4;
        var scrTop = $(this).scrollTop();
        var move = (scrTop > triggerOffset) ? option.in : option.out;
        if (move !== current) {
          goTop.velocity(move, {
            duration: option.duration
          });
          current = move;
        }
      };
      $(window).on('scroll load', scrollPosition);
    },

    // スムーススクロール
    smoothScroll: function() {
      var scroll = {
        animate: function($target) {
          var targetOffset = $target.offset().top;
          var option = {
            offset: targetOffset,
            duration: 1600,
            easing: 'easeOutQuart',
            mobileHA: true
          };
          $('html').velocity('stop').velocity('scroll', option);

          return false;
        },
        hashCheck: function(e) {
          if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var $target = $(this.hash);
            if (this.hash.slice(1)) {
              $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
              if ($target.length) {
                scroll.animate($target);
              }
            }
          }
        },
        pageTop: function() {
          scroll.animate($('body,html'));
        },
        cancel: function(e) {
          $('html, body').velocity('stop');
        }
      };
      $(document)
        .on('click', '.go-top a', scroll.pageTop)
        .on('click', 'a[href*="#"]:not(.nolink)', scroll.hashCheck)
        .on('mousewheel DOMMouseScroll', scroll.cancel);
    }
  };

  // init
  var init = function() {
    webfont.loader(fonts);
    common.onFocusBlur();
    common.goTopbtnFade();
    common.smoothScroll();
  };
  init();

})(jQuery);
