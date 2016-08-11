/**
 * add remove focus blur event
 */

var barbaCtrl = function($) {

  var Barba = require('barba.js');

  var controller = function() {

    var lastElementClicked;
    var PrevLink = document.querySelector('a.prev');
    var NextLink = document.querySelector('a.next');

    Barba.Pjax.init();
    Barba.Prefetch.init();

    Barba.Dispatcher.on('linkClicked', function(el) {
      lastElementClicked = el;
    });

    var MovePage = Barba.BaseTransition.extend({
      start: function() {
        this.originalThumb = lastElementClicked;
        Promise
          .all([this.newContainerLoading, this.scrollTop()])
          .then(this.movePages.bind(this));
      },

      scrollTop: function() {
        var deferred = Barba.Utils.deferred();
        var obj = { y: window.pageYOffset };

        TweenMax.to(obj, 0.4, {
          y: 0,
          onUpdate: function() {
            if (obj.y === 0) {
              deferred.resolve();
            }

            window.scroll(0, obj.y);
          },
          onComplete: function() {
            deferred.resolve();
          }
        });

        return deferred.promise;
      },

      movePages: function() {
        var _this = this;
        var goingForward = true;
        this.updateLinks();

        if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
          goingForward = false;
        }

        TweenMax.set(this.newContainer, {
          visibility: 'visible',
          xPercent: goingForward ? 10 : -10,
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0,
          width: '100%',
          paddingLeft: '15px',
          paddingRight: '15px'
        });

        TweenMax.set($(this.newContainer).find('stagger'), {
          opacity: 0,
          x: 100
        });


        TweenMax.to(this.oldContainer, 0.6, {
          xPercent: goingForward ? -30 : 30,
          opacity: 0,
          force3D: true,
          onComplete: function() {
            _this.done();
          }
        });
        TweenMax.staggerTo($(this.newContainer).find('stagger'), 0.6, { opacity: 1, x: 0 },0.2);
        TweenMax.to(this.newContainer, 1, {
          xPercent: 0,
          opacity: 1,
          force3D: true,
          onComplete: function() {
            TweenMax.set(_this.newContainer, { clearProps: 'all' });
          }
        });
      },

      updateLinks: function() {
        // PrevLink.href = this.newContainer.dataset.prev;
        // NextLink.href = this.newContainer.dataset.next;
      },

      getNewPageFile: function() {
        return Barba.HistoryManager.currentStatus().url.split('/').pop();
      }
    });

    Barba.Pjax.getTransition = function() {
      return MovePage;
    };
  };

  document.addEventListener('DOMContentLoaded', controller);
};
module.exports = (barbaCtrl)(jQuery);
