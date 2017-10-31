AirApp.controllers.controller('LobbyCtrl',
  ['$injector', '$scope', 'SoundService', 'PlayerService', 'AirConsoleService', 'DeviceSelectService',
  function ($injector, $scope, SoundService, PlayerService, AirConsoleService, DeviceSelectService) {

  $scope.items = [];

  $scope.isSelectedItem = function(index) {
    return DeviceSelectService.isSelectedValue(AC.List.Mode, index);
  };

  $scope.init = function() {
    $scope.items = DeviceSelectService.getList(AC.List.Mode).values;

    $scope.airconsole.on(DeviceSelectService.Event.OnValueChanged, function(device_id, index) {
      $scope.update();
    });
  };

  $scope.$on("$destroy", function() {

  });

}]);
