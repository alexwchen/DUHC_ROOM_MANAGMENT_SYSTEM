(function(){

  'use strict';

  angular.module('roomtracking')

  .directive('residentsList', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/partials/residents/residentslist.html',
      replace: true,
      scope:{},
      controller: 'residentslistController'
    }
  })

  .directive('editResident', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/partials/residents/editResident.html',
      replace: true,
      scope:{},
      controller: 'editResidentController'
    }
  });

})();
