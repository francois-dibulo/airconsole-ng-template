AirApp.controllers.controller('LobbyCtrl',
  ['$scope', 'ViewService', 'AirConsoleService', 'DeviceSelectService',
  function ($scope, ViewService, AirConsoleService, DeviceSelectService) {

  var evts = {};

  $scope.items = [];

  $scope.nextAction = function() {
    ViewService.ctrl.go(Shared.View.Ingame, true);
  };

  $scope.hasSelectedValue = function() {
    console.log("Has selected", DeviceSelectService.hasSelectedValue(AC.List.Mode));
    return DeviceSelectService.hasSelectedValue(AC.List.Mode);
  };

  $scope.init = function() {
    $scope.items = DeviceSelectService.getList(AC.List.Mode).values;
  };

  $scope.$on("$destroy", function() {
    for (var id in evts) {
      $scope.airconsole.off(evts[id]);
    }
  });

}]);
