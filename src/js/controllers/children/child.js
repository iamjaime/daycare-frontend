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
      }, function(err){
        console.log(err);
      }).finally(function(){
        $rootScope.isLoading = false;
      });
    }

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