var addCurrentClass = function() {

  var $gnav = $('.gnav');
  var url = location.pathname.split('/')[1];
  url = (url) ? url : 'index.html';

  $gnav.find('a').removeClass('current');
  $gnav.find('a[href^="' + url + '"]').addClass('current');

  var wh = $(window).height();
  var ct = $gnav.find('.current').offset().top;
  var cb = ct + $gnav.find('.current').outerHeight();

  if (cb > wh || 0 > ct) {
    var targetOffset = ct;
    TweenMax.to($gnav, 3, { scrollTo: { y: targetOffset, autoKill: true, force3D: true }, ease: Power4.easeOut });
  }

};
module.exports = addCurrentClass;
