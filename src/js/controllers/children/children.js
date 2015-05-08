'use strict';

/* Controller */
  // Children controller
app.controller('ChildrenController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    console.log('children controller is here...');
    $scope.isLoading = true;
}]);