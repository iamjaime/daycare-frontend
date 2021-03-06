'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', 'Signin', '$state', '$cookieStore', function($scope, Signin, $state, $cookieStore) {

    /**
     * login Handles user authentication
     * @return Response
     */
    $scope.login = function() {     
    $scope.isLoading = true; 
    console.log($scope.user);
      Signin.query({email : $scope.user.email, password: $scope.user.password })
      .$promise
      .then(function(res){
        console.log(res);
        //Set admin cookie
        $cookieStore.put('usr', res.data.id);
        $cookieStore.put('usrType', res.data.role);
        $state.go('facilities');
      }, function(err){
        //get errors and output them...
        angular.forEach(err.data.error, function(val, key){
          $scope.authError = val[0];
        });
        console.log(err);
      }).finally(function(){
        $scope.isLoading = false; 
      });   
    };

}]);