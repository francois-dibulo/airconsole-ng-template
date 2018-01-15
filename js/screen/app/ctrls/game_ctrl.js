AirApp.controllers.controller('GameCtrl',
  ['$scope', 'AirConsoleService', 'ViewService', '$timeout',
  function ($scope, AirConsoleService, ViewService, $timeout) {

  $scope.init = function() {
    $scope.custom_data.current_state = AC.State.Ingame;
    $scope.updateCustomData();

    $timeout(function() {
      ViewService.screen.ctrlsGo(Shared.View.Ingame);
    }, 3000);
  };

}]);
