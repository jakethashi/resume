(function() {
    'use strict';
    
    angular
        .module('mscv')
        .controller('MscvCtrl', MscvCtrl);

    function MscvCtrl($scope, skills, dataservice, globals) {
        console.log('create main controller');

        var vm = this;
        vm.skillFilter = skills.skillFilter;

        vm.skillFilterSelect = '';
        vm.skillItemsLimit = globals.skillItemsLimit;
        vm.isLogoVisible = false;

        dataservice.getAppContent($scope)
          .then(contentDataLoad);

        function contentDataLoad(response) {
            console.log('content data loaded', response);

            $.extend(vm, response);
           
            vm.isLogoVisible = true;
            new WOW().init();
        }

        vm.filterSkills = function($event) {
            var type = $($event.target).attr('data-type');
            vm.skillFilterSelect = type;
        };

        vm.skillsShowMoreLess = function() {
            if (vm.skillItemsLimit === globals.skillItemsLimit) {
                vm.skillItemsLimit = 1000;
            } else {
                vm.skillItemsLimit = globals.skillItemsLimit;
            }
        };
    }
})();