var OLCS = OLCS || {};

/**
 * OLCS.cascadeForm
 *
 * This component should be bound to a form in which each section
 * (usually defined by a top-level fieldset) relates to the one which
 * follows it; that is the content of the following fieldset is affected
 * in some way by the input received in the current one.
 *
 * @FIXME: this component needs to use event delegation and stop caching
 * a reference to a form object.
 */

OLCS.cascadeForm = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var previousFieldset;
    var selector = options.form || "form";
    var form = $(selector);

    /**
     * by using a closure we ensure this function is safe
     * to bind inside loops etc
     */
    function clearFieldset(target) {
      /**
       * the actual event handler simply finds all inputs in the
       * target fieldset and clears them out
       *
       * @TODO only checkboxes and radios are supported at the moment, easy to
       * change though
       */
      return function clear() {
        var elems = $(target).find(":input");
        $.each(elems, function(i, elem) {
          elem = $(elem);
          if (elem.is(":checked")) {
            elem.removeAttr("checked");
          }
        });
        // ensure the change notification cascades down the line
        $(target).trigger("change");
      };
    }

    /*
     * first things first, find the top-level fieldsets and bind some
     * handlers such that when they change, the event cascades to
     * all subsequent fieldsets emptying them out
     */
    for (var fieldset in options.rulesets) {
      var current = OLCS.formHelper.findContainer(form, fieldset, "*");
      if (previousFieldset) {
        $(previousFieldset).on(
          "change",
          clearFieldset(current)
        );
      }
      previousFieldset = current;
    }

    return OLCS.revealForm(options);
  };

}(document, window.jQuery));
