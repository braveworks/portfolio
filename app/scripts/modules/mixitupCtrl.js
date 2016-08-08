// Instantiate MixItUp:

var mixitupCtrl = function($) {

  require('mixitup');

  var sleep = require('./modules').sleep;
  var option = {
    animation: {
      duration: 660,
      effects: 'fade stagger(34ms) scale(0.01)',
      easing: 'ease'
    }
  };

  sleep(800).then(function() {
    $('#container').mixItUp(option);
  });

};
module.exports = (mixitupCtrl)(jQuery);
