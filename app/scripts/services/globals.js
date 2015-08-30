(function() {
    'use strict';
	
	angular
	    .module('mscv')
	    .factory('globals', globals);

	function globals() {       
	    return {
			// max. skill items visible at one
	    	skillItemsLimit: 10
	    };
	}
})();
