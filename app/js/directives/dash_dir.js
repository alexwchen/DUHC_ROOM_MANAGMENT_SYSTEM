(function(){

  'use strict';

  angular.module('roomtracking')

  .directive('dashCalender', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/partials/dashboard/dashboardCalender.html',
      replace: true,
      scope:{},
      controller: 'dashboardCalenderController'
    }
  });

})();
