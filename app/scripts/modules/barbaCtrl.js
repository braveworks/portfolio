/**
 * add remove focus blur event
 */

var barbaCtrl = function($) {

  var Barba = require('barba.js');
  var Hammer = require('hammerjs');
  var imagesLoaded = require('imagesloaded');
  imagesLoaded.makeJQueryPlugin($);

  var introAnimation = require('./introAnimation');
  var addCurrentClass = require('./addCurrentClass');
  var swipeCtrl = new Hammer(document);

  var controller = function() {

    var lastElementClicked;
    var PrevLink = document.querySelector('a.prev');
    var NextLink = document.querySelector('a.next');

    Barba.Pjax.init();
    Barba.Prefetch.init();
    Barba.Dispatcher.on('linkClicked', function(el) { lastElementClicked = el; });
    Barba.Dispatcher.on('newPageReady', function() { addCurrentClass(); });

    var Homepage = Barba.BaseView.extend({
      namespace: 'homepage',
      onEnter: function() {
        introAnimation($);
      }
    });
    Homepage.init();

    var MovePage = Barba.BaseTransition.extend({

      start: function() {
        this.originalThumb = lastElementClicked;
        $('a').addClass('disable');

        Promise
          .all([this.newContainerLoading, this.scrollTop()])
          .then(this.movePages.bind(this));
      },

      scrollTop: function() {
        var deferred = Barba.Utils.deferred();
        var obj = { y: window.pageYOffset };

        TweenMax.to(obj, 0.6, {
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
        var once = false;
        var $oldContent = $(this.oldContainer).find('.content > *');
        var $newContent = $(this.newContainer).find('.content > *:not(.screenshot)');

        this.updateLinks();

        if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
          goingForward = false;
        }

        // init new container prop
        TweenMax.set(this.newContainer, { visibility: 'visible', position: 'absolute', left: 0, top: 0, width: '100%', paddingLeft: '15px', paddingRight: '15px' });
        TweenMax.set($(this.newContainer).find('figure'), { autoAlpha: 0, y: 30 });
        TweenMax.to($(this.newContainer).find('.screenshot-loader'), 0.1, { display: 'block', delay: 0.5 });

        // move old container
        if ($oldContent.length) {
          TweenMax.staggerTo($oldContent, 0.3, { xPercent: goingForward ? -10 : 10, opacity: 0, force3D: true, }, 0.1, function() {
            if (!once) {
              _this.done();
              $('a').removeClass('disable');
              once = !once;
            }
          });
        } else {
          _this.done();
          $('a').removeClass('disable');
        }

        // move new container
        TweenMax.staggerFromTo($newContent, 0.6, { xPercent: goingForward ? 10 : -10, opacity: 0 }, { xPercent: 0, opacity: 1, force3D: true, clearProps: 'all' }, 0.1, function() {
          $(_this.newContainer).find('figure').imagesLoaded(function(i) {
            TweenMax.to($(_this.newContainer).find('.screenshot-loader'), 0.3, {
              autoAlpha: '0',
              display: 'none',
              onComlete: function() {
                TweenMax.to($(i.elements[0]), 0.6, { autoAlpha: 1, y: 0, clearProps: 'all', force3D: true });
              }
            });
          });
        });
      },

      updateLinks: function() {
        PrevLink.href = this.newContainer.dataset.prev;
        NextLink.href = this.newContainer.dataset.next;
      },

      getNewPageFile: function() {
        return Barba.HistoryManager.currentStatus().url.split('/').pop();
      }
    });

    Barba.Pjax.getTransition = function() {
      return MovePage;
    };

    // swipe Ctrl
    swipeCtrl.on('swipeleft', function(event) {
      if (!$('body').hasClass('modal-open')) {
        Barba.Pjax.goTo(NextLink.href);
      }
    });

    swipeCtrl.on('swiperight', function(event) {
      if (!$('body').hasClass('modal-open')) {
        Barba.Pjax.goTo(PrevLink.href);
      }
    });

    // index.html
    addCurrentClass();
  };

  document.addEventListener('DOMContentLoaded', controller);

  $(document).on('click', 'a.current,a.disable', function(e) {
    e.preventDefault();
  });
};
module.exports = (barbaCtrl)(jQuery);
