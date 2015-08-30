(function() {
    'use strict';

    angular
        .module('mscv')
        .directive('scrollWatch', scrollWatch);

    function scrollWatch(HEADER_MIN_HEIGHT, $window, $rootScope, utils) {
        return function(scope, element, attrs) {
            var $header,
                $navWrapper,
                $emptyHeader,
                $navBar;


            function updateScroll() {
                if (!$header) {
                    $header = $('.header');
                    $navWrapper = $('.nav-wrapper');
                    $navBar = $('#main-navigation-target');
                }

                var scroll = $(window).scrollTop(),
                    isMv = utils.isMobileView();
                            
                var limit = isMv ? 
                    $header.outerHeight() - 2: 
                    $header.outerHeight() - HEADER_MIN_HEIGHT;
                
                var maxHeight = $(document.body).height(),
                    maxContentHeight = $('#main-content').height();// + HEADER_MIN_HEIGHT + limit;
                if (maxContentHeight < 1000) {
                    return;
                }

                if (scroll >= limit) {

                    if (!$header.hasClass('minimal')) {

                        $header.css({ top: -(limit) });
                        $header.addClass('minimal');


                        if (!$('.empty-header').length) {
                            $header.after('<div class="empty-header"></div>');

                            $emptyHeader = $('.empty-header');
                            $emptyHeader.css({ height: isMv ? $header.outerHeight() : 550 });
                        }
                        $navWrapper.addClass('minimal');
                        $emptyHeader.show();

                        if (isMv) {
                            $navWrapper.addClass('mobile-view');
                        }
                    }
                } else {
                    if ($header.hasClass('minimal')) {
                        $header.removeClass('minimal');
                        $emptyHeader.hide();

                        $navWrapper
                            .removeClass('minimal')
                            .removeClass('mobile-view');
                    }
                }
            }

            angular.element($window).bind("scroll", function(event) {
                updateScroll();

                $rootScope.$broadcast('scrollWatch:changed');
                scope.$apply();
            });

            angular.element($window).bind("resize", function(event) {
                updateScroll();
            });
        };
    }
})();


