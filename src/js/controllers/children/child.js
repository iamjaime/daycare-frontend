'use strict';

/* Controller */
  // Child controller ( For individual Child )
app.controller('ChildController', ['$rootScope', '$scope', '$stateParams', '$http', 'Children', function($rootScope, $scope, $stateParams, $http, Children) {
    var childId = $stateParams.childId;

    getChild();
    getContacts();
    
    /**
     * getChild Get Child details
     * @return void
     */
    function getChild(){
      $rootScope.isLoading = true;
      Children.get({ childId: childId })
      .$promise
      .then(function(res){
        $scope.child = res.data;
        $scope.authorizedPickup = res.data.authorized_pickup;
        $scope.emergencyContacts = res.data.emergency_contacts;
        $scope.parents = res.data.parents;
        console.log($scope.child);
      }, function(err){
        console.log(err);
      }).finally(function(){
        $rootScope.isLoading = false;
      })
    }

    /**
     * getContacts Get the child's contacts
     * @return void
     */
    function getContacts(){
      var contacts = [];
      $rootScope.isLoading = true;
      Children.contacts({ childId: childId })
      .$promise
      .then(function(res){
       var pickupContacts = [];
       $scope.contacts = res.data;

        angular.forEach(res.data, function(val, key){
          if(!val.pickup){
            pickupContacts.push(val);
          }
        });

        $scope.tag = {
          "bg-primary" : contacts.type == "parent",
          "bg-danger" : contacts.type == "emergency"
        };

        $scope.pickupContacts = pickupContacts;

      }, function(err){
        console.log(err);
      }).finally(function(){
        $rootScope.isLoading = false;
      });
    }


    /**
     * removeAuthPickup  Unauthorizes the contact from picking up child.
     * @return void
     */
    $scope.removeAuthPickup = function(){
      //do something
    };

    /**
     * updateChild Updates a specific child's details
     * @return void
     */
    $scope.updateChild = function(){
        $rootScope.isLoading = true;
        Children.update({ childId: childId }, $scope.child)
        .$promise
        .then(function(res){
          console.log(res);
        }, function(err){
          console.log(err);
        })
        .finally(function(){
          $rootScope.isLoading = false;
        });
    };

}]);