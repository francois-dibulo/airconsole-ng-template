AirApp.controllers.controller('MainCtrl',
    ['$scope', '$location', '$timeout', '$routeParams', 'AirConsoleService', 'SoundService', 'PlayerService', 'ViewService', 'SelectService', 'DeviceSelectService',
    function ($scope, $location, $timeout, $routeParams, AirConsoleService, SoundService, PlayerService, ViewService, SelectService, DeviceSelectService) {

  $scope.custom_data = {
    is_developer: false,
    is_low_performance: false,
    current_state: AC.State.Idle
  };
  $scope.airconsole = null;

  // =====================================================================================

  var setDeveloperMode = function() {
    var state = AirConsoleService.isDeveloperMode();
    $scope.custom_data.is_developer = state;
  };

  var setLowPerformanceState = function() {
    if (window.navigator.userAgent.match(/iPhone|Android|iPad/gi) !== null) {
      $scope.custom_data.is_low_performance = true;
    }
  };

  // =====================================================================================

  $scope.navigate = function(view) {
    $location.path('/' + view);
    $scope.update();
  };

  // =====================================================================================

  $scope.updateCustomData = function() {
    AirConsoleService.updateCustomData($scope.custom_data);
  };

  $scope.update = function() {
    $scope.$apply();
  };

  // =====================================================================================

  $scope.resetAll = function() {
    $scope.custom_data.current_state = AC.State.Idle;
    $scope.updateCustomData();
  };

  $scope.init = function() {

    AirConsoleService.onReady = function() {
      $scope.airconsole = AirConsoleService.instance();
      setDeveloperMode();
      setLowPerformanceState();

      ViewService.init();
      ViewService.onPath = function(path, params, from_same_device) {
        if ($location.path() !== path) {
          var full_path = '/' + path;
          if (params) {
            $location.path(full_path).search(params);
          } else {
            $location.path(full_path);
          }
          if (!from_same_device) {
            $scope.$apply();
          }
        }
      };

      PlayerService.init();
      SoundService.load(Screen.sounds);
      SelectService.init_();
      DeviceSelectService.init();

      //
      ViewService.screen.go(Shared.View.Lobby, true);
      $scope.update();
      $scope.updateCustomData();
    };

    AirConsoleService.createInstance();

  };

}]);
