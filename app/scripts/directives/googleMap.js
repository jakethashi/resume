(function() {
    'use strict';
    
    angular
        .module('mscv')
        .directive('googleMap', googleMap);

    function googleMap() {
        return function(scope, element, attrs) {
            var gps = scope.$parent.mscvCtrl.ds.content.contact.address.tags.address.gps;
            $(element).lazyLoadGoogleMaps({
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
        };
    }
})();
