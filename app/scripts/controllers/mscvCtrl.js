angular
    .module('mscv')
    .controller('MscvCtrl', MscvCtrl);

function MscvCtrl($http, REST_API_URI, skills) {
    var vm = this;

    vm.skillFilter = skills.skillFilter;

    vm.skillFilterSelect = '';
    vm.skillItemsLimit = 10;

    $http.get(REST_API_URI + 'content.js')
      .then(contentDataLoad)
      .catch(contentDataError);

    function contentDataLoad(response) {
        $.extend(vm, response.data);
       
        $('.logo').css({  opacity: 1 });
        new WOW().init();
    }

    function contentDataError() {
        console.log('error while getting a data');
    }

    vm.filterSkills = function($event) {
        var type = $($event.target).attr('data-type');
        vm.skillFilterSelect = type;
    };

    vm.skillsShowMoreLess = function() {
        if (vm.skillItemsLimit === 10) {
            vm.skillItemsLimit = 1000;
        } else {
            vm.skillItemsLimit = 10;
        }
    };
}
