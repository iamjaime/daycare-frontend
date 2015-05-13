'use strict';

/* Controller */
  // Child controller ( For individual Child )
app.controller('ChildController', ['$scope', '$stateParams', '$http', 'Children', function($scope, $stateParams, $http, Children) {
    var childId = $stateParams.childId;

    getChild();
    getContacts();

    /**
     * getChild Get Child details
     * @return void
     */
    function getChild(){
      $scope.isLoading = true;
      Children.get({ childId: childId })
      .$promise
      .then(function(res){
        $scope.child = res.data;
      }, function(err){
        console.log(err);
      }).finally(function(){
        $scope.isLoading = false;
      })
    }

    /**
     * getContacts Get the child's contacts
     * @return void
     */
    function getContacts(){
      var contacts = [];
      $scope.isLoading = true;
      Children.contacts({ childId: childId })
      .$promise
      .then(function(res){
        
        var parents = res.data.parents;
        var emergency = res.data.emergency;

        angular.forEach(parents, function(val, key){
          val.type = 'parent';
          contacts.push(val);
        });
        
        angular.forEach(emergency, function(val, key){
          val.type = 'emergency';
          contacts.push(val);
        });

        $scope.tag = {
          "bg-primary" : contacts.type == "parent",
          "bg-danger" : contacts.type == "emergency"
        };

        $scope.contacts = contacts;
        console.log($scope.contacts);
      }, function(err){
        console.log(err);
      }).finally(function(){
        $scope.isLoading = false;
      });
    }

}]);