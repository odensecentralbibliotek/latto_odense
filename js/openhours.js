(function($){
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
        self.isselfService = false;
        self.CurrentOpenInstanceIndex = -1;
        self.options = options;

        self.date = options.date;
        self.nid = options.nid;

        // The status is always updated every 10 seconds. This does not
        // remote calls, and is not computationally intensive, so it should
        // not be a burden on either server or client.
        self.updateInterval = window.setInterval(self.update, 10000);
        
        //Added Next/previous hooks. Appending original ones.
        var tmp = $('.opening-hours-week[data-nid="'+ self.nid +'"]').find('.prev');
        tmp.click(self.goToPreviousWeek);

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
        var instances, isselfService = false;
        self.CurrentOpenInstanceIndex = -1;
        
        // Get opening hours instances for the date in question.
        instances = Drupal.OpeningHours.dataStore[self.nid][self.date.getISODate()] || [];
        
        $.each(instances, function (index,value) {
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
          self.CurrentOpenInstanceIndex = index; //Log the index of the open instance.
          if (this.notice) {
            isselfService = true;
          }
        }
      });
          
          self.isselfService = isselfService;
          self.isOpen = isOpen;
        };
    //Get a week number from date.    
    self.getWeekNumber = function(d) {
        // Copy date so don't modify original
        d = new Date(+d);
        d.setHours(0,0,0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setDate(d.getDate() + 4 - (d.getDay()||7));
        // Get first day of year
        var yearStart = new Date(d.getFullYear(),0,1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
        // Return array of year and week number
        return [d.getFullYear(), weekNo];
    }    
    // Render the current opening status.
      self.render = function () {
        
        if (Drupal.OpeningHours.dataStore[self.nid]) {
          self.calculateOpenStatus();
          
            //Added color coding for open now. 
            var date = new Date();
            var weekday=new Array("Sunday","Monday","Tuesday" ,"Wednesday","Thursday","Friday","Saturday");
            var OpenHoursCurrentNode = $('.opening-hours-week[data-nid="'+ self.nid +'"] .name');
            $(OpenHoursCurrentNode).each(function( ) {
              if ($(this).text() === Drupal.t(weekday[date.getDay()])){
                //Set Day name Css.
                $(this).css('font-weight','bold').css('font-size','14px');
                var tmp = $(this).next();
                $(".name").css('color','#555555');   
                
                if(tmp.children.length == 0 || self.CurrentOpenInstanceIndex == -1)
                {
                    //There is no children. And we did not find a open timeslot.
                    tmp.css('font-size','14px').css('font-weight','bold');
                    $.each(tmp.children(),function(index,obj){
                        $(obj).css('font-size','14px').css('font-weight','bold');
                    });
                    return;
                }
                $.each(tmp.children(),function(index,obj){
 
                        if(index == self.CurrentOpenInstanceIndex)
                        {
                            //timeslot Found
                            $(obj).css('font-size','14px').css('font-weight','bold');
                        }
                        else
                        {
                            $(obj).css('color','#555555').css('font-size','13px').css('font-weight','normal');
                        }
                });
              }
              
            });
        }

        // Add our element to the DOM, if neccessary.
        if (!self.el) {
          self.el = $('<div class="library-openstatus"></div>');
          self.el.appendTo($(self.options.container).parent().siblings('.field-name-field-ding-library-list-image').find('.field-items'));
          
          // Save the view instance for later reference.
          self.el.data('statusIndicatorInstance', self);
        }
        if ((self.isselfService) && (self.isOpen)) {
          self.el.removeClass('closed');
          self.el.removeClass('open');
          self.el.addClass('self-service');        
          self.el.text(Drupal.t('open without service.'));
      }
       else if (self.isOpen && !(self.isselfService)) {
          self.el.removeClass('self-service');
          self.el.removeClass('closed');
          self.el.addClass('open');
          self.el.text(Drupal.t('Open'));
        }
        else {
          self.el.addClass('closed');
          self.el.removeClass('open');
          self.el.removeClass('self-service');
          self.el.text(Drupal.t('Closed'));
        }

        // Trigger an evert so other scripts can react to the change.
        $(window).trigger('DingLibraryStatusChange', [self.nid, self.isOpen, self.isselfService]);
         
          
      };

      // Update our display with a new date value.
      self.update = function (date) {
          
        var currentState = self.isOpen;
        var currentState = self.isselfService;

        // Make sure we have a proper date object (Firefox gives us a
        // lateness parameter, where we'd normally get undefined).
        var OpenHoursCurrentWeek = $('.opening-hours-week[data-nid="'+ self.nid +'"] .header .week_num').html();
        var NowWeek = self.getWeekNumber(self.date);
        
        //Check if the date is the current one. if not skip rendering open instance marker.
        if(NowWeek[1] != OpenHoursCurrentWeek)
        {
            return;
        }

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
        // If state changed, re-render.
        if (currentState !== self.isselfService) {
          self.render();
        }
      };

        self.goToPreviousWeek = function (event) {
            
       //If disabled we are back @ original date.
      if ($(this).hasClass('disabled')) {
        self.render();
        return false;
      }

      event.preventDefault();
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