(function($) {
      //Make so the preloader is shown everytime we interact with the well.
    jQuery.fn.exists = function() {
        return this.length > 0;
    };

    $(document).ready(function($) {
        Klubtilbud_tooltips();
        $("#subunsubform").attr("target", "_blank");
        $("#ding-library-front iframe").attr("allowfullscreen", "true");
        
if ($('#search_input').exists() && $.fn.fastLiveFilter != undefined ) {
            $('#search_input').fastLiveFilter('.fastfilter');
            UpdatePlace2bookEventStatus(); 
        }
        $(document).ajaxSuccess(UpdatePlace2bookEventStatus);
        //Remove empty columns in user tables
        emptyColumnRemove = $("#ding-reservation-reservations-notready-form table, #ding-reservation-reservations-ready-form table, #ding-loan-loans-form table");
        if (emptyColumnRemove.exists()) {
            $(emptyColumnRemove).each(function(a, tbl) {
                $(tbl).find('th').each(function(i) {
                    var remove = true;
                    var currentTable = $(this).parents('table');
                    var tds = currentTable.find('tr td:nth-child(' + (i + 1) + ')');
                    tds.each(function(j) {
                        if (this.innerHTML != '')
                            remove = false;
                    });
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
                //$('.facetbrowser_overlay').remove();
                $('search-overlay--wrapper').remove();
            }
            
        });
        function testselect(event, ui)
        {
            return false;
        }
        //choose all checkbox on user status list 
        var alle = $('.select-all input[type=checkbox]').attr('title');
        $('<span> ' + alle + '</span>').appendTo('.select-all');
        //$('.search-login .grid-inner').equalize('height');

        $('input[placeholder],textarea[placeholder]').placeholder();
        if ($('.ting-search-amount-block')) {
            count = $('.ting-search-amount-block em:eq(2)').clone().addClass('navcount');
            $('.nav li a').first().append(count);
        }
        
        //Insert a counter in search tabs
        viewElem = $('.view-header');
        if (viewElem.exists()) {
            $.trim(viewElem.text(viewElem.text()));
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
        
        var interestperiod = $(".profile .form-item label b:contains('Interesseperiode')");

        if (interestperiod.exists()) {
            $(interestperiod).parent().parent().remove();
        }
        
        var input = jQuery('#ding-loan-loans-form .table .form-type-checkbox');
        var disabled = jQuery('#ding-loan-loans-form .table .form-type-checkbox.form-disabled');
        if (input.length == disabled.length) {
            $("#ding-loan-loans-form .select-all .form-checkbox").attr("disabled", "disabled");
        }
        
        $("a.infomedia_group").addClass("btn");
        $("#edit-submit").css('display', '');

        $(".field-type-ting-details-uri a").addClass("btn").text('Hent online');
        
        //$(".pane-search-form input[type=submit], .form-type-checkbox .option a").click(function(e) { -> was conflicting with facetbrowser.
        $(".pane-search-form input[type=submit]").click(function(e) {
            //This is done to make sure loadscreen is crossbrowser compatible.
            e.preventDefault(); 
            $('<div class="search-overlay--wrapper"><div class="search-overlay--inner"><i class="icon-spinner icon-spin search-overlay--icon"></i><p class="search-overlay--text">' + Drupal.t('Searching please wait...') + '</p><p class="cancel"><a href="#">' + Drupal.t('Cancel') + '</a></p></div></div>').prependTo('body');
            setTimeout(function(){
                $('.search-form').submit();
            },1);
        });
        
        $(window).load(function() {
            $('footer .grid-inner').equalize('height');
        });
        
    });

    //If user wants to cancel his search.
    $('.search-overlay--wrapper .cancel').live('click', function (e) {
        try{
            window.stop();
        }
        catch(e)
        {
            document.execCommand('Stop');
        } 
        $('.search-overlay--wrapper').remove();
    });
    // Remove overlay on page unload, so it's not shown when back button is used
    // in the browser.
    $(window).unload(function (e) {
        var overlay = $('.search-overlay--wrapper');
        if (overlay.length) {
            $('.search-overlay--wrapper').remove();
        }
    });
    
    Drupal.behaviors.resetSearch = {
        attach: function(context) {
            $("#reset, #adv-reset").click(function() {
                $("#search-form select, #search-form input[type=text]").each(function() {
                    $(this).val("");
                    $(".ui-autocomplete").remove();
                });
            });
        }
    };

    Drupal.behaviors.localeDatepicker = {
        attach: function(context, settings) {
            //Added overdue for expire-date
            loanspage = $('#ding-loan-loans-form');
            if (loanspage.exists()) {
                var ny = new Date();
                ny = new Date(ny.getFullYear(), ny.getMonth(), ny.getDate());
                var overdue = Drupal.t('overdue');
                $('.expire-date').each(function( ) {
                    var expire = $.datepicker.parseDate('dd/m yy', $(this).text());
                    if (ny > expire) {
                        $('<span> ' + overdue + '</span>').appendTo(this);
                        $(this).css("color", "red");
                    }
                });
            }
        }
    };
function Klubtilbud_tooltips()
{
    //Check if the neccesary variables exists. else dont run at all.
    if(typeof Drupal.settings.oc_template_overwrites.is_active === 'undefined' 
        || Drupal.settings.oc_template_overwrites.is_active == "0")
    {
        return;
    }
    //Select all events containing a club offer.
    $('.list-item:has(.views-field-field-klub-tilbud):not(:empty)').each(function(i,e){
        var obj = $(e.firstChild);
        var clubOffer = obj.text();
        switch(clubOffer)
        {
            case 0:
            case 'Nysgerrig Fyn':
            {
                obj.css({
                    'float' : 'right',
                    'width' : '50px',
                    'height' : '50px',
                    'background-image': "url('/sites/all/themes/latto_odense/images/øje2.png')",
                 });
                obj.attr('title','Nysgerrig Fyn');
                obj.wrap('<a target="_blank" href="'+Drupal.settings.oc_template_overwrites.nysfyn_link+'"></a>');
                obj.empty();
                break;
            }
            default:
                break;
        }
        console.log('Event.');
    })
        //Add tooltip information and appropriate background/css.
}
function UpdatePlace2bookEventStatus(event, xhr, settings)
{

    //Only execute if we are requesting TicketInfo throu ajax.
    if (settings != undefined && settings.url.indexOf("/ding/place2book/ticketinfo/ajax/") == 0) {

        return;
    };
    //Make sure the new events loaded are also marked with club offer.
    Klubtilbud_tooltips();
    
    //Make sure that live filtering works aswell.
    if ($('#search_input').exists() && $.fn.fastLiveFilter != undefined ) {
    $('#search_input').fastLiveFilter('.fastfilter');
}
    //Update Place2Book Status for list 
    var NodeArray = new Array();
    Place2BookEvents = [];
    $('.fastfilter .list-item .views-field-field-place2book-tickets .field-content').each(function(index,val){
        var Nodeid = $(val.parentNode.parentNode).find(".views-field-nid .field-content").text();
        var PlaceHolder = $(val.parentNode.parentNode).find(".views-field-field-place2book-tickets .field-content").text();
        if(Nodeid != undefined && Nodeid != "")
        {
            NodeArray.push(Nodeid);
            Place2BookEvents.push(val);
        }
    });

    var spinnerUrl = Drupal.settings.basePath + "files/362.GIF";
    $.each(Place2BookEvents,function(index,val){
        $(val.parentNode.parentNode).append("<div id='preloader'><img style='float:right;width:20px;height;20px' src="+spinnerUrl+" /><div>");
        $(val.parentNode.parentNode).removeClass('js-hide');
    });
    if(NodeArray.length == 0)
    {
        return;
    }
    //Retrive shown events status. ( Making it appear more responsive loading to user)
    $.each(NodeArray,function(index,obj){
        if(obj == "")
        {
            return;
        } 
        setTimeout(function(){
                  var json = JSON.stringify([obj]);
                    $.ajax({
                    url: "/ding/place2book/ticketinfo/ajax/" + json,
                    cache: false,
                    success: function(data){
                        $.each(data,function(index,obj){

                          $('.fastfilter .list-item .views-field-nid .field-content').each(function(index,val){
                              if(obj.nid == val.innerHTML)
                              {
                                      $(val.parentNode.parentNode).find('.content').append("<div class='p2b_event_list_btn_wrap'>" + obj.markup + "</div>");
                                      $(val.parentNode).addClass('js-hide');
                                      $(val.parentNode.parentNode).find("#preloader").addClass('js-hide');
                                      //return;                  
                              }
                          });
                      });
                    }

                  });
        }, 100);
  
    });
}
})(jQuery);
// A $( document ).ready() block.
jQuery( document ).ready(function() {
    var preloader = '<div class="search-overlay--wrapper"><div class="search-overlay--inner"><i class="icon-spinner icon-spin search-overlay--icon"></i><p class="search-overlay--text">' + Drupal.t('Searching please wait...') + '</p><p class="cancel"><a href="#">' + Drupal.t('Cancel') + '</a></p></div></div>';
    jQuery('.search-results').find('a').click(function(e){
        jQuery(preloader).prependTo('body');
    });
    jQuery('.field-type-ting-title').find('a').click(function(e){
        jQuery(preloader).prependTo('body');
    });
    jQuery('.group-material-details .field-group-format-wrapper').find('a').click(function(e){
        jQuery(preloader).prependTo('body');
    });
    //Series are not inside the material details block
    jQuery('.field-name-ting-series').find('a').click(function(e){
        jQuery(preloader).prependTo('body');
    });
    jQuery('.field-name-ting-author').find('a').click(function(e){
        jQuery(preloader).prependTo('body');
    });
    jQuery('.field-name-ting-subjects').find('a').click(function(e){
        jQuery(preloader).prependTo('body');
    });
});