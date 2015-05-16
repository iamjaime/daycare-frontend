'use strict';

var app = angular.module('app');

app.factory('User', ['$resource', function ($resource) {
         
      return $resource(API_END_POINT + '/user/:userId', null,
      {
        get: {
          method: 'GET'
        },
        save: {
            method: 'POST',
            transformRequest: function (data) {
               return JSON.stringify({'data': data});
            }
        },
        update: {
            method: 'PUT',//PATCH giving errors
            transformRequest: function (data) {
               return JSON.stringify({'data': data});
            }
        }

      });
   }
])