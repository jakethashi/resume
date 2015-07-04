angular
    .module('mscv')
    .service('utils', [
        '$q',
        function (
            $q
        ) {
            var utils = this;

            utils.isMobileView = function () {
                return $('.navbar-toggle').is(':visible');
            };

            utils.toPromise = function (args, condition) {
                var deferred = $q.defer();

                if (typeof condition === 'function') {
                    condition.call(this, deferred, args);
                } else {
                    deferred.resolve({
                        success: false
                    });
                }
                return deferred.promise;
            };
        }])
    .service('modal', [
        'VIEWS_PATH',
        '$modal',
        function (
            VIEWS_PATH,
            $modal
        ) {
            this.modal = null;

            this.createModal = function (template) {
                this.modal = $modal.open({
                    templateUrl: template,
                    controller: 'ModalController',
                    controllerAs: 'modal'
                });

                this.modal.result.then(function (data) {
                    delete this.modal;
                    return data;
                }.bind(this), function () {
                    delete this.modal;
                }.bind(this));
            };

            this.notFound = function () {
                if (!this.modal) {
                    this.createModal(VIEWS_PATH + "not-found.html");
                }

                return this.modal.result;
            };
        }]);
