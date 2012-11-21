(function($){

  $(document).ready(function($) {
    $('.search-login .grid-inner').equalize('height');
    $('footer .grid-inner').equalize('height');
    $('input[placeholder],textarea[placeholder]').placeholder();
        count = $('.ting-search-amount-block em:eq(2)').clone().addClass('navcount');
    $('.nav li a').first().append(count);
});

})(jQuery);
