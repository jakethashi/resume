angular
    .module("mscv", ['ui.bootstrap', 'firebase'])
    .config(config);

function config($httpProvider) {
    $httpProvider.interceptors.push(interceptorsCallback);

    function interceptorsCallback($injector, common, BASE_URI) {
        return {
            responseError: function (response) {
                function responseErrorCallback(modal, $http, $rootScope, $q) {
                    if (response.status === 404) {
                        return modal.notFound();
                    }

                    return $q.reject(response);
                }
                return $injector.invoke(responseErrorCallback);
            }
        };
    }
}
