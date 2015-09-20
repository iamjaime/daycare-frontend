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
        pickup: {
          url : API_END_POINT + '/child/:childId/pickup',
          method: 'POST',
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
        attendance: {
          url: API_END_POINT + '/child/:childId/attendance',
          method: 'GET'
        },
        makeNote: {
          url : API_END_POINT + '/note',
          method : 'POST',
          transformRequest: function (data) {
            return JSON.stringify({ 'data' : data });
          }
        },
        getNote: {
          url : API_END_POINT + '/note/:noteId',
          method : 'GET'
        },
        getAllNotes: {
          url: API_END_POINT + '/note/child/:childId',
          method: 'GET'
        },
        deleteNote: {
          url : API_END_POINT + '/note/:noteId',
          method : 'DELETE'
        }

      });
   }
])