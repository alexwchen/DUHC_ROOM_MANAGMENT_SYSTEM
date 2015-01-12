(function(){

  'use strict';

  angular.module('roomtracking')

  .directive('navBar', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/partials/nav.html',
      replace: true,
      scope:{}
      // controller: 'userBooksController'
    }
  });

})();
