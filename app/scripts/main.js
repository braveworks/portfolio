(function($) {
  var fonts = [
    'https://fonts.googleapis.com/css?family=Roboto:400,300,700',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.0/css/font-awesome.min.css'
  ];
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
  var init = function() {
    webfont.loader(fonts);
  };
  init();
})(jQuery);
