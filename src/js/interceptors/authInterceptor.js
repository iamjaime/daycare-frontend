'use_strict';

var app = angular.module('app');

app.factory('AuthInterceptor', function ($q, $injector, $cookieStore) {

      return {
         request: function (config) {
            //Get the logged in user facility token.
            var admin = $cookieStore.get('admin');
            if(admin !== undefined && admin.api_auth_token) {
                config.headers = config.headers || {};
                config.headers['X-AUTH-TOKEN'] = admin.api_auth_token;
            }

            return config;
         },
         response: function(response){
            //If unauthorized then lets remove the admin cookie.
            if (response.status === 401) {
                console.log("Response 401: @TODO do something useful here in response block");
                $cookieStore.remove('admin');
                
            }
            return response || $q.when(response);
         },
         responseError: function(rejection) {

            //console.info(rejection); //log the rejection
            
            if (rejection.status === 401) {
                //unauthorized.... lets do a redirect to login page...
                $cookieStore.remove('admin');
                $injector.get('$state').go('access.signin');
            }

            return $q.reject(rejection);
         }
      };
})
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});