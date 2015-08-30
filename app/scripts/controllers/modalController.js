(function() {
    'use strict';

	angular
	    .module('mscv')
	    .controller('ModalController', ModalController);

	function ModalController($modalInstance) {
	    var vm = this;

	    vm.cancel = function() {
	        $modalInstance.dismiss('cancel');
	    };

	    vm.errorDetail = 'an error occurred';
	}
    
})();