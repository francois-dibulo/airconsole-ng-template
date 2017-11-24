AirApp.services.factory('AirConsoleService', ['SoundService', function (SoundService) {
  var airconsole = null;
  return {
    airconsole: airconsole,
    Event: {
      Ready: 'ac.ready',
      Connect: 'ac.connect',
      Disconnect: 'ac.disconnect',
      DeviceStateChange: 'ac.device_state_change',
      ProfileChange: 'ac.profile_change',
      Premium: "ac.on_premium",
      OnAdComplete: "ac.on_ad_complete",
      OnPersistentDataLoaded: 'ac.on_persistent_data_loaded'
    },
    connect_code: null,

    updateCustomData: function(custom_data) {
      var data = this.getCustomData() || {};
      for (var prop in custom_data) {
        data[prop] = custom_data[prop];
      }
      this.airconsole.setCustomDeviceState(data);
    },

    getCustomData: function(device_id, prop) {
      var custom_data = this.airconsole.getCustomDeviceState(device_id);
      if (custom_data && prop !== undefined) {
        custom_data = custom_data[prop];
      }
      return custom_data;
    },

    getScreenCustomData: function(prop) {
      return this.getCustomData(AirConsole.SCREEN, prop);
    },

    onReady: function() {},

    instance: function() {
      return this.airconsole;
    },

    showAd: function() {
      this.airconsole.showAd();
    },

    onAdShow: function() {
      SoundService.stopAll();
    },

    createInstance: function(opts) {
      var self = this;
      opts = opts || {};
      airconsole = new AirConsole(opts);

      airconsole.onReady = function(connect_code) {
        self.connect_code = connect_code;
        self.onReady();
      };

      airconsole.onConnect = function(device_id) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.Connect,
          params: {
            device_id: device_id
          }
        });
      };

      airconsole.onDisconnect = function(device_id) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.Disconnect,
          params: {
            device_id: device_id
          }
        });
      };

      airconsole.onMessage = function(device_id, data) {
        // Put this into your onMessage function to listen for events
        this.dispatchEvent(device_id, data);
      };

      airconsole.onCustomDeviceStateChange = function(device_id, custom_data) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.DeviceStateChange,
          params: custom_data
        });
        this.evaluateCustomData(device_id, custom_data);
      };

      airconsole.onDeviceProfileChange = function(device_id, data) {
        var profile_data = self.getDeviceData(device_id);
        this.dispatchEvent(device_id, {
          event_name: self.Event.ProfileChange,
          params: profile_data
        });
      };

      airconsole.onPremium = function(device_id) {
        this.dispatchEvent(device_id, {
          event_name: self.Event.Premium,
          params: {
            device_id: device_id
          }
        });
      };

      airconsole.onAdShow = this.onAdShow.bind(this);

      airconsole.onAdComplete = function(ad_was_shown) {
        this.dispatchEvent(AirConsole.SCREEN, {
          event_name: self.Event.OnAdComplete,
          params: null
        });
      };

      airconsole.onPersistentDataLoaded = function(data) {
        var device_id = this.getDeviceId();
        this.dispatchEvent(device_id, {
          event_name: self.Event.OnPersistentDataLoaded,
          params: {
            device_id: device_id,
            data: data
          }
        });
      };

      this.airconsole = airconsole;
    },

    on: function(evt, fn) {
      return this.airconsole.on(evt, fn);
    },

    off: function(event_id) {
      this.airconsole.off(event_id);
    },

    isMasterPlayer: function(device_id) {
      device_id = device_id || this.airconsole.getDeviceId();
      return this.airconsole.getMasterControllerDeviceId() === device_id;
    },

    getMasterPlayer: function() {
      var master_id = this.airconsole.getMasterControllerDeviceId();
      return {
        name: this.airconsole.getNickname(master_id),
        picture: this.airconsole.getProfilePicture(master_id)
      };
    },

    hasPremiumDevice: function() {
      return this.airconsole.getPremiumDeviceIds().length > 0;
    },

    getDeviceData: function(device_id) {
      device_id = device_id || this.airconsole.getDeviceId();
      var name = this.airconsole.getNickname(device_id);
      var picture = this.airconsole.getProfilePicture(device_id);
      var data = {
        uid: this.airconsole.getUID(device_id),
        device_id: device_id,
        name: name,
        img: picture,
        is_master: this.isMasterPlayer(device_id),
        is_premium: this.airconsole.isPremium(device_id)
      };
      return data;
    },

    isScreen: function() {
      return this.airconsole.getDeviceId() === AirConsole.SCREEN;
    },

    getConnectUrl: function() {
      var code = this.connect_code;
      code = code.replace(/\s/gi, "");
      return "https://www.airconsole.com/#!code=" + code;
    }

  };
}]);
