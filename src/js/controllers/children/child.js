'use strict';

/* Controller */
  // Child controller ( For individual Child )
app.controller('ChildController', ['$rootScope', '$scope', '$stateParams', '$http', 'Children', 'User', function($rootScope, $scope, $stateParams, $http, Children, User) {
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
     * isParent                 Checks if person is a parent
     * @param  {string}  person The Person
     * @return {Boolean}        is the person a parent?
     */
    function isParent(person){
      if(person === "Dad" || person === "Mom"){
        return true;
      }
      return false;
    }


    /**
     * removeAuthPickup         Unauthorizes the contact from picking up child.
     * @param  {object} person  The Contact
     * @param  {int} index      The object index
     * @return void
     */
    $scope.removeAuthPickup = function(person, index){
      $rootScope.isLoading = true;
      var postData = {
        isParent: isParent(person.relationship),
        authorize: false,
        contactId: person.id
      };
        Children.pickup({childId: childId}, postData)
        .$promise
        .then(function(res){
          
          $scope.authorizedPickup.splice(index, 1);
          
          if(isParent(person.relationship)){
            person.type = "parent";
          }else{
            person.type = "emergency";
          }

          $scope.pickupContacts.unshift(person);

        }, function(err){
          console.log(err);
        })
        .finally(function(){
          $rootScope.isLoading = false;
        });
    };

    /**
     * authorizePickup         authorizes the contact to pick up child.
     * @param  {object} person  The Contact
     * @param  {int} index      The object index
     * @return void
     */
    $scope.authorizePickup = function(person, index){
      $rootScope.isLoading = true;
      var postData = {
        isParent: isParent(person.relationship),
        authorize: true,
        contactId: person.id
      };
        Children.pickup({childId: childId}, postData)
        .$promise
        .then(function(res){
          
          $scope.pickupContacts.splice(index, 1);
          
          if(isParent(person.relationship)){
            person.type = "parent";
          }else{
            person.type = "emergency";
          }

          $scope.authorizedPickup.push(person);

        }, function(err){
          console.log(err);
        })
        .finally(function(){
          $rootScope.isLoading = false;
        });
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

    /**
     * deleteEmergencyContact Delete a specific emergency contact
     * @return void
     */
    $scope.deleteEmergencyContact = function(person, index){
      $rootScope.isLoading = true;
        User.deleteUser({userId: person.id})
        .$promise
        .then(function(res){
          console.log(res);  
          $scope.emergencyContacts.splice(index, 1);
        
        }, function(err){
          console.log(err);
        })
        .finally(function(){
          $rootScope.isLoading = false;
        });
    };

}]);