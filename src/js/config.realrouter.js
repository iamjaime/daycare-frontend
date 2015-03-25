'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG) {
          
          $urlRouterProvider
              .otherwise('/app/dashboard');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'views/app.html'
              })
              //Dashboard
              .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'views/dashboard/dashboard.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/chart.js']);
                    }]
                  }
              })

              //Children
              .state('app.children', {
                  url: '/children',
                  templateUrl: 'views/children/children.html'
              })

              //Users
              .state('app.users', {
                  url: '/users',
                  templateUrl: 'views/users/users.html'
              })

              //Calendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'views/calendar/calendar.html'
              })

              //Notifications
              .state('app.notifications', {
                  url: '/notifications',
                  templateUrl: 'views/notifications/notifications.html'
              })

              //Settings
              .state('app.settings', {
                  url: '/settings',
                  templateUrl: 'views/settings/settings.html'
              })
               
      }
    ]
  );
