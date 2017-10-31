AirApp.controllers.controller('GameCtrl',
  ['$scope', 'AirConsoleService',
  function ($scope, AirConsoleService) {

  $scope.init = function() {
    $scope.custom_data.current_state = AC.State.Ingame;
    $scope.updateCustomData();
  };

}]);
