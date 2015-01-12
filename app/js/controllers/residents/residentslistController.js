(function(){
  'use strict';

  angular.module('roomtracking')

  .controller('residentslistController', ['$scope', '$rootScope', '$state', '$stateParams', '$firebase', 'FirebaseRoot', 'ResFields', function($scope, $rootScope, $state, $stateParams, $firebase, FirebaseRoot, ResFields){

    // -----------------
    // Display Data
    // -----------------
    var fireusers_root = new Firebase(FirebaseRoot);
    var fire_residents = $firebase(fireusers_root).$asArray();

    $scope.fields = ResFields;
    $scope.residents = fire_residents;
    $scope.edit = function(idx){
      console.log("residentslistController passing: "+idx);
      $state.go("edit",{"objID":idx});
    };

    // -----------------
    // Search Bar
    // -----------------
    $scope.showSearchBar = "All"
    $scope.show_search_bar = function(curr){
      if(curr===$scope.showSearchBar){
        return true;
      }else{
        return false;
      }
    }

    $scope.change_search = function(changeTo){
      $scope.showSearchBar = changeTo;
    }

    // -----------------
    // Sorting Attr
    // -----------------
    // Date sorting can be tricky
    $scope.sortAttr = "Name";
    $scope.sortTable = function(attrname){
      $scope.sortAttr = attrname.replace(' ','');
    };


  }]);
})();
