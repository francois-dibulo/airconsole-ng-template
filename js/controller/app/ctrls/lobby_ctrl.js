AirApp.controllers.controller('LobbyCtrl',
  ['$scope', 'ViewService', 'AirConsoleService', 'SelectService',
  function ($scope, ViewService, AirConsoleService, SelectService) {

  var evts = {};

  $scope.nextAction = function() {
    ViewService.ctrl.go(Shared.View.Ingame, true);
  };

  $scope.hasSelectedValue = function() {
    return SelectService.hasSelectedValue(AC.List.Mode, AirConsole.SCREEN);
  };

  $scope.init = function() {

  };

  $scope.$on("$destroy", function() {
    for (var id in evts) {
      $scope.airconsole.off(evts[id]);
    }
  });

}]);
