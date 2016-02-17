var OLCS = OLCS || {};

/**
 * OLCS.idleModal
 *
 * Alert a message to let users know that they will soon be automatically
 * logged out if they continue to be idle
 * 
 * grunt test:single --target=idleModal
 */

  OLCS.idleModal = (function(document, $, undefined) {

  'use strict';

  return function init(custom) {
    
    var defaults = {
      inactivityTime      : 4.05,
      inactivityRemaining : 4,
      countdownTimer      : '#countdownTimer',
      countdownAlert      : '#countdownAlert',
      modalTitle          : 'You will soon be logged out',
      modalMessage        : 'Due to inactivity you will soon be automatically logged out. To remain logged in, simply dismiss this alert message.',
      dismissMessage      : 'Dismiss',
      alertMessage        : 'Time Left To Save',
      loggingOutMessage   : 'Logging Out...'
    }
    
    var options = $.extend({}, defaults, custom || {});
    
    // Options
    var inactivityTime      = options.inactivityTime;
    var inactivityRemaining = options.inactivityRemaining;
    
    // Convert the passed time's to appropriate units
    inactivityTime = inactivityTime - inactivityRemaining;
    inactivityTime = inactivityTime * 1000 * 60;
    inactivityRemaining = inactivityRemaining * 60;
    
    // Cache the variable which will store allowed idle time remaining
    var idleTime;
    
    // Get the raw selectors to render the HTML
    var timerSelector = options.countdownTimer.substring(1);
    var alertSelector = options.countdownAlert.substring(1);
    
    // Convert the inactivity remaining time (minutes) into HH:MM:SS
    var totalSec = inactivityRemaining;
    var hours = parseInt(totalSec/3600) % 24;
    var minutes = parseInt(totalSec/60) % 60;
    var seconds = totalSec % 60;
    var result = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds  < 10 ? '0' + seconds : seconds);
    
    // Create the HTML content for the idle modal
    var idleTemplate = [
      '<p>' + options.modalMessage + '</p>',
      '<h2 id="' + timerSelector + '" data-seconds="' + inactivityRemaining + '">' + result + '</h2>',
      '<div id="' + alertSelector + '" role="alert" aria-live="assertive" class="visually-hidden"></div>',
      '<p><button class="action--primary" id="idlePopupDismiss">' + options.dismissMessage + '</button></p>'
    ].join('\n');
    
    // Inject an updated countdown for screen readers every 60 seconds
    function countdownInject() {
      
      // Check each second whether the content needs updating 
      setTimeout(function(){ 
        
        // Update the content every minute
        setInterval(function() {
          
          // Get the current time left
          var timeLeft = $(options.countdownTimer).text();
          
          // Append to the hidden screen-reader div
          $(options.countdownAlert).html(options.alertMessage + ' : ' + timeLeft);
          
        }, 1000 * 60); 
        
      }, 1000);
      
    }
    
    function counter() {
      
      // Each second update the visual countdown
      var updateCountdown = setInterval(function() {
          
        // Get the original total time of the countdown
        var seconds = $(options.countdownTimer).data('seconds');
        
        // If we still have some time left
        if (seconds > 0) {
          
          var second = seconds - 1;
          
          $(options.countdownTimer).data('seconds', second);
          
          var date = new Date(null);
          
          date.setSeconds(second); 
          
          $(options.countdownTimer).html(date.toISOString().substr(11, 8));
          
        } else {
          $(options.countdownTimer).html(options.loggingOutMessage);
        }
        
      }, 1000);
      
      countdownInject();
      
      // We need to stop the setInterval from accumulating after each modal close
      OLCS.eventEmitter.on('hide:modal', function() {
        clearInterval(updateCountdown);
      });
      
    }

    // Function to appropriately show the idle modal
    function alertLogout() {
      // If a (read: the) modal is not already open, open it
      if ($('.modal').length === 0) {
        OLCS.modal.show(
          idleTemplate, options.modalTitle
        );
        // Start the counter when the modal opens
        counter();
      }
    }

    // Function to reset the idle timer if user becomes un-idle
    function resetTimer() {
      clearTimeout(idleTime);
      idleTime = setTimeout(alertLogout, inactivityTime);
    }
    
    window.onload        = resetTimer; // reset on page load
    document.onmousemove = resetTimer; // reset if mouse moves
    document.onkeypress  = resetTimer; // reset if button pressed
    
    // reset if modal closes
    OLCS.eventEmitter.on('hide:modal', resetTimer);
    
    // Close modal on dismiss button click
    $('#idlePopupDismiss').click(function() {
      OLCS.modal.hide();
    });
    
  };

}(document, window.jQuery));