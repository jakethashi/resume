angular
    .module('mscv')
    .controller('MscvCtrl', MscvCtrl);

function MscvCtrl(BASE_URI, REST_API_URI, $rootScope, $http, $location) {
    var vm = this;

    // TODO: populate filters from external service
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

    function initLazyMap(reponse) {
        var gps = reponse.data.contact.address.tags.address.gps;
        $( '.google-map' ).lazyLoadGoogleMaps({
            callback: function( container, map ){
                var $container = $( container ),
                    center = new google.maps.LatLng( 
                        gps.long,
                        gps.lat 
                    );

                map.setOptions({ zoom: 15, center: center });
                new google.maps.Marker({ position: center, map: map });
            }
        });
    }

    function contentDataLoad(reponse) {
        $.extend(vm, reponse.data);
        
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
