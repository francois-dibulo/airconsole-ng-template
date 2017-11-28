AirApp.controllers.controller('MainCtrl',
    ['$scope', '$location', 'AirConsoleService', 'SoundService', 'ViewService', 'SelectService', 'DeviceSelectService',
    function ($scope, $location, AirConsoleService, SoundService, ViewService, SelectService, DeviceSelectService) {

  $scope.airconsole = null;
  $scope.player = {
    uid: null,
    is_developer: false,
    device_id: null,
    name: null,
    img: null,
    is_master: false,
    is_premium: false,
    game: {}
  };

  var evaluateMaster = function(device_id) {
    $scope.player.is_master = AirConsoleService.isMasterPlayer();
    $scope.update();
  };

  var preparePlayer = function() {
    var ac = $scope.airconsole;
    var is_dev = AirConsoleService.isDeveloperMode();
    var device_id = ac.getDeviceId();
    var data = AirConsoleService.getDeviceData(device_id);
    $scope.player.uid = data.uid;
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
      SoundService.load(Ctrl.sounds);
      //
      SelectService.init_();
      DeviceSelectService.init();
      //
      registerEvents();
      $scope.update();
    };

    AirConsoleService.createInstance();
  };

}]);
