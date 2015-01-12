(function(){
  'use strict';

  angular.module('roomtracking')

  .controller('addNewFormController', ['$scope', 'ResFields', '$state', '$stateParams', '$firebase', 'FirebaseRoot', function($scope, ResFields, $state, $stateParams, $firebase, FirebaseRoot){
    $scope.fields = ResFields;

    // init new res obj
    $scope.newRes = {};
    for (var f in $scope.fields){
      $scope.newRes[$scope.fields[f]] = "";
    }

    var fireusers_root = new Firebase(FirebaseRoot);
    var fire_residents = $firebase(fireusers_root).$asArray();

    // save to firebase
    $scope.createNewRes = function(){
      console.log($scope.newRes);

      fire_residents.$add($scope.newRes).then(function(ref) {
        var id = ref.key();
        console.log("added record with id " + id);
        $state.go("residents");
      });

    };

  }]);
})();
