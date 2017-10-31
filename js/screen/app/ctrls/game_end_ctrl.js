AirApp.controllers.controller('GameEndCtrl',
    ['$injector', '$scope', '$routeParams', 'AirConsoleService', 'SoundService', 'PlayerService', 'ViewService',
    function ($injector, $scope, $routeParams, AirConsoleService, SoundService, PlayerService, ViewService) {

  var evts = {};

  $scope.init = function() {
    $scope.custom_data.current_state = AC.State.Idle;
    $scope.updateCustomData();
  };

  $scope.$on("$destroy", function() {
    for (var id in evts) {
      $scope.airconsole.off(evts[id]);
    }
  });

}]);

