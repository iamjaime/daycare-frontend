'use strict';
var app = angular.module('app');
var API_END_POINT = "http://localhost:8000/api/v1";

/**
 * Config for the router
 */
app.run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
          $rootScope.$on('$stateChangeError', function () {
            // Redirect user to our login page
            $state.go('access.signin');
          });
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG) {
          
          $urlRouterProvider
              .otherwise('/access/signin');
          //Check If User Is Logged In...
          var authenticated = ['$q', '$cookieStore', function ($q, $cookieStore) {
            var deferred = $q.defer();
            var usr = $cookieStore.get('usr');
            var usrFacility = $cookieStore.get('usrFacility');
            if(usr && usrFacility){
              deferred.resolve();
            }else{
              deferred.reject('Not logged in');
            }
            return deferred.promise;
          }];


          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'views/app.html',
                  controller: function($rootScope){
                      $rootScope.isLoading = false;
                  },  
                  resolve: {
                    authenticated: authenticated
                  }
              })
              //Access Ui-View abstract
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })

              //Signin
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'views/signin/signin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( [
                            'js/controllers/signin/signin.js',
                            'js/services/signin/signin.js'
                            ] );
                      }]
                  }
              })

              //Signup
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'views/signup/signup.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signup.js'] );
                      }]
                  }
              })

              //Forgot Password
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'views/forgotpassword/forgotpassword.html'
              })

              //Page Not Found
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'views/404/404.html'
              })

              //Facility Select
              .state('facilities', {
                url: '/facilities',
                controller: 'SelectFacilityController',
                templateUrl: 'views/facilities/selectFacility.html',
                resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( [
                            'js/controllers/facilities/selectFacilities.js', 
                            'js/services/facilities/facility.js'] );
                      }]
                  }
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
                  templateUrl: 'views/children/children/children.html',
                  controller: 'ChildrenController'
              })

              //Create
              .state('create', {
                  abstract: true,
                  url: '/create',
                  templateUrl: 'views/app.html',
                  controller: function($rootScope){
                      $rootScope.isLoading = false;
                  },  
                  resolve: {
                    authenticated: authenticated
                  }
              })

              //Create Child
              .state('create.child', {
                  url: '/child',
                  templateUrl: 'views/children/children/create.html',
                  controller: 'ChildController',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( [
                            'js/controllers/children/child.js', 
                            'js/services/children/children.js'] );
                      }]
                  }
              })

              //Child
              .state('app.child', {
                  url: '/child/:childId',
                  templateUrl: 'views/children/child.html',
                  controller: 'ChildController',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( [
                            'js/controllers/children/child.js', 
                            'js/services/children/children.js'] );
                      }]
                  }
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
                  controller: 'ChildrenNotesController',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( [
                            'js/app/note/note.js',
                            JQ_CONFIG.moment,
                            'js/controllers/children/notes/notes.js'
                          ] );
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
                  templateUrl: 'views/calendar/calendar.html',
                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                        function( $ocLazyLoad, uiLoad ){
                          return uiLoad.load(
                            JQ_CONFIG.fullcalendar.concat('js/app/calendar/calendar.js')
                          ).then(
                            function(){
                              return $ocLazyLoad.load('ui.calendar');
                            }
                          )
                      }]
                  }
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
