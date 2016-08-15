let hrefOpen = ($) => {

  $(document).on('click', 'a.op-window', (e) => {
    console.log(e);
    var url = $(e.target).attr('href');
    window.open(url, '');

    return false;
  });

};
module.exports = (hrefOpen)(jQuery);
