AirApp.controllers.controller('MainCtrl',
    ['$scope', '$location', 'AirConsoleService', 'SoundService', 'ViewService', 'DeviceSelectService',
    function ($scope, $location, AirConsoleService, SoundService, ViewService, DeviceSelectService) {

  $scope.airconsole = null;
  $scope.player = {
    is_developer: false,
    device_id: null,
    name: null,
    img: null,
    is_master: false,
    is_premium: false,
    game: {}
  };

  var isDeveloperMode = function() {
    var screen_data = $scope.airconsole.devices[AirConsole.SCREEN];
    if (screen_data) {
      var url = screen_data.url;
      return url.indexOf('10.0.1') > -1 || url.indexOf('192.168') > -1;
    }
  };

  var evaluateMaster = function(device_id) {
    $scope.player.is_master = AirConsoleService.isMasterPlayer();
    $scope.update();
  };

  var preparePlayer = function() {
    var ac = $scope.airconsole;
    var is_dev = isDeveloperMode();
    var device_id = ac.getDeviceId();
    var data = AirConsoleService.getDeviceData(device_id);
    $scope.player.is_developer = is_dev;
    $scope.player.device_id = data.device_id;
    $scope.player.name = data.name;
    $scope.player.img = data.img;
    $scope.player.is_premium = data.is_premium;
    evaluateMaster(device_id);
  };

  var registerEvents = function() {
    $scope.airconsole.on(AirConsoleService.Event.Connect, function(device_id, data) {
      evaluateMaster(device_id);
      $scope.update();
    });

    $scope.airconsole.on(AirConsoleService.Event.Disconnect, function(device_id, data) {
      evaluateMaster(device_id);
      $scope.update();
    });

    $scope.airconsole.on(AirConsoleService.Event.ProfileChange, function(device_id, data) {
      if ($scope.player.device_id === device_id) {
        preparePlayer();
        $scope.update();
      }
    });

    $scope.airconsole.on(AirConsoleService.Event.DeviceStateChange, function(device_id, data) {
      if (device_id === AirConsole.SCREEN && data.player_map_key) {
        var map = data.player_map_key;
        var device_data = map[$scope.player.device_id];
        if (device_data) {
          // Update players score
          var score = device_data.stats.score;
          if ($scope.player.game.score !== score) {
            $scope.player.game.score = score;
            $scope.update();
          }
        }
      }
    });

  };

  // =====================================================================================

  $scope.update = function() {
    $scope.$apply();
  };

  $scope.init = function() {

    AirConsoleService.onReady = function() {
      $scope.airconsole = AirConsoleService.instance();
      preparePlayer();
      ViewService.init();
      ViewService.onPath = function(path, params, from_same_device) {
        if ($location.path() !== path) {
          $location.path('/' + path);
          if (!from_same_device) {
            $scope.$apply();
          }
        }
      };
      SoundService.load(Ctrl.sounds);
      //
      DeviceSelectService.init();
      //
      registerEvents();
    };

    AirConsoleService.createInstance();
  };

}]);
