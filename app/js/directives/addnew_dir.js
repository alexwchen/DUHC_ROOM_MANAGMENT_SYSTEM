(function(){

  'use strict';

  angular.module('roomtracking')

  .directive('addnewForm', function(){
    return {
      restrict: 'E',
      templateUrl: 'app/partials/addNew/addnewform.html',
      replace: true,
      scope:{},
      controller: 'addNewFormController'
    }
  });

})();
