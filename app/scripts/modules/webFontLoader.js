var webFontLoader = function() {

  // WebFont
  var fonts = [
    'https://fonts.googleapis.com/css?family=Raleway:400,300,100,700',
    'https://cdn.jsdelivr.net/fontawesome/4.6.3/css/font-awesome.min.css'
  ];

  // WebFont loader
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

  webfont.loader(fonts);

};

module.exports = (webFontLoader)();
