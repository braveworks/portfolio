var addCurrentClass = function() {

  var $gnav = $('.gnav');

  $gnav.find('a').removeClass('current');
  var url = location.pathname.split('/')[1];
  url = (url) ? url : 'index.html';
  $gnav.find('a[href^="' + url + '"]').addClass('current');

  var currentTop = $gnav.find('.current').offset().top;
  var currentBottom = currentTop + $gnav.find('.current').height();
  var gnavTop = $gnav.scrollTop();
  var gnavBottom = gnavTop + $gnav.outerHeight();

  // console.log('currentTop:' + currentTop);
  // console.log('currentBottom:' + currentBottom);
  // console.log('gnavTop:' + gnavTop);
  // console.log('gnavBottom:' + gnavBottom);

  if (gnavTop > currentTop || currentBottom > gnavBottom) {
    var targetOffset = currentTop;
    TweenMax.to($('.gnav'), 1, { scrollTo: { y: targetOffset, autoKill: true, force3D: true } });
  }

};
module.exports = addCurrentClass;
