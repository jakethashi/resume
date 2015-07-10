angular
    .module('mscv')
    .service('modal', modal);

function modal(VIEWS_PATH, $modal) {
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
}