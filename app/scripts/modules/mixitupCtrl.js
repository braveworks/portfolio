// Instantiate MixItUp:

var mixitupCtrl = function($) {

  var modules = require('./modules');

  modules.sleep(1000).then(function() {
    $('#container').mixItUp();
  });

};
module.exports = (mixitupCtrl)(jQuery);
