angular
    .module('mscv')
    .directive('smoothNavigation', smoothNavigation);

function smoothNavigation(HEADER_MIN_HEIGHT, HEADER_NAV_MIN_HEIGHT, utils) {
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
}