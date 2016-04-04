var OLCS = OLCS || {};

/**
 * Select Dropdown
 *
 * Truncate the text in long select dropdowns to allow them
 * to fit within their parent
 */

  OLCS.selectDropdown = (function(document, $, undefined) {

  'use strict';

  return function init(custom) {

    var options = $.extend({

      selector : '#fields\\[siPenaltyType\\]',
      truncate : 100

    }, custom);

    // Run the code on each "render" of the page
    OLCS.eventEmitter.on('render', function() {
      
      // Get the dropdown items
      var items = $(options.selector).find('option');
      
      // Calculate how many characters wide the parent is
      var parentWidth = $(options.selector).parent().width();
    
      items.each(function() {
        // Get the current content
        var content = $(this).html();
        // apply as title attribute
        $(this).attr('title', content);
        // truncate option HTML
        if (content.length > options.truncate) {
          content = $.trim(content).substring(0, options.truncate).trim(this) + "...";
          $(this).text(content);
        }
      });
    
    });

  };

}(document, window.jQuery));