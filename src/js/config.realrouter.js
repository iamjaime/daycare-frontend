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

              //Child
              .state('app.child', {
                  url: '/child/:childId',
                  templateUrl: 'views/children/child.html'
              })

              //Child - Dashboard
              .state('app.child.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'views/children/dashboard/dashboard.html'
              })

              //Child - Health
              .state('app.child.health', {
                  url: '/health',
                  templateUrl: 'views/children/health/health.html'
              })

              //Child - Notes
              .state('app.child.notes', {
                  url: '/notes',
                  templateUrl: 'views/children/notes/notes.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/app/note/note.js',
                                               JQ_CONFIG.moment] );
                      }]
                  }
              })

              //Child - Pickup
              .state('app.child.pickup', {
                  url: '/pickup',
                  templateUrl: 'views/children/pickup/pickup.html'
              })

              //Child - Invoice
              .state('app.child.invoice', {
                  url: '/invoice',
                  templateUrl: 'views/children/invoice/invoice.html'
              })

              //Child - Emergency
              .state('app.child.emergency', {
                  url: '/emergency',
                  templateUrl: 'views/children/emergency/emergency.html'
              })

              //Child - Reports
              .state('app.child.reports', {
                  url: '/reports',
                  templateUrl: 'views/children/reports/reports.html'
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
