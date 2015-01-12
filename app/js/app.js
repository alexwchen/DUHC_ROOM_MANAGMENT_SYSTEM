(function(){
  'use strict';

  angular.module('roomtracking', ["ui.router", "firebase", "ui.calendar"])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('residents', {
      url: '/',
      templateUrl: '/app/partials/residents/residentsSkeleton.html'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '/app/partials/dashboard/dashboardSkeleton.html'
    })
    .state('addnew', {
      url: '/addnew',
      templateUrl: '/app/partials/addnew/addnewSkeleton.html'
    })
    .state('edit', {
      url: '/edit:objID',
      templateUrl: '/app/partials/residents/editSkeleton.html',
    });
    $urlRouterProvider.otherwise("/");
  })

  .constant('FirebaseRoot', 'https://roomtracking.firebaseio.com/')
  .constant('ResFields', ['Name','Room', 'Category', 'Email','Start Date','End Date','Waiver Recievd', 'Security Deposit', 'Notes', 'Paid Rooms', 'Paid Desk']);
})();
