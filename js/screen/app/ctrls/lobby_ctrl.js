AirApp.controllers.controller('LobbyCtrl',
  ['$injector', '$scope', 'SoundService', 'PlayerService', 'AirConsoleService', 'SelectService',
  function ($injector, $scope, SoundService, PlayerService, AirConsoleService, SelectService) {

  $scope.items = [];

  $scope.isSelectedItem = function(index) {
    return SelectService.isSelectedValue(AC.List.Mode, index);
  };

  $scope.init = function() {
    $scope.items = SelectService.getList(AC.List.Mode).values;

    $scope.airconsole.on(SelectService.Event.OnValueChanged, function(device_id, index) {
      $scope.update();
    });
  };

  $scope.$on("$destroy", function() {

  });

}]);
