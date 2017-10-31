AirApp.services.factory('SelectService', ['AirConsoleService',
    function (AirConsoleService) {

  var Track = {
    Screen: "screen",
    Ctrl: "ctrl"
  };

  var service = {
    KEY: "select_key",
    list: [],
    track_by: "screen",
    selections: {},
    Event: {
      OnIndexChanged: "select.index_changed"
    },
    airconsole: null,
    track_map: {},
  };

  service.track = function(key, cb) {
    if (!this.track_map[device_id]) {
      this.track_map[device_id] = {};
    }
    this.track_map[device_id][key] = cb;
  };

  service.onSelectionChanged = function(device_id, index) {
    this.selections[device_id] = index;
    if (this.track_by === Track.Screen) {
      this.selections[AirConsole.SCREEN] = index;
    }
    if (AirConsoleService.isScreen()) {

    }
  };

  service.init_ = function() {
    var is_screen = AirConsoleService.isScreen();
    this.airconsole = AirConsoleService.instance();

    this.selections[this.airconsole.getDeviceId()] = 0;

    this.airconsole.on(this.Event.OnIndexChanged, function(device_id, index) {
      this.onSelectionChanged(device_id, index);
    }.bind(this));

  };

  service.getList = function() {
    return this.list;
  };

  service.setIndex = function(index) {
    this.selections[this.airconsole.getDeviceId()] = index;
    if (!AirConsoleService.isScreen()) {
      this.airconsole.sendEvent(AirConsole.SCREEN, this.Event.OnIndexChanged, index);
    }
  };

  service.selectNext = function() {
    var next = this.getSelectedIndex() + 1;
    if (next > this.list.length - 1) {
      next = 0;
    }
    this.setIndex(next);
  };

  service.selectPrev = function() {
    var prev = this.getSelectedIndex() - 1;
    if (prev < 0) {
      prev = this.list.length - 1;
    }
    this.setIndex(prev);
  };

  service.getSelectedItem = function() {
    return this.list[this.getSelectedIndex()];
  };

  service.getSelectedIndex = function() {
    if (!this.airconsole) return 0;
    return this.selections[this.airconsole.getDeviceId()] || 0;
  };

  service.isSelectedItem = function(index) {
    return this.getSelectedIndex() === index;
  };

  return service;
}]);
