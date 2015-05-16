'use strict';

/* Controllers */
  // children notes controller
app.controller('ChildrenNotesController', ['$rootScope', '$scope', '$modal', 'Children', '$state', '$stateParams', '$cookieStore', '$log', function($rootScope, $scope, $modal, Children, $state, $stateParams, $cookieStore, $log) {

  var childId = $stateParams.childId;
  var userId = $cookieStore.get('usr');

  getNotes();

  function getNotes(){
    $rootScope.isLoading = true;
    Children.getNotes({ childId: childId })
    .$promise
    .then(function(res){
      console.log(res);
      $scope.notes = res.data;
    }, function(err){
      console.log(err);
    }).finally(function(){
      $rootScope.isLoading = false;
    });
  }

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'createNote.html',
      controller: 'CreateNoteModalInstanceCtrl',
      size: size,
      resolve: {
        childId: function () {
          return childId;
        },
        userId: function(){
          return userId;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.notes.unshift(selectedItem);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  
}]);

app.controller('CreateNoteModalInstanceCtrl', ['$rootScope', '$scope', '$modalInstance', 'Children', 'childId', 'userId', function($rootScope, $scope, $modalInstance, Children, childId, userId) {
    
    var childId = childId;
    var userId = userId;
    $scope.note = {};

    /**
     * saveNote Creates a new note
     * @return void
     */
    $scope.saveNote = function(){
      $rootScope.isLoading = true;
      var postData = {
        staff_id : userId,
        child_id : childId,
        title : $scope.note.title,
        note : $scope.note.note
      }
      Children.makeNote({}, postData)
      .$promise
      .then(function(res){
        $modalInstance.close(res.data);
      }, function(err){
        console.log(err);
      }).finally(function(){
        $rootScope.isLoading = false;
      });
    };
      
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
}]);