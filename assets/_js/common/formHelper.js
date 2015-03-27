var OLCS = OLCS || {};

OLCS.formHelper = (function(document, $, undefined) {

  "use strict";

  /**
   * the class we apply to a hidden input used to
   * simulate which button was clicked when submitting
   * a form
   */
  var formClickAction = "form__action";

  var errorSelectors = [
    ".validation-summary",
    ".validation-wrapper"
  ];

  var warningSelector = ".notice--warning";

  /**
   * Expose a jQuery-esque function which tries to work
   * out which actual public property to invoke purely
   * based off argument length. Pretty crude, but a
   * handy shorthand
   */
  var exports = function() {
    switch (arguments.length) {
      case 1:
        return exports.fieldset.apply(null, arguments);
      case 2:
        return exports.input.apply(null, arguments);
    }
  };

  /**
   * public interface
   */
  exports.fieldset = function(selector) {
    return $("html").find("fieldset[data-group='" + selector + "']");
  };

  exports.input = function(fieldset, name) {
    return $("html").find("[name=" + fieldset + "\\[" + name + "\\]]");
  };

  exports.findInput = function(fieldset, name) {
    return exports
    .fieldset(fieldset)
    .find("[name*=\\[" + name + "\\]]");
  };

  // @TODO: make this work with string selectors, not just objects
  exports.pressButton = function(form, button) {
    var actionValue = button.val();
    var actionName  = button.attr("name");

    form.find("." + formClickAction).remove();
    form.prepend("<input class='" + formClickAction + "' type=hidden name='" + actionName + "' />");
    form.find("." + formClickAction).val(actionValue);
  };

  exports.buttonPressed = function(form, name) {
    var actionName = form.find("." + formClickAction).attr("name");
    return (typeof actionName === "string" && actionName.indexOf(name) !== -1);
  };

  exports.isChecked = function(fieldset, name, value) {
    if (value === undefined) {
      value = "Y";
    }

    return exports.input(fieldset, name)
    .filter(":checked")
    .val() === value;
  };

  exports.containsErrors = function(payload) {
    for (var i = 0, j = errorSelectors.length; i < j; i++) {
      if (exports.containsElement(payload, errorSelectors[i])) {
        return true;
      }
    }

    return false;
  };

  exports.containsWarnings = function(payload) {
    return exports.containsElement(payload, warningSelector);
  };

  exports.containsElement = function(payload, selector) {
    if (typeof payload === "string") {
      // assume the payload needs a container if it's just a string
      payload = $("<div>" + payload + "</div>");
    }

    return payload.find(selector).length > 0;
  };

  exports.clearErrors = function(context) {
    // context can be null, hence why we don't use $(context).find()
    $(".validation-summary", context).remove();
    $(".validation-wrapper ul:first-child", context).remove();
    $(".validation-wrapper", context).removeClass("validation-wrapper");
  };

  exports.render = function(container, body) {
    // the fact we redraw means we sometimes lose our
    // scroll position; so cache it and re-apply it immediately after render
    var scrollTop = $(window).scrollTop();
    $(container).html(body);
    $(window).scrollTop(scrollTop);

    OLCS.eventEmitter.emit("render");
  };

  exports.selectRadio = function(fieldset, name, value) {
    exports.input(fieldset, name)
    .filter("[value='"+value+"']")
    .prop("checked", true)
    .change();
  };

  /**
   * find a container or element based on a group (i.e. a fieldset)
   * and selector. Takes a special asterisk(*) argument to represent
   * the group itself rather than a child
   */
  exports.findContainer = function(form, group, selector) {
    if (selector === "*") {
      return exports.fieldset(group);
    }

    var parts;

    if (selector.search(":") !== -1) {

      parts = selector.split(":");

      switch (parts[0]) {
        case "label":
          // @NOTE: we make some assumptions about the markup surrounding labels
          // feel free to update as and when
          return form.find("label[for=" + parts[1] + "]").parents(".field");
        case "selector":
          return form.find(parts[1]);
        case "date":
          return form.find("[name*=" + parts[1] + "]").parents(".field");
        case "parent":
          return form.find(parts[1]).parent();
        default:
          throw new Error("Unsupported left-hand selector: " + parts[0]);
      }
    }

    if (selector.search("=") !== -1) {

      // assume a name=value pair specifies a radio button with a given value
      parts = selector.split("=");

      // @TODO `group` isn't always right here; it can be an arbitrary selector
      // not just a data-group=xxx name. This needs fixing at some point
      return exports.findInput(group, parts[0])
      .filter("[value=" + parts[1] + "]")
      // radios are always wrapped inside a label
      .parents("label:last");

    }

    // otherwise assume a straight input name which we assume is inside a field container
    return exports.findInput(group, selector).parents(".field");
  };

  return exports;

}(document, window.jQuery));
