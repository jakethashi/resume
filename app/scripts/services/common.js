(function() {
    'use strict';
	
	angular
	    .module('mscv')
	    .factory('common', common);

	function common() {
	    var consoleAvaliable = true;
	    // handle console in case there isn't any support for it by browser
	    if (typeof window.console === 'undefined') {
    		consoleAvaliable = false;
    		window.console.log = window.console.log || function() {};
	    }
	    return {
	    	consoleAvaliable: consoleAvaliable
	    };
	}
})();
