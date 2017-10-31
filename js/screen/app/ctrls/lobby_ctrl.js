AirApp.controllers.controller('LobbyCtrl',
  ['$injector', '$scope', 'SoundService', 'PlayerService', 'AirConsoleService', 'DeviceSelectService',
  function ($injector, $scope, SoundService, PlayerService, AirConsoleService, DeviceSelectService) {

  $scope.items = [];

  $scope.isSelectedItem = function(index) {
    return DeviceSelectService.isSelectedValue(DeviceSelectService.KEY, index);
  };

  $scope.init = function() {
    $scope.items = DeviceSelectService.getList().values;

    $scope.airconsole.on(DeviceSelectService.Event.OnValueChanged, function(device_id, index) {
      $scope.update();
    });
  };

  $scope.$on("$destroy", function() {

  });

}]);
