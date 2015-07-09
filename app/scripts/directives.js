angular
    .module('mscv')
    .directive('scrollWatch', [
        'HEADER_MIN_HEIGHT',
        '$window',
        '$rootScope',
        'utils',
        function(
            HEADER_MIN_HEIGHT,
            $window, 
            $rootScope, 
            utils
        ) 
    {
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
    }])
    .directive('scrollSpy', [
        '$window',
        'utils',
        function(
            $window,
            utils
        ) 
    {
        return function(scope, element, attrs) {
            setTimeout(function() {
                $(element).scrollspy({
                    offset: 210
                });
            }, 100);
        };
    }])

    .directive('smoothNavigation', [
        'HEADER_MIN_HEIGHT',
        'HEADER_NAV_MIN_HEIGHT',
        'utils',
        function(
            HEADER_MIN_HEIGHT,
            HEADER_NAV_MIN_HEIGHT,
            utils
        ) 
    {
        return function(scope, element, attrs) {
            
            var $header = $('.header'),
                $navBar = $('#main-navigation-target');

            angular.element(element).bind("click", function(event) {
                var isMv = utils.isMobileView();
                // hide main navbar in case of mobile view
                var $link = $(element),
                    navTag = $link.attr('href'),
                    delay = parseInt(attrs.smoothNavigationDelay);

                // is mobile view and link is part of main navigation
                if (isMv && $navBar.has($link).length) {			
                    utils.toPromise([$navBar], function(promise) {
                        function navbarCollapsed() {
                            $navBar.off('hidden.bs.collapse');
                            promise.resolve();
                        }

                        $navBar.on('hidden.bs.collapse', navbarCollapsed);
                        $navBar.collapse('hide');
                    }).then(function() {
                        if (!delay) {
                            scrollToPage();    
                        } else {
                            setTimeout(scrollToPage, delay);
                        }
                        
                    });
                } else {
                    if (!delay) {
                        scrollToPage();    
                    } else {
                        setTimeout(scrollToPage, delay);
                    }
                }

                function scrollToPage() {
                    // scroll to desired area
                    var duration = 2000,
                        $navContent = $(navTag);

                    if (!$navContent.length) {
                        utils.msg('anchor doesnt exists');
                        return;
                    }

                    var scrollTop = $navContent.offset().top;


                    // select active nav item
                    $link
                        .closest('ul')
                        .find('.active')
                        .removeClass('active');

                    $link.parent()
                        .addClass('active');

                    var mainNavHeigt = $('#main-navigation').height();

                    if ($header.hasClass('minimal')) {
                        scrollTop -= isMv ? mainNavHeigt : HEADER_MIN_HEIGHT + (mainNavHeigt / 2);
                    } else {
                        scrollTop -= isMv ? 
                            $('.header').height() - mainNavHeigt + (mainNavHeigt / 2) : 
                            $('.header').outerHeight() - HEADER_NAV_MIN_HEIGHT;// + mainNavHeigt / 2;
                    }

                    $('html, body').stop().animate({
                        scrollTop: scrollTop
                    }, duration, 'easeInOutExpo');
                }

                event.preventDefault();
            });
        };
    }])
    .directive('activeFilter', [
        'utils',
        function(
            utils
        ) 
    {

        return {
            // default filter
            /*if (!scope.skillFilterSelect && !scope.item.type) {
                $(element).addClass('btn-active');
            } else {
                $(element).removeClass('btn-active');
            }*/

            scope: {
                skillFilterSelect: '@',
            },
            controller: function ($scope, $element, $attrs) {
                $attrs.$observe('skillfilterselect', function(passedId) {
                    var el = $element;
                });
            }
        };
    }])
    .directive('googleMap', [function() {
        return function(scope, element, attrs) {
            var gps = scope.$parent.mscvCtrl.contact.address.tags.address.gps;
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
    }]);
