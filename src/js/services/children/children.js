'use strict';

var app = angular.module('app');

app.factory('Children', ['$resource', function ($resource) {
         
      return $resource(API_END_POINT + '/child/:childId', { childId: '@childId' },
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
        },
        restore: {
          url: API_END_POINT + '/admin/events/:eventId/restore',
          method: 'PATCH'
        },
        archived: {
           url: API_END_POINT + '/admin/events/?include=archived',
           method: 'GET'
        }
      });
   }
])