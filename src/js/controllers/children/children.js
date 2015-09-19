'use strict';

/* Controller */
  // Children controller
app.controller('ChildrenController', ['$rootScope', '$scope', '$http', 'Children', function($rootScope, $scope, $http, Children) {
    
    getChildren();

    /**
     * getChildren Get all children
     * @return void
     */
    function getChildren(){
      $rootScope.isLoading = true;
      Children.get()
      .$promise
      .then(function(res){
        console.log(res);
        $scope.children = res.data;
      }, function(err){
        console.log(err);
      }).finally(function(){
        $rootScope.isLoading = false;
      })
    }

    /**
     * checkin Checkin a child
     * @return void
     */
    $scope.checkin = function(child, index){
      $rootScope.isLoading = true;
      Children.checkin({ childId: child.id }, { childId: child.id })
      .$promise
      .then(function(res){
        $scope.children[index].checkins = true;
      }, function(err){
        console.log(err);
      }).finally(function(){
        $rootScope.isLoading = false;
      });
    };

    /**
     * checkout Checkout a child
     * @return void
     */
    $scope.checkout = function(child, index){
      $rootScope.isLoading = true;
      Children.checkout({ childId: child.id }, { childId: child.id })
      .$promise
      .then(function(res){ 
        $scope.children[index].checkins = null;
      }, function(err){
        console.log(err);
      }).finally(function(){
        $rootScope.isLoading = false;
      });
    };

}]);

app.controller('CreateChildModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  ; 
  app.controller('CreateChildModalCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'createChildren.html',
        controller: 'CreateChildModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }])
  ;