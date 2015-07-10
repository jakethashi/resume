angular
    .module('mscv')
    .controller('MainNavCtrl', MainNavCtrl);

function MainNavCtrl() {
    this.navItemClick = function($event) {
        $event.preventDefault();
        new WOW().init();
    };
}