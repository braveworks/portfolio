var btnNavPosition = function($) {

  var $next = $('a.next');
  var $prev = $('a.prev');
  var $container = $('#barba-wrapper');
  var margin = 0;

  var setPosition = function() {
    $next.css({ 'top': '50vh', 'right': margin + 'px' });
    $prev.css({ 'top': '50vh', 'left': $container.offset().left + margin });
  };

  $(window).on('load resize', setPosition);
};
module.exports = (btnNavPosition)(jQuery);
