AirApp.controllers.controller('LobbyCtrl',
  ['$scope', 'ViewService', 'AirConsoleService', 'DeviceSelectService',
  function ($scope, ViewService, AirConsoleService, DeviceSelectService) {

  var evts = {};

  $scope.items = [];

  $scope.nextAction = function() {
    ViewService.ctrl.go(Shared.View.Ingame, true);
  };

  $scope.init = function() {
    $scope.items = DeviceSelectService.getList().values;
  };

  $scope.$on("$destroy", function() {
    for (var id in evts) {
      $scope.airconsole.off(evts[id]);
    }
  });

}]);
