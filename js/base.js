window.xact_width=400;
window.xact_height=400;
window.xact_surveyURL='https://www.survey-xact.dk/LinkCollector?key=Z6QJ5GLE3231';
window.xact_surveyKey='Z6QJ5GLE3231';
window.xact_probability = 1;
window.xact_baseURL = 'https://www.survey-xact.dk';
window.xact_language = "da";
xact_startPopIn();

(function($){
 
  $(document).ready(function($) {
    //choose all checkbox on user status list
    var alle = $('.select-all input[type=checkbox]').attr('title');
    $('<span> '+alle+'</span>').appendTo('.select-all');
    //$('.search-login .grid-inner').equalize('height');
    $('footer .grid-inner').equalize('height');
    $('input[placeholder],textarea[placeholder]').placeholder();
    if ($('.ting-search-amount-block')) {
      count = $('.ting-search-amount-block em:eq(2)').clone().addClass('navcount');
      $('.nav li a').first().append(count);
    }
    $("a.infomedia_group").addClass("btn");
    $("#edit-submit").css('display', '');
    
    $(".field-type-ting-details-uri a").addClass("btn").text('Hent online');
    
    $(".pane-search-form input[type=submit], .ui-corner-all, .pager li, .form-type-checkbox .option a").click(function(){     
      $('<div class="facetbrowser_overlay"><div class="spinner"></div></div>').prependTo('body');
    });
   // Select Internet Explorer 7 and below
if (jQuery.browser.msie && jQuery.browser.version <= 8) {
    // do sth.
        $('.ting-cover').removeClass('ting-cover');
  }
      $(window).load(function(){  
    //initialize after images are loaded  
     $('.ting-cover img').parent().removeClass('ting-cover');
  });  
    
  }); 

})(jQuery);
