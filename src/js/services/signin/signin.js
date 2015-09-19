'use strict';

var app = angular.module('app');

app.factory('Signin', ['$resource', function ($resource) {
         
      return $resource(API_END_POINT + '/signin', {},
        {
          query: {
              method: 'POST',
              transformRequest: function (data) {
                 return JSON.stringify({'data': data});
              }
        }
      });

}]);