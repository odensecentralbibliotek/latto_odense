  (function($){

 jQuery.fn.exists = function(){
   return this.length>0;
 }

  $(document).ready(function($) {
    $('#search_input').fastLiveFilter('.floated');
    //Remove empty columns in user tables
    emptyColumnRemove = $("#ding-reservation-reservations-notready-form table, #ding-reservation-reservations-ready-form table, #ding-loan-loans-form table");   
    if(emptyColumnRemove.exists()){
      $(emptyColumnRemove).each(function(a, tbl) {
        $(tbl).find('th').each(function(i) {
          var remove = true;
          var currentTable = $(this).parents('table');
          var tds = currentTable.find('tr td:nth-child(' + (i + 1) + ')');
          tds.each(function(j) {if (this.innerHTML != '') remove = false;});
          if (remove) {
            $(this).hide();
            tds.hide();
          }
        });
      });
    }
 
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
    //Insert a counter in search tabs
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
    
      $(window).load(function(){  
        $('footer .grid-inner').equalize('height');
  });  
    
  });
  

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

  Drupal.behaviors.localeDatepicker = {   
    attach: function (context, settings) {
      //Added overdue for expire-date
      loanspage = $('#ding-loan-loans-form');
      if (loanspage.exists()) {
        var ny = new Date();
        ny = new Date(ny.getFullYear(), ny.getMonth(), ny.getDate());
        var overdue = Drupal.t('overdue');
        $('.expire-date').each(function( ) {
          var expire = $.datepicker.parseDate('dd/m yy', $(this).text());
          if (ny > expire) {
            $('<span> '+overdue+'</span>').appendTo(this); 
            $(this).css( "color", "red" );
          }
        }); 
      }
    }
  };
  $(document).ajaxComplete(function() {
    $(".list-item .btn-large").text('Bestil billet(ter)').remove();
  });
})(jQuery);
