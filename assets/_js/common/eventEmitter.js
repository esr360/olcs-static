var OLCS = OLCS || {};

/**
 * EventEmitter
 */

OLCS.eventEmitter = (function(document, $, undefined) {

  "use strict";

  var handlerId = 0;

  var exports = {
    listeners: {},

    on: function(event, handler) {
      OLCS.logger.debug("on: " + event, "eventEmitter");

      if (!exports.listeners[event]) {
        exports.listeners[event] = [];
      }

      exports.listeners[event].push({
        fn: handler,
        id: ++handlerId
      });

      return handlerId;
    },

    once: function(event, handler) {
      var id = exports.on(event, function() {
        handler.apply(exports, arguments);
        exports.off(event, id);
      });
    },

    off: function(event, id) {
      OLCS.logger.debug("off: " + event, "eventEmitter");

      for (var i = 0, j = exports.listeners[event].length; i < j; i++) {
        var target = exports.listeners[event][i];
        if (target.id === id) {
          exports.listeners[event].splice(i, 1);
          return;
        }
      }
    },

    emit: function(event, args) {
      OLCS.logger.debug("emit: " + event, "eventEmitter");

      if (!exports.listeners[event]) {
        return;
      }

      for (var i = 0, j = exports.listeners[event].length; i < j; i++) {
        var handler = exports.listeners[event][i];

        // we might have > 1 listeners but they might have called
        // 'off' which will truncate the array, so allow for handler
        // no longer existing
        if (handler) {
          handler.fn.apply(exports, args || []);
        }
      }
    }
  };

  return exports;

}(document, window.jQuery));
