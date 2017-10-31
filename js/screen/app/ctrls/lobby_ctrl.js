AirApp.controllers.controller('LobbyCtrl',
  ['$injector', '$scope', 'SoundService', 'PlayerService', 'AirConsoleService', 'DeviceSelectService',
  function ($injector, $scope, SoundService, PlayerService, AirConsoleService, DeviceSelectService) {

  $scope.items = [];

  $scope.isSelectedItem = function(index) {
    return DeviceSelectService.isSelectedItem(index);
  };

  $scope.init = function() {
    $scope.items = DeviceSelectService.getList();

    $scope.airconsole.on(DeviceSelectService.Event.OnIndexChanged, function(device_id, index) {
      $scope.update();
    });
  };

  $scope.$on("$destroy", function() {

  });

}]);
