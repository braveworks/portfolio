var addCurrentClass = function() {

  var $gnav = $('.gnav');
  var url = location.pathname.split('/')[location.pathname.split('/').length - 1];
  url = (url) ? url : 'index.html';
  console.log(url);

  $gnav.find('a').removeClass('current');
  $gnav.find('a[href^="' + url + '"]').addClass('current');

  if ($('.current').length) {
    var wh = $(window).height();
    var ct = $gnav.find('.current').offset().top;
    var cb = ct + $gnav.find('.current').outerHeight();

    if (cb > wh || 0 > ct) {
      var targetOffset = ct;
      TweenMax.to($gnav, 3, { scrollTo: { y: targetOffset, autoKill: true, force3D: true }, ease: Power4.easeOut });
    }
  }

};
module.exports = addCurrentClass;
