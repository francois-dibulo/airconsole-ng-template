AirApp.services.factory('ViewService', ['AirConsoleService', function (AirConsoleService) {
  var service = {
    ctrl: {},
    screen: {},
    Event: {
      OnPathChange: "view_service.on_path_change"
    }
  };

  // ======================================================
  // SHARED
  // ======================================================
  var airconsole = null;

  service.screen.current_view = null;
  service.ctrl.current_view = null;

  service.onPath = function(path) {};

  // ======================================================
  // SCREEN
  // ======================================================
  service.init = function() {

    airconsole = AirConsoleService.instance();
    airconsole.on(service.Event.OnPathChange, function(from, params) {
      service.onPath(params.view, params.params);
    });

    service.deviceGo = function(device_id, path, params) {
      airconsole.sendEvent(device_id, service.Event.OnPathChange, {
        view: path,
        params: params
      });
    };

    service.masterGo = function(path, params) {
      var master_id = airconsole.getMasterControllerDeviceId();
      this.deviceGo(master_id, path, params);
    };

    service.screen.ctrlsGo = function(path, params) {
      airconsole.broadcastEvent(service.Event.OnPathChange, {
        view: path,
        params: params
      });
    };


    if (AirConsoleService.isScreen()) {

      // A device connects
      airconsole.on(AirConsoleService.Event.Connect, function(from, params) {
        // var view_to_show = service.screen.current_view;

        // Redirects
        // if (view_to_show === 'game') {
        //   view_to_show = 'game_running'
        // }

        // airconsole.sendEvent(from, service.Event.OnPathChange, {
        //   view: view_to_show
        // });
      });

      service.screen.go = function(path, ctrl_too, params) {
        if (ctrl_too) {
          airconsole.broadcastEvent(service.Event.OnPathChange, {
            view: path,
            params: params
          });
        }
        service.screen.current_view = path;
        service.onPath(path, params, true);
      };

    // ======================================================
    // CTRL
    // ======================================================
    } else {

      service.ctrl.go = function(path, all_devices, params) {
        if (all_devices) {
          airconsole.broadcastEvent(service.Event.OnPathChange, {
            view: path,
            params: params
          });
        }
        service.ctrl.current_view = path;
        service.onPath(path, params, true);
      };

      service.ctrl.screenGo = function(path, params) {
        this.deviceGo(AirConsole.SCREEN, path, params);
      };

    }
  }

  return service;
}]);
