(function() {
    'use strict';
    
    angular
        .module('mscv')
        .directive('activeFilter', activeFilter);

    function activeFilter(utils) {
        return {
            scope: {
                skillFilterSelect: '@',
            },
            controller: function ($scope, $element, $attrs) {
                $attrs.$observe('skillfilterselect', function(passedId) {
                    var el = $element;
                });
            }
        };
    }
})();
