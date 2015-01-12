(function(){
  'use strict';

  angular.module('roomtracking')

  .controller('editResidentController', ['$scope', '$rootScope', '$state', '$stateParams', '$firebase', 'FirebaseRoot', 'ResFields', function($scope, $rootScope, $state, $stateParams, $firebase, FirebaseRoot, ResFields){

    var idx = $stateParams.objID; // param state.go
    $scope.fields = ResFields;

    var fireusers_root = new Firebase(FirebaseRoot).child(idx);
    var fire_resident = $firebase(fireusers_root).$asObject();

    // load from firebase
    fire_resident.$loaded(function(data){
      $scope.ResObj = data;
    });

    $scope.updateResObj = function(){
      $scope.ResObj.$save().then(function(ref) {
        console.log("updated!");
        $state.go('residents');
      });
    };

    // remove is a strange hack, for some reason, firebase obj remove doesn't work
    var fireusers_root = new Firebase(FirebaseRoot);
    var fire_residents = $firebase(fireusers_root).$asArray();
    $scope.removeResObj = function(){
      for (var i=0;i<fire_residents.length;i++){
        if(fire_residents[i].$id===idx){ // then we should remove
          fire_residents.$remove(fire_residents[i]).then(function(ref) {
            $state.go('residents');
          });
        }
      }
    };

  }]);
})();
