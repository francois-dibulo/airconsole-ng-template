AirApp.controllers.controller('MainCtrl',
    ['$injector', '$scope', '$location', '$timeout', '$routeParams', 'AirConsoleService', 'SoundService', 'PlayerService', 'ViewService', 'DeviceSelectService',
    function ($injector, $scope, $location, $timeout, $routeParams, AirConsoleService, SoundService, PlayerService, ViewService, DeviceSelectService) {

  $scope.custom_data = {
    is_developer: false,
    is_low_performance: false,
    current_state: AC.State.Idle
  };
  $scope.airconsole = null;

  // =====================================================================================

  var setDeveloperMode = function() {
    var state = $scope.airconsole.devices[0].url.indexOf('10.0.1') > -1;
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

  var bindEvents = function() {

    // $scope.airconsole.on(AC.Action.SelectService, function(device_id, service) {
    // });

  };

  // =====================================================================================

  $scope.resetAll = function() {
    $scope.custom_data.current_state = AC.State.Idle;
    $scope.updateCustomData();
  };

  $scope.init = function() {

    AirConsoleService.onReady = function() {
      $scope.airconsole = AirConsoleService.instance();
      bindEvents();
      setDeveloperMode();
      setLowPerformanceState();

      ViewService.init();
      ViewService.onPath = function(path, params, from_same_device) {
        if ($location.path() !== path) {
          $location.path('/' + path);
          if (!from_same_device) {
            $scope.$apply();
          }
        }
      };

      PlayerService.init();
      SoundService.load(Screen.sounds);

      DeviceSelectService.init();

      //
      ViewService.screen.go(Shared.View.Lobby, true);
      $scope.updateCustomData();
    };

    AirConsoleService.createInstance();

  };

}]);
