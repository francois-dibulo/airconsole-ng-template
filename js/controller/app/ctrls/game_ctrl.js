AirApp.controllers.controller('GameCtrl',
  ['$scope', 'ViewService', 'AirConsoleService',
  function ($scope, ViewService, AirConsoleService) {
  var evts = {};

  $scope.init = function() {

  };

  $scope.goHome = function() {
    ViewService.ctrl.go(Shared.View.Intro, true);
  };

  $scope.$on('$destroy', function() {
    for (var key in evts) {
      $scope.airconsole.off(evts[key]);
    }
  });

}]);
