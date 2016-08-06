/**
 * add remove focus blur event
 */

var onFocusBlur = function($) {

  $(document).on('click focus', 'a, button', function(e) { $(this).blur(); });

};
module.exports = (onFocusBlur)(jQuery);
