/**
 * Created by syzer on 4/21/2015.
 */
'use strict';

angular
    .module('logDecorator', ['underscoreDecorator'])
    .config(function ($provide) {
        // Use the `decorator` solution to substitute or attach behaviors to
        // original service instance; @see angular-mocks for more examples....

        $provide.decorator('$log', function ($delegate, _) {
            // Save the original $log.debug()
            var debugFn = $delegate.debug;

            $delegate.debug = function debug(caller) {
                var args = [].slice.call(arguments),
                    now = new Date().toISOString();
                //controller = caller || '';

                // Prepend timestamp
                args[0] = [now, args[0]];
                //args =  [controller, now, args];

                // Call the original with the output prepended with formatted timestamp
                debugFn.apply(null, args);
            };

            $delegate.setController = function (caller) {
                return _.partialRight($delegate.debug, caller);
            };

            return $delegate;
        });
    })
    // logs inputs to function
    .factory('logIn', function ($log) {
        return function makeLogging(log, f) {
            function wrapper() {
                log(f.name, arguments);
                return f.apply(this, arguments);
            }

            return wrapper;
        };
    });
