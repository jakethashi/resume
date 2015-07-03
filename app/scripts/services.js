angular
    .module('mscv')
    .service('utils', [
        '$q',
        function(
            $q
        ) 
    {
        var utils = this;

        utils.isMobileView = function() {
            return $('.navbar-toggle').is(':visible');
        };

        utils.toPromise = function(args, condition) {
            var deferred = $q.defer();

            if (typeof condition === 'function') {
                condition.call(this,deferred, args);
            } else {
                deferred.resolve({
                    success: false
                });
            }
            return deferred.promise;
        };

        utils.msg = function(msg) {
            alert(msg);
        };
    }])
    .service('loginModal', [
        'VIEWS_PATH', 
        '$modal',
        function (
            VIEWS_PATH, 
            $modal
        )
    {

        this.modalInstance = null;

        this.createModalInstance = function (template) {
          this.modalInstance = $modal.open({
            templateUrl: template || 'authModal.html',
            controller: 'ModalController',
            controllerAs: 'modal'
          });

          this.modalInstance.result.then(function (data) {
            delete this.modalInstance;

            return data;
          }.bind(this), function () {
            delete this.modalInstance;
          }.bind(this));
        };

        this.prepareLoginModal = function () {
          if (!this.modalInstance) {
            this.createModalInstance("authModal.html");
          }

          return this.modalInstance.result;
        };

        this.prepareRejectModal = function () {
          if (!this.modalInstance) {
            this.createModalInstance("rejectModal.html");
          }

          return this.modalInstance.result;
        };

        this.notFoundModal = function() {
            if (!this.modalInstance) {
                this.createModalInstance(VIEWS_PATH + "notFound.html");
            }

          return this.modalInstance.result;
        };

      }]);
