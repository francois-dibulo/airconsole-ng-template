AirApp.controllers.controller('GameEndCtrl',
  ['$scope', 'ViewService', 'AirConsoleService',
  function ($scope, ViewService, AirConsoleService) {

  var evts = {};

  $scope.goToStart = function() {
    ViewService.ctrl.go(Shared.View.Intro, true);
  };

  $scope.init = function() {

  };

  $scope.$on("$destroy", function() {
    for (var id in evts) {
      $scope.airconsole.off(evts[id]);
    }
  });

}]);
