AirApp.services.factory('TrackPropertyService', ['AirConsoleService',
    function (AirConsoleService) {

  var airconsole = null;
  var service = {
    properties: {}
  };

  service.init = function() {
    airconsole = AirConsoleService.instance();
    airconsole.on(AirConsoleService.Event.DeviceStateChange, function(device_id, data) {
      for (var key in data) {
        if (this.properties[key]) {
          for (var i = 0; i < this.properties[key].length; i++) {
            this.properties[key][i](device_id, data[key]);
          }
        }
      }
    });
  };

  service.set = function(prop, value) {
    airconsole.setCustomDeviceStateProperty(prop, value);
  };

  service.track = function(prop, cb) {
    if (!this.properties[prop]) {
      this.properties[prop] = [];
    }
    this.properties[prop].push(cb);
  };

  return service;

}]);
