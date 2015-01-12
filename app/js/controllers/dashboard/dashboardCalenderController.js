(function(){
  'use strict';

  angular.module('roomtracking')

  .controller('dashboardCalenderController', ['$scope', 'ResFields', '$state', '$stateParams', '$firebase', 'FirebaseRoot', function($scope, ResFields, $state, $stateParams, $firebase, FirebaseRoot){

    // calender resources:
    // http://angular-ui.github.io/ui-calendar/

    var fireusers_root = new Firebase(FirebaseRoot);
    var fire_residents = $firebase(fireusers_root).$asArray();

    // -----------------
    // EventSource <Calender Code>
    // -----------------
    $scope.eventSources = [{
      events: [
        // Sample Events:
        // {title: 'All Day Event',start: new Date(y, m, 1)},
        // {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        // {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        // {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        // {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        // {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
      ],
      color: 'yellow',   // an option!
      textColor: 'black' // an option!
    }];


    // -----------------
    // Residents <Calender Code>
    // -----------------
    function getDate(dateStr){
      return new Date(dateStr)
    }

    fire_residents.$loaded(function(data){

      var dictionary = {};
      var numberlist = [];
      // loop through all residents
      for (var i=0;i<data.length;i++){
        var res = data[i];
        var start = getDate(res["Start Date"]);
        var end = getDate(res["End Date"]);

        // construct event obj for calender
        var obj = {};
        obj.title = res['Room']+':'+res['Name'];

        // check if it is valid date
        if(isNaN(start)){
          console.log("Fail StartDate");
        }else{
          obj.start = start;
        }
        if(isNaN(end)){
          console.log("Fail End");
        }else{
          obj.end = end;
        }

        // sorting prep
        dictionary[obj.title] = obj;
        numberlist.push(obj.title);
      }
      // construct sorted event list
      numberlist.sort();
      for (var x=0;x<numberlist.length;x++){
        var eventobj = dictionary[numberlist[x]];
        $scope.eventSources[0].events.push(eventobj);
      }



      // ------------------------
      // Display Dashboard Alert
      // ------------------------
      var allres = $scope.eventSources[0].events; // make sure we only read from this
      var today = new Date();
      $scope.movedout_past = [];
      $scope.movedout_future = [];
      $scope.movedout_unclear = [];

      for (var x=0;x<allres.length;x++){
        var diff = today-allres[x].end;
        var days = Math.floor(diff / 1000 / 60 / 60 /24);
        if(days){
          if(days>=0){ // move out soon
            if(days<14){ // less than 14 days
              $scope.movedout_past.push({title:allres[x].title, days:days});
            }
          }else{ // already moved out
            if(days>-14){ // less than 14 days
              $scope.movedout_future.push({title:allres[x].title, days:-days});
            }
          }
        }else{ // no end date set
          $scope.movedout_unclear.push({title:allres[x].title});
        }
      }

      console.log($scope.movedout_past);
      console.log($scope.movedout_future);
      console.log($scope.movedout_unclear);

    });




  }]);
})();
