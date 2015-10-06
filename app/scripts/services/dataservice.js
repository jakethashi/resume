(function() {
    'use strict';
	
	angular
	    .module('mscv')
	    .service('dataservice', dataservice);

	function dataservice($q, $firebaseObject, REST_API_URI) {
		var ref = new Firebase(REST_API_URI);

		return {
			getAppContent: getAppContent
		};

		function dataServiceError() {
			// TODO: handle error globally
			if (window.console) {
				console.log('error while getting a data');
			}
		}

		function getAppContent($scope) {
			var syncObject = $firebaseObject(ref);
			syncObject.$bindTo($scope, 'mscvCtrl.ds');

			syncObject.$loaded().catch(dataServiceError);
			return syncObject.$loaded();
		}
	}
})();

