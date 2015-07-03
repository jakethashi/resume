angular
    .module('mscv')
    .controller('MscvMainCtrl', [
        'BASE_URI',
        'REST_API_URI', 
        '$rootScope', 
        '$http', 
        '$location',
        function(
            BASE_URI, 
            REST_API_URI, 
            $rootScope, 
            $http, 
            $location
        ) 
    {
        var vm = this;
    }])
    .controller('MscvLearnMoreCtrl', [
        'BASE_URI',
        'REST_API_URI',
        '$rootScope',
        '$http',
        '$location',
        function(
            BASE_URI, 
            REST_API_URI, 
            $rootScope, 
            $http, 
            $location
        ) 
    {
        var vm = this;
        
        $('.logo').css({  opacity: 1 });
        new WOW().init();        
    }])
    .controller('MscvCtrl', [
        'BASE_URI',
        'REST_API_URI',
        '$rootScope',
        '$http',
        '$location',
        function(
            BASE_URI, 
            REST_API_URI, 
            $rootScope, 
            $http, 
            $location
        ) 
    {
        var vm = this;

        vm.skillFilter = [{
            title: 'All',
            type: ''
        }, {
            title: 'Front-end',
            type: 'frontEnd'
        }, {
            title: 'Back-end',
            type: 'backEnd'
        }, {
            title: 'Frameworks',
            type: 'frameworks'
        },{
            title: 'Libraries',
            type: 'libraries'
        }, {
            title: 'Design',
            type: 'design'
        }, {
            title: 'Tools',
            type: 'tools'
        }];

        vm.skillFilterSelect = '';
        vm.skillItemsLimit = 10;

        $http.get(REST_API_URI + 'content.js')
          .then(contentDataLoad)
          .catch(contentDataError);

        function contentDataLoad(reponse) {
            $.extend(vm, reponse.data);
            
            $('.logo').css({  opacity: 1 });
            
            //$('.logo').removeClass('loading');            
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


        //$.extend(vm, content);
    }])
    .controller('ModalController', [
        '$modalInstance',
        function(
            $modalInstance
        ) 
    {
        var vm = this;

        vm.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        vm.errorDetail = 'nejaka chyba';
    }])
    .controller('MainNavCtrl', function() {
        this.navItemClick = function($event) {
            $event.preventDefault();
            new WOW().init();
        };
    });