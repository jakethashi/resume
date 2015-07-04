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
                        'modal',
                        '$http',
                        '$rootScope',
                        '$q',
                        function (
                            modal, 
                            $http, 
                            $rootScope, 
                            $q
                        ) 
                  {
                    if (response.status === 404) {
                        return modal.notFound();
                    }

                    return $q.reject(response);
                  }]);
                }
              };
        }]);
    }]);
