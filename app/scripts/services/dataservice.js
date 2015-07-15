angular
    .module('mscv')
    .service('dataservice', dataservice);

function dataservice($http, REST_API_URI) {
	return {
		getAppContent: getAppContent
	};

	function dataServiceError() {
		// TODO: handle error globally
	}

	function getAppContent() {
		return $http.get(REST_API_URI + 'content.js')
      		.catch(dataServiceError);
	}
}