(function() {
    'use strict';

    module.exports = function() {
      return { extend: extend };

      function extend(delay) {
        delay = delay || 500;

        console.log('slow down protractor tests by: ' + delay + 'ms');

        var origFn = browser.driver.controlFlow().execute;

        browser.driver.controlFlow().execute = function() {
          var args = arguments;
          // queue 100ms wait
          origFn.call(browser.driver.controlFlow(), function() {
            return protractor.promise.delayed(delay);
          });

          return origFn.apply(browser.driver.controlFlow(), args);
        };
      }
    }

})();
