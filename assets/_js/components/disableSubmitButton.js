var OLCS = OLCS || {};

/**
 * OLCS.disableForm
 * 
 * Tools to provide disabling buttons and changing submit button 
 * text when form is submitted
 */

OLCS.disableForm = (function(document, $, undefined) {

  'use strict';

  return function init(custom) {

    var options = $.extend({
      submit    : '[type="submit"], .js-modal-ajax',
      loadText  : 'loading...',
      preloader : false 
    }, custom);
    
    // Create a variable to store the submit button text
    var submitText;
      
    function disableFormSubmit() {
      
      // When a submit button is clicked
      $(options.submit).on('click', function() {
        
        // Get only the immediate form relating to the clicked target
        var thisForm = $(this).parents('form:first');
    
        // Set appropriate button replacement message
        // If clicked element has attirbute 'data-onclick-become',
        // use that, otherwise use the default message
        var dataLoadText = $(this).attr('data-onclick-become');
        var loadText = dataLoadText ? dataLoadText : options.loadText;
        
        // Add class to identify the clicked submit button
        $(this).addClass('submit-clicked');
        
        // Cache the clicked button's original text
        submitText = $(this).html();
      
        // Disable all the submit buttons in the current form and show
        // a preloader, only after the form has actually been submitted
        thisForm.submit(function() {
          thisForm.find(options.submit).each(function() {
            // visually disable the button
            $(this).addClass('disabled');
            // simulate a disabled button
            $(this).click(function() {
              return false;
            });
          }); 
          if (options.preloader) {
            OLCS.preloader.show('modal');
          }
        });
        
        // Replace the clicked button text with an appropriate message
        // If no message is set, the button text will remain as normal
        if (loadText !== undefined) {
          if ($(this).is('button', 'a')) {
            $(this).html(loadText);
          } else if ($(this).is('input')) {
            $(this).val(loadText);
          }
        }
        
      });
    
    }
    
    // Revert buttons to their original state
    function revertFormSubmit() {
      
      // Re-enable all the submit buttons in the current form
      $(submit).removeClass('disabled');
      
      // Replace the loading text with the original text
      $('.submit-clicked').html(submitText).removeClass('submit-clicked');
      
    }
    
    // Ensure the function will always work on page re-rendering
    OLCS.eventEmitter.on('render', disableFormSubmit);
    
    // If submitting the form opens a modal instead of loading a new 
    // page, we need to revert the buttons to their original state,
    // ready for when the modal closes   
    OLCS.eventEmitter.on('show:modal', revertFormSubmit);
    
  };

}(document, window.jQuery));