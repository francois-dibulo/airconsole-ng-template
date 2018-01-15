AirApp.controllers.controller('LobbyCtrl',
  ['ViewService', '$scope', 'SoundService', 'PlayerService', 'AirConsoleService', 'SelectService',
  function (ViewService, $scope, SoundService, PlayerService, AirConsoleService, SelectService) {

  $scope.items = [];

  $scope.isSelectedItem = function(index) {
    return SelectService.isSelectedValue(AC.List.Mode, index);
  };

  $scope.init = function() {
    $scope.items = SelectService.getList(AC.List.Mode).values;

    $scope.airconsole.on(SelectService.Event.OnValueChanged, function(device_id, index) {
      $scope.update();
    });

    $scope.airconsole.on(AC.Event.GameStart, function(device_id) {
      ViewService.screen.ctrlsGo(Ctrl.View.Loading);
      ViewService.screen.go(Shared.View.Ingame);
      $scope.update();
    });
  };

  $scope.$on("$destroy", function() {

  });

}]);
