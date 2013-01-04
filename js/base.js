(function($){

  $(document).ready(function($) {
    //$('.search-login .grid-inner').equalize('height');
    $('footer .grid-inner').equalize('height');
    $('input[placeholder],textarea[placeholder]').placeholder();
    if ($('.ting-search-amount-block')) {
     count = $('.ting-search-amount-block em:eq(2)').clone().addClass('navcount');
     $('.nav li a').first().append(count);
    }
    $("a.infomedia_group").addClass("btn");
    $(".field-type-ting-details-uri a").addClass("btn").text('Hent online');
    $("#edit-advanced").addClass("extendsearch-advanced");
});

})(jQuery);
