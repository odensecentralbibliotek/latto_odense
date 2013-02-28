(function($){
 
  $(document).ready(function($) {
    //choose all checkbox on user status list
    var alle = $('.select-all input[type=checkbox]').attr('title');
    $('<span> '+alle+'</span>').appendTo('.select-all');
    //$('.search-login .grid-inner').equalize('height');
    
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
        $('footer .grid-inner').equalize('height');
    //initialize after images are loaded  
     $('.ting-cover img').parent().removeClass('ting-cover');
  });  
    
  });
  
  // reload page after closing reservation pop-up
  Drupal.behaviors.reloadBookmarkOnPopupClose = {
    attach: function(context) {
      // Capture link clicks.
      $('.ui-dialog a.ui-dialog-titlebar-close').each( function(context) {
        // Unbind existing click behaviors.
        $(this).unbind('click');
        // Handle clicks.
        $(this).click( function(e) {
          // Remove the default click handler.
          e.preventDefault();
          location.reload();
          return false;
        });
      });
    }
  };

})(jQuery);
