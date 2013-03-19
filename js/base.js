(function($){
 
  $(document).ready(function($) {
    
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


 Drupal.behaviors.resetSearch = {
    attach: function(context) {
  $("#reset").click(function(){
    $("#search-form select, #search-form input[type=text]").each(function() {
      $(this).val("");
    });
  });
}
  };
  
  
    /**
 * @file
 * JavaScript behavior to update library open/closed status dynamically.
 */


 

  // Prototype for library opening status indicators.
  Drupal.DingLibraryStatusIndicator = function (options) {
    var self = this;

    // Constructor for the updater.
    self.constructor = function () {
      self.isOpen = false;
      self.options = options;

      self.date = options.date;
      self.nid = options.nid;

      // The status is always updated every 10 seconds. This does not
      // remote calls, and is not computationally intensive, so it should
      // not be a burden on either server or client.
      self.updateInterval = window.setInterval(self.update, 10000);

      return self;
    };

    // Helper function to split time string into numbers.
    self.splitTime = function (time) {
      var parts = time.split(':');

      if (parts.length === 2) {
        return {
          hours: parseInt(parts[0], 10),
          minutes: parseInt(parts[1], 10)
        };
      }
    };

    // Recalculate opening status for a library.
    // Returns true if library is open, false if not.
    self.calculateOpenStatus = function () {
      var instances, isOpen = false;

      // Get opening hours instances for the date in question.
      instances = Drupal.OpeningHours.dataStore[self.nid][self.date.getISODate()] || [];

      $.each(instances, function () {
        var open = self.splitTime(this.start_time),
            close = self.splitTime(this.end_time),
            hours = self.date.getHours(),
            minutes = self.date.getMinutes();

        // Now we have all the data we need, figure out if we're open.
        if ((hours > open.hours ||
            hours === open.hours && minutes >= open.minutes) &&
            (hours < close.hours ||
            hours === close.hours && minutes < close.minutes)) {
         isOpen = true;
        }
      });

      self.isOpen = isOpen;
    };

    // Render the current opening status.
    self.render = function () {
      if (Drupal.OpeningHours.dataStore[self.nid]) {
        self.calculateOpenStatus();
      }

      // Add our element to the DOM, if neccessary.
      if (!self.el) {
        self.el = $('<div class="library-openstatus"></div>');
        self.el.appendTo($(self.options.container).parent().siblings('.field-name-field-ding-library-list-image').find('.field-items'));

        // Save the view instance for later reference.
        self.el.data('statusIndicatorInstance', self);
      }

      if (self.isOpen) {
        self.el.removeClass('closed');
        self.el.addClass('open');
        self.el.text(Drupal.t('Open'));
      }
      else {
        self.el.addClass('closed');
        self.el.removeClass('open');
        self.el.text(Drupal.t('Closed'));
      }

      // Trigger an evert so other scripts can react to the change.
      $(window).trigger('DingLibraryStatusChange', [self.nid, self.isOpen]);
    };

    // Update our display with a new date value.
    self.update = function (date) {
      var currentState = self.isOpen;

      // Make sure we have a proper date object (Firefox gives us a
      // lateness parameter, where we'd normally get undefined).
      if (!_.isDate(date)) {
        date = new Date();
      }

      // Overwrite the date and recalculate status.
      self.date = date;
      self.calculateOpenStatus();

      // If state changed, re-render.
      if (currentState !== self.isOpen) {
        self.render();
      }
    };

    return self.constructor();
  };

  // Set up our status indicators when the document is loaded.
  $(window).bind('OpeningHoursLoaded', function () {
    var date = new Date();

    // Set up DingLibraryStatusIndicator instances for each presentation
    // present on the page.
    $('.opening-hours-week').each(function () {
      var indicator = new Drupal.DingLibraryStatusIndicator({
        container: this,
        date: date,
        nid: parseInt($(this).attr('data-nid'), 10)
      });

      indicator.render();
    });
  });  
  
  
  
  

 
  
  
  

})(jQuery);
