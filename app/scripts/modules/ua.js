// get user agent
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
module.exports = ua;
