'use strict';

/* Controllers */
  // children notes controller
app.controller('ChildrenNotesController', ['$rootScope', '$scope', '$modal', 'Children', '$state', '$stateParams', '$cookieStore', '$log', function($rootScope, $scope, $modal, Children, $state, $stateParams, $cookieStore, $log) {

  var childId = $stateParams.childId;
  var userId = $cookieStore.get('usr');

  getNotes();

  /**
   * getNotes Handles getting all of the notes for a specified child.
   * @return void
   */
  function getNotes(){
    $rootScope.isLoading = true;
    Children.getAllNotes({ childId: childId })
    .$promise
    .then(function(res){
      $scope.notes = res.data;
    }, function(err){
      console.log(err);
    }).finally(function(){
      $rootScope.isLoading = false;
    });
  }

  /**
   * deleteNote Delete the note
   * @param  object note   The note object
   * @param  int    index  The object index 
   * @return void
   */
  $scope.deleteNote = function(note, index){
    var noteId = note.id;
    $rootScope.isLoading = true;
    Children.deleteNote({ noteId: noteId })
    .$promise
    .then(function(res){
      $scope.notes.splice(index, 1);
    }, function(err){
      console.log(err);
    }).finally(function(){
      $rootScope.isLoading = false;
    });
  };

  /**
   * open Opens a new modal box
   * @param  string  size  The size of the model (ex: large = lg, medium = md, small = sm)
   * @return void
   */
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