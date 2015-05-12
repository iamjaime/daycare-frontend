'use strict';

/* Controller */
  // Children controller
app.controller('ChildrenController', ['$scope', '$http', 'Children', function($scope, $http, Children) {
    
    getChildren();

    function getChildren(){
      $scope.isLoading = true;
      Children.get()
      .$promise
      .then(function(res){
        console.log(res);
        $scope.children = res.data;
      }, function(err){
        console.log(err);
      }).finally(function(){
        $scope.isLoading = false;
        console.info('finished...');
      })
    }

}]);