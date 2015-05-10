'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', 'Signin', '$state', function($scope, Signin, $state) {
    
    /**
     * login Handles user authentication
     * @return Response
     */
    $scope.login = function() {     
    $scope.isLoading = true; 
      Signin.query($scope.user)
      .$promise
      .then(function(res){
        console.log(res);
      }, function(err){
        $scope.authError = err.data.msg;
        console.log(err);
      }).finally(function(){
        $scope.isLoading = false; 
      });   
    };

}]);