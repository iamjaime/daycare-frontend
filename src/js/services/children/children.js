'use strict';

var app = angular.module('app');

app.factory('Children', ['$resource', function ($resource) {
         
      return $resource(API_END_POINT + '/child/:childId', null,
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
            method: 'PUT',
            transformRequest: function (data) {
               return JSON.stringify({'data': data});
            }
        },
        contacts: {
          url: API_END_POINT + '/child/:childId/contacts',
          method: 'GET'
        },

        checkin: {
          url : API_END_POINT + '/child/:childId/checkin',
          method: 'POST',
          transformRequest: function (data) {
             return JSON.stringify({'data': data});
          }
        },
        checkout: {
          url : API_END_POINT + '/child/:childId/checkout',
          method: 'POST',
          transformRequest: function (data) {
             return JSON.stringify({'data': data});
          }
        },
        makeNote: {
          url : API_END_POINT + '/note',
          method : 'POST',
          transformRequest: function (data) {
            return JSON.stringify({ 'data' : data });
          }
        },
        getNotes: {
          url: API_END_POINT + '/note/child/:childId',
          method: 'GET'
        },

      });
   }
])