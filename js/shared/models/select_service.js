AirApp.services.factory('SelectService', ['AirConsoleService',
    function (AirConsoleService) {

  var service = {
    KEY: "select_key",
    Event: {
      OnValueChanged: "select.value_changed"
    },
    airconsole: null,
    lists: {}
  };

  service.addList = function(key, values, single_value) {
    var device_id = this.airconsole.getDeviceId();
    var is_mulitple = single_value !== undefined;
    this.lists[device_id][key] = {
      values: values,
      selected: is_mulitple ? single_value : [],
      multiple: is_mulitple
    };
  };

  service.getList = function(key) {
    key = key || this.KEY;
    var device_id = this.airconsole.getDeviceId();
    if (this.lists[device_id] && this.lists[device_id][key] && device_id !== undefined) {
      return this.lists[device_id][key];
    }
  };

  service.isSelectedValue = function(key, value) {
    var device_id = this.airconsole.getDeviceId();
    var device_lists = this.lists[device_id];
    if (!device_lists) {
      return false;
    }
    var selected = device_lists[key].selected;
    if (angular.isArray(selected)) {
      return selected.indexOf(value) > -1;
    } else {
      return selected === value;
    }
  };

  service.hasSelectedValue = function(key) {
    var device_id = this.airconsole.getDeviceId();
    var device_lists = this.lists[device_id];
    if (!device_lists) {
      return false;
    }
    var list = device_lists[key];
    if (list.multiple) {
      return list.selected.length > 0;
    } else {
      return list.selected;
    }
  };

  service.onSelectionChanged = function(from_device_id, data) {
    var device_id = this.airconsole.getDeviceId();
    var key = data.key;
    var selected = data.selected;
    this.lists[device_id][key].selected = selected;
  };

  service.selectScreenItem = function(key, value) {
    this.selectItem(key, value, AirConsole.SCREEN);
  };

  service.selectItem = function(key, value, target_device_id) {
    var device_id = this.airconsole.getDeviceId();
    var select_item = this.lists[device_id][key];
    if (angular.isArray(select_item.selected)) {
      var value_index = select_item.selected.indexOf(value);
      if (value_index === -1) {
        select_item.selected.push(value);
      } else {
        select_item.selected.splice(value_index, 1);
      }
    } else {
      if (value === select_item.selected) {
        select_item.selected = null;
      } else {
        select_item.selected = value;
      }
    }
    // UPDATE
    if (target_device_id !== undefined) {
      this.airconsole.sendEvent(target_device_id, this.Event.OnValueChanged, {
        key: key,
        selected: select_item.selected
      });
    }
  };

  service.init_ = function() {
    var is_screen = AirConsoleService.isScreen();
    this.airconsole = AirConsoleService.instance();

    var device_id = this.airconsole.getDeviceId();
    this.lists[device_id] = {};

    this.airconsole.on(this.Event.OnValueChanged, function(device_id, data) {
      this.onSelectionChanged.call(this, device_id, data);
    }.bind(this));
  };

  return service;
}]);
