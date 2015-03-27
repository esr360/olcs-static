var OLCS = OLCS || {};

/**
 * OLCS.revealForm
 */

OLCS.revealForm = (function(document, $, undefined) {

  "use strict";

  return function init(options) {
    var selector = options.form || "form";
    var form = $(selector);
    var onSubmit = options.submit;
    var errorWrapper = options.errorWrapper || ".validation-wrapper";

    /**
     * Iterate over the form, checking the relevant rulesets.
     *
     * We generally expect each ruleset to apply to a fieldset
     * but allow for exceptions. Once we've found a fieldset or
     * element, we invoke its predicate which can either be a
     * bool or function
     */
    function checkForm() {
      for (var fieldset in options.rulesets) {
        var ruleset = options.rulesets[fieldset];

        // if the rule value is a string or a function then assume
        // it applies to the fieldset as a whole
        if (!$.isPlainObject(ruleset)) {
          triggerRule(fieldset, "*", ruleset);
          continue;
        }

        // if the value was an object, iterate its key/vals and trigger
        // a rule on each of them, bound to the outer fieldset
        for (var selector in ruleset) {
          var rule = ruleset[selector];
          triggerRule(fieldset, selector, rule);
        }
      }
    }

    /**
     * invoke a rule against an element or fieldset. The
     * end result will be the showing or hiding of the
     * relevant element
     *
     * Usually traverses up the DOM tree to see if the matched container
     * itself sits within an error message and treats that as the parent
     * if so; although currently there are exceptions to this
     */
    function triggerRule(group, selector, rule) {
      var show;
      var elem;
      var action;

      if ($.isFunction(rule)) {
        show = rule.call(form);
      } else {
        show = rule;
      }

      elem = OLCS.formHelper.findContainer(form, group, selector);

      // are we currently sat inside a validation error wrapper? If
      // so that becomes the top-level element
      // note that key=val selectors are an exception to this rule
      // and as such we never check their containers
      if (selector.search("=") === -1 && elem.parents(errorWrapper).length) {
        elem = elem.parents(errorWrapper);
      }

      if (show && elem.is(":hidden")) {
        action = "show";
      } else if (!show && elem.is(":visible")) {
        action = "hide";
      }

      if (action) {
        elem[action]();
        OLCS.eventEmitter.emit(action + ":" + group + ":" + selector);
      }
    }

    if (onSubmit) {
      // we'd like to use bind, but IE8 won't let us
      form.on("submit", function(e) {
        onSubmit.call(form, e);
      });
    }

    checkForm();

    form.on("change", checkForm);
  };

}(document, window.jQuery));
