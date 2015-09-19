'use strict';

/* Controllers */
  // selectFacilityController
app.controller('SelectFacilityController', ['$rootScope', '$scope', '$state', '$cookieStore', 'Facility', function($rootScope, $scope, $state, $cookieStore, Facility) {
  
  var userId = $cookieStore.get('usr');

  getFacilities();

  $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg',
        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }

  /**
   * getFacilities Handles getting the facilities that belong to this user.
   * @return Response
   */
  function getFacilities(){
    $rootScope.isLoading = true;
    Facility.allFromUser({userId : userId})
    .$promise
    .then(function(res){
      $scope.facilities = res.data;
      console.log(res);
    }, function(err){
      console.log(err);
    }).finally(function(){
      $rootScope.isLoading = false;
    })
  }
  /**
   * selectFacility Handles the facility selection action
   * @param  {object} facility The facility object
   * @return {[type]}          [description]
   */
  $scope.selectFacility = function(facility){
    $cookieStore.put('usrFacility', facility);
    $state.go('app.dashboard');
  };

}]);

