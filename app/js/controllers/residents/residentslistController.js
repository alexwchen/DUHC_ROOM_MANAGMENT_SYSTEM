(function(){
  'use strict';

  angular.module('roomtracking')

  .controller('residentslistController', ['$scope', '$rootScope', '$state', '$stateParams', '$firebase', 'FirebaseRoot', 'ResFields', function($scope, $rootScope, $state, $stateParams, $firebase, FirebaseRoot, ResFields){


    // -----------------
    // Display Data (Selective Based on Person)
    // -----------------
    var fireusers_root = new Firebase(FirebaseRoot);
    var fire_residents = $firebase(fireusers_root).$asArray();

    fire_residents.$loaded(function(resdata){

      var managers = {
        "carol":['Name','Room', 'Category', 'Email','Start Date','End Date','Waiver Recievd', 'Security Deposit', 'Notes', 'Monthly Rent'],
        "martin":['Name','Room', 'Category', 'Email','Start Date','End Date','Waiver Recievd', 'Paid Desk', 'ID Card', 'Card Exp Date', 'Monthly Rent'],
        "susie":['Name','Room', 'Category', 'Email','Start Date','End Date','Waiver Recievd', 'Security Deposit', 'Notes', 'Paid Rooms', 'Paid Desk'],
        "fulltable":['Name','Room', 'Category', 'Email','Start Date','End Date','Waiver Recievd', 'Security Deposit', 'Notes', 'Paid Rooms', 'Paid Desk', 'ID Card', 'Card Exp Date', 'Monthly Rent']
      };
      if($stateParams.owner){
        $scope.fields = managers[$stateParams.owner];
      }else{
        $scope.fields = managers["fulltable"];
      }
      $scope.residents = [];

      // only show the col res manager are interested in
      for(var j=0;j<resdata.length;j++){
        var empty = {};
        for(var i=0;i<$scope.fields.length;i++){
          var f = $scope.fields[i];
          empty[f] = resdata[j][f]
        }
        $scope.residents.push(empty);
      }

    });

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
