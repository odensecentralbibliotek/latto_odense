(function($){
  
 jQuery.fn.exists = function(){
   return this.length>0;
 }

  $(document).ready(function($) {
   
   $('.pane-pane-header').wrap('<a href="/" />');
   
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        $('.facetbrowser_overlay').remove();
      }
    });
    //choose all checkbox on user status list
    var alle = $('.select-all input[type=checkbox]').attr('title');
    $('<span> '+alle+'</span>').appendTo('.select-all');
    //$('.search-login .grid-inner').equalize('height');
    
    $('input[placeholder],textarea[placeholder]').placeholder();
    if ($('.ting-search-amount-block')) {
      count = $('.ting-search-amount-block em:eq(2)').clone().addClass('navcount');
      $('.nav li a').first().append(count);
    }
    viewElem = $('.view-header');
    if (viewElem.exists()) {
      viewElem.text(viewElem.text().trim());
      countNode = viewElem.addClass('navcount');
      $('#search-tabs li:nth-child(2) a').first().append(countNode);
    }
    else {
      $('#search-tabs li:nth-child(2) a').first().append(' (0)');
    }
    
    $('.profile .form-item:not(:last-child)').each(function() {
      $(this).addClass('list-item');
      $(this).parent().addClass('list');
      $('.profile2_provider_reservation_pause div.form-item label:contains("Start")').parent().removeClass('list-item');
      $('.profile2_provider_reservation_pause div.form-item label:contains("Stop")').parent().addClass('list-item');
    });

    $('#user-profile-form').addClass('list');
    $('#user-profile-form').each(function() {
      $('.form-item-mail, .form-type-password-confirm, .smsservice, #profile-provider-alma-field-alma-mobile-phone-add-more-wrapper, .fieldset-wrapper').addClass('list-item');
    });
    
    interestperiod = $(".profile .form-item label b:contains('Interesseperiode')");
    
    if(interestperiod.exists()){
      $(interestperiod).parent().parent().remove();      
    }    
    input = jQuery('#ding-loan-loans-form .table .form-type-checkbox');
    disabled = jQuery('#ding-loan-loans-form .table .form-type-checkbox.form-disabled');
    if (input.length == disabled.length){
       $("#ding-loan-loans-form .select-all .form-checkbox").attr("disabled", "disabled");
    }
    
    $("a.infomedia_group").addClass("btn");
    $("#edit-submit").css('display', '');
    
    $(".field-type-ting-details-uri a").addClass("btn").text('Hent online');
  
    $(".pane-search-form input[type=submit], .form-type-checkbox .option a").click(function(){     
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


 Drupal.behaviors.resetSearch = {
    attach: function(context) {
  $("#reset, #adv-reset").click(function(){
    $("#search-form select, #search-form input[type=text]").each(function() {
      $(this).val("");
      $(".ui-autocomplete").remove();
  });
  });
}
  };

})(jQuery);
