var addCurrentClass = function() {

  var $gnav = $('.gnav');

  $gnav.find('a').removeClass('current');
  var url = location.pathname.split('/')[1];
  url = (url) ? url : 'index.html';
  $gnav.find('a[href^="' + url + '"]').addClass('current');

  var ct = $gnav.find('.current').offset().top;
  var cb = ct + $gnav.find('.current').outerHeight();
  var gt = $gnav.scrollTop();
  var gb = gt + $gnav.outerHeight();

  // console.log('ct:' + ct);
  // console.log('cb:' + cb);
  // console.log('gt:' + gt);
  // console.log('gb:' + gb);

  if (cb > gb) {
    console.log('bottom:out');
    // var targetOffset = ct;
    // TweenMax.to($('.gnav'), 1, { scrollTo: { y: targetOffset, autoKill: true, force3D: true } });
  }
  if (gt > ct) {
    console.log('top:out');
    // var targetOffset = ct;
    // TweenMax.to($('.gnav'), 1, { scrollTo: { y: targetOffset, autoKill: true, force3D: true } });
  }

};
module.exports = addCurrentClass;
