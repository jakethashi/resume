angular
    .module('mscv')
    .controller('MscvLearnMoreCtrl', MscvLearnMoreCtrl);

function MscvLearnMoreCtrl(BASE_URI, REST_API_URI, $rootScope, $http, $location) {
    var vm = this;
    
    $('.logo').css({  opacity: 1 });
    new WOW().init();
}