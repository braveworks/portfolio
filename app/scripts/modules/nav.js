var navCtrl = function() {
  var $body = $('body');
  var $header = $('.nav-global');
  var $icon = $('.sp-nav-icon');
  var menu = {
    sp: {
      // sp menu slide animation
      slide: function(isActive) {
        $header.velocity('stop').velocity({
          scale: (isActive) ? '1' : '1.05',
          opacity: (isActive) ? '1' : '0'
        }, {
          display: (isActive) ? 'block' : 'none',
          duration: 700,
          easing: 'easeOutQuart',
          mobileHA: true
        });
      },
      // sp menu toggle & change hamberger icon
      toggleMenu: function() {
        var isActive = (checkMQ(SM)) ? true : $icon.hasClass('is-active');
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
      $header.velocity('stop').removeAttr('style');
      $body.removeClass('modal-open');
      if (!checkMQ(SM)) {
        $icon.removeClass('is-active');
        menu.sp.slide(false);
      }
    }
  };
  $(document).on('click', '.sp-nav-icon', menu.sp.toggleMenu);
  $(window).on('load', menu.init);
  window.matchMedia(SM).addListener(menu.init);
};
module.exports = (navCtrl)(jQuery);
