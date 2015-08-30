(function() {
    'use strict';
    
    angular
        .module('mscv')
        .service('utils', utils);

    function utils($q) {
        /*jshint validthis: true */
        
        this.isMobileView = function () {
            return $('.navbar-toggle').is(':visible');
        };

        this.toPromise = function (args, condition) {
            var deferred = $q.defer();

            if (typeof condition === 'function') {
                condition.call(this, deferred, args);
            } else {
                deferred.resolve({
                    success: false
                });
            }
            return deferred.promise;
        };
    }    
})();
