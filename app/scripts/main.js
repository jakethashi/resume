angular
    .module("mscv", [
        'ngResource', 
        'ui.bootstrap'
    ])
    .config([
        '$httpProvider',
        function (
            $httpProvider
        ) 
    {
        $httpProvider.interceptors.push([
            '$injector',
            'BASE_URI',
            function (
                $injector, 
                BASE_URI
            ) 
        {    
             return {
                responseError: function (response) {
                  return $injector.invoke([
                        'loginModal',
                        '$http',
                        '$rootScope',
                        '$q',
                        function (
                            loginModal, 
                            $http, 
                            $rootScope, 
                            $q
                        ) 
                  {
                    if (response.status === 401) {
                      if (response.config.url === BASE_URI + '/login') {
                        $rootScope.$broadcast('restApi:loginFailed');
                      } else {
                        return loginModal.prepareLoginModal()
                          .then(function () {
                            return $http(response.config);
                          });
                      }
                    } else if (response.status === 403) {
                      return loginModal.prepareRejectModal();
                    } else if (response.status === 404) {
                        return loginModal.notFoundModal();
                    }

                    return $q.reject(response);
                  }]);
                }
              };
        }]);
    }]);
