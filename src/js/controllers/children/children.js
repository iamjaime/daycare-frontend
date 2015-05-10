'use strict';

/* Controller */
  // Children controller
app.controller('ChildrenController', ['$scope', '$http', 'Children', function($scope, $http, Children) {
    
    $scope.isLoading = false;

    getChildren();

    function getChildren(){
      Children.get()
      .$promise
      .then(function(res){
        console.log(res);
      }, function(err){
        console.log(err);
      }).finally(function(){
        console.info('finished...');
      })
    }

}]);