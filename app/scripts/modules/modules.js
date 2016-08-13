module.exports = {

  // check wordpress front-page
  isHome: !!jQuery('body.home').length,

  // Bootstrap3 breakpoints
  mq: {
    SM: '(min-width:768px)',
    MD: '(min-width:992px)'
  },

  // check MediaQuery
  checkMQ: function(mq) {
    return window.matchMedia(mq).matches;
  },

  // get orientation status
  getOrientation: function() {
    var land = this.checkMQ('(orientation:landscape)');
    var port = this.checkMQ('(orientation:portrait)');
    return {
      width: (land && !port) ? screen.height : screen.width,
      height: (land && !port) ? screen.width : screen.height,
      direction: (land && !port) ? 'landscape' : 'portrait'
    };
  },

  // get browser inner size
  getBrowserSize: function() {
    var ua = require('./ua.js');

    return {
      width: ua('ie') ? document.documentElement.clientWidth : window.innerWidth,
      height: ua('ie') ? document.documentElement.clientHeight : window.innerHeight
    };
  },

  // get query var
  getQuery: function() {
    var arg = {};
    var pair = location.search.substring(1).split('&');
    for (var i = 0; pair[i]; i++) {
      var kv = pair[i].split('=');
      arg[kv[0]] = kv[1];
    }
    return arg;
  },

  // interval function
  interval: function(callback) {
    var fps = 12;
    var interval = 1 / fps * 1000;
    setInterval(callback, interval);
  },

  // wait
  sleep: function(ms) {
    var d = new jQuery.Deferred();
    var waitObj = setTimeout(function() {
      d.resolve();
    }, ms);
    return d.promise();
  },

  randomNumber : (min, max) => {
    return Math.floor(Math.random() * (1 + max - min) + min);
  },

  // get wordpress theme path
  getWPPath: {
    current: function() {
      if (document.currentScript) {
        return document.currentScript.src;
      } else {
        var scripts = document.getElementsByTagName('script'),
          script = scripts[scripts.length - 1];
        if (script.src) {
          return script.src;
        }
      }
    },
    split: function(splitter) {
      var path = this.getWPPath.current();
      return path.substring(0, path.indexOf(splitter));
    }
  },

  snake2camel: function(str, upper) {
    str = str
      .replace(/^[\-_ ]/g, "")
      .replace(/[\-_ ]./g, function(match) {
        return match.charAt(1).toUpperCase();
      });
    return upper === true ?
      str.replace(/^[a-z]/g, function(match) {
        return match.toUpperCase();
      }) : str;
  }

};
