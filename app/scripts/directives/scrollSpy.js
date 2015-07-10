angular
    .module('mscv')
    .directive('scrollSpy', scrollSpy);

function scrollSpy($window, utils) {
    return function(scope, element, attrs) {
        setTimeout(function() {
            $(element).scrollspy({
                offset: 210
            });
        }, 100);
    };
}