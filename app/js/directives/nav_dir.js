(function(){

  'use strict';

  angular.module('roomtracking')

  .directive('navBar', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/partials/nav.html',
      replace: true,
      scope:{},
      controller:function($scope,$state){

        $scope.personalized_board = function(name){
          $state.go("residents",{"owner":name});
        }

      }
    }
  });

})();
