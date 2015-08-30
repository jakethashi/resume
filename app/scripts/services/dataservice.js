(function() {
    'use strict';
	
	angular
	    .module('mscv')
	    .service('dataservice', dataservice);

	function dataservice($http, REST_API_URI) {
		return {
			getAppContent: getAppContent
		};

		function dataServiceError() {
			// TODO: handle error globally
			if (window.console) {
				console.log('error while getting a data');
			}
		}

		function getAppContent() {
			return $http.get(REST_API_URI + 'content.js')
				.then(function(response) {
					return response.data;
				})
	      		.catch(dataServiceError);
		}
	}
})();

