AirApp.services.factory('SelectService', ['AirConsoleService',
    function (AirConsoleService) {

  var service = {
    KEY: "select_key",
    CUSTOM_DEVICE_KEY: "select_service_key",
    Event: {
      OnValueChanged: "select.value_changed"
    },
    airconsole: null,
    lists: {}
  };

  service.updateCustomData = function() {
    this.airconsole.setCustomDeviceStateProperty(this.CUSTOM_DEVICE_KEY, this.lists);
  };

  /**
   * @param {String} key - List key
   * @param {Array} values - List of values
   * @param {Mixed} single_value - Default selected value (E.g. 0 or [0])
   */
  service.addList = function(key, values, single_value, target_device_id) {
    var device_id = null;
    if (target_device_id === true) {
      device_id = this.getDeviceId();
    } else {
      device_id = this.getDeviceId(target_device_id);
    }
    var is_multiple = single_value === undefined || angular.isArray(single_value);
    if (is_multiple) {
      single_value = single_value || [];
    } else {
      single_value = single_value === undefined ? null : single_value;
    }
    var obj = {
      values: values,
      selected: single_value,
      multiple: is_multiple,
      default_value: single_value,
      target_device_id: target_device_id
    };

    if (!this.lists[device_id]) {
      this.lists[device_id] = {};
    }
    this.lists[device_id][key] = obj;

    // If only one device should have this list
    if (target_device_id !== undefined && target_device_id === device_id) {
      this.updateCustomData();
    }
  };

  /**
   * Returns a list from a device
   * @param {String} key - The list key
   * @param {Number} device_id
   */
  service.getList = function(key, device_id) {
    var list = null;
    device_id = this.getDeviceId(device_id);
    var lists = AirConsoleService.getCustomData(device_id, this.CUSTOM_DEVICE_KEY);
    if (lists) {
      list = lists[device_id][key];
    }
    return list;
  };

  service.getDeviceId = function (device_id) {
    return device_id !== undefined ? device_id : this.airconsole.getDeviceId();
  };

  service.isSelectedValue = function(key, value, device_id) {
    var device_list = this.getList(key, device_id);
    if (!device_list) {
      return false;
    }
    var selected = device_list.selected;
    if (angular.isArray(selected)) {
      return selected.indexOf(value) > -1;
    } else {
      return selected === value;
    }
  };

  service.getSelectedValues = function(key, device_id) {
    var list = this.getList(key, device_id);
    if (!list) {
      return null;
    }
    if (!list.multiple) {
      return list.values[list.selected];
    } else {
      var result = [];
      for (var i = 0; i < list.selected.length; i++) {
        var index = list.selected[i];
        result.push(list.values[index]);
      }
      return result;
    }
  };

  service.hasSelectedValue = function(key, device_id) {
    var list = this.getList(key, device_id);
    if (!list) {
      return false;
    }
    if (list.multiple) {
      return list.selected.length > 0;
    } else {
      return list.selected !== undefined;
    }
  };

  service.selectItem = function(key, value, target_device_id) {
    var device_id = this.airconsole.getDeviceId();
    target_device_id = target_device_id !== undefined ? target_device_id : device_id;
    var list = this.getList(key, target_device_id);

    // Change a list of another device
    if (target_device_id !== device_id) {

      this.airconsole.sendEvent(target_device_id, this.Event.OnValueChanged, {
        key: key,
        selected: value
      });

    // Changed own list and broadcast
    } else {

      // Update selected value
      if (angular.isArray(list.selected)) {
        var value_index = list.selected.indexOf(value);
        if (value_index === -1) {
          list.selected.push(value);
        } else {
          list.selected.splice(value_index, 1);
        }
      } else {
        list.selected = value;
      }

      this.updateCustomData();
    }

  };

  service.syncDeviceList = function(device_id, complete_lists) {
    this.lists[device_id] = complete_lists;
  };

  // Another device changes a list on this device
  service.onSelectionChanged = function(data) {
    var device_id = this.airconsole.getDeviceId();
    var key = data.key;
    var value = data.selected;
    var list = this.getList(key, device_id);

    if (angular.isArray(list.selected)) {
      var value_index = list.selected.indexOf(value);
      if (value_index === -1) {
        list.selected.push(value);
      } else {
        list.selected.splice(value_index, 1);
      }
    } else {
      list.selected = value;
    }

    this.updateCustomData();
  };

  service.init_ = function() {
    this.airconsole = AirConsoleService.instance();

    var device_id = this.airconsole.getDeviceId();
    this.lists[device_id] = {};

    this.airconsole.on(this.Event.OnValueChanged, function(device_id, data) {
      this.onSelectionChanged.call(this, data);
    }.bind(this));
  };

  return service;
}]);
