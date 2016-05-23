(function($) {

  // ユーザーエージェント
  var ua = function(target) {
    var nut = navigator.userAgent.toLowerCase();
    var uaCheck = {
      'ie': nut.indexOf('msie') !== -1,
      'ie6': nut.indexOf('msie 6') !== -1,
      'ie7': nut.indexOf('msie 7') !== -1,
      'ie8': nut.indexOf('msie 8') !== -1,
      'ie9': nut.indexOf('msie 9') !== -1,
      'ie10': nut.indexOf('msie 10') !== -1,
      'ie11': nut.indexOf('msie 11') !== -1,
      'ff': nut.indexOf('firefox') !== -1,
      'safari': nut.indexOf('safari') !== -1,
      'chrome': nut.indexOf('chrome') !== -1,
      'opera': nut.indexOf('opera') !== -1,
      'iphone': nut.indexOf('iphone') !== -1,
      'ipad': nut.indexOf('ipad') !== -1,
      'ipod': nut.indexOf('ipod') !== -1,
      'win': navigator.appVersion.indexOf('Win') !== -1,
      'mac': navigator.appVersion.indexOf('Macintosh') !== -1,
      'android': nut.indexOf('android') !== -1,
      'ios': nut.indexOf('iphone') !== -1 || nut.indexOf('ipad') !== -1 || nut.indexOf('ipod') !== -1,
      'sp': nut.indexOf('iphone') !== -1 || nut.indexOf('ipad') !== -1 || nut.indexOf('ipod') !== -1 || (nut.indexOf('android') !== -1 && nut.indexOf('mobile') !== -1)
    };
    return uaCheck[target];
  };

  // ブラウザのインナーサイズを習得
  var getBrowserSize = {
    width: ua('ie') ? document.documentElement.clientWidth : window.innerWidth,
    height: ua('ie') ? document.documentElement.clientHeight : window.innerHeight
  };

  // WebFont
  var fonts = [
    'https://fonts.googleapis.com/css?family=Roboto:400,300,700',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.0/css/font-awesome.min.css'
  ];

  // WebFont loader
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

    // スムーススクロール (.nolink 以外)
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
