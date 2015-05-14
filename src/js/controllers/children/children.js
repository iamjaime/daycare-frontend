'use strict';

/* Controller */
  // Children controller
app.controller('ChildrenController', ['$rootScope', '$scope', '$http', 'Children', function($rootScope, $scope, $http, Children) {
    
    getChildren();

    function getChildren(){
      $rootScope.isLoading = true;
      Children.get()
      .$promise
      .then(function(res){
        $scope.children = res.data;
      }, function(err){
        console.log(err);
      }).finally(function(){
        $rootScope.isLoading = false;
      })
    }

}]);