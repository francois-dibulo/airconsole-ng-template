AirApp.services.factory('PlayerService', ['AirConsoleService', 'SoundService', function (AirConsoleService, SoundService) {
  var service = {
    players: [],
    players_map: {},
    Event: {
      AddPlayer: 'ps.add_player',
      RemovePlayer: 'ps.remove_player',
      ProfileChange: 'ps.player_profile_change',
    },
    STORAGE_LAST_VISIT_KEY: "ps.player_last_visit_ts",
    DATA_PLAYER_MAP_KEY: "ps.player_map_key"
  };

  var airconsole = null;

  // ======================================================
  // SHARED
  // ======================================================

  var player_colors = [
    '#f3a31d', '#e54450', '#774e9a', '#774e9a',
    '#6bc245', '#ecdefa', '#ffed1b', '#1a9567',
    '#77bbff', '#ff9900', '#99ee00', '#f4359e',
    '#651067', '#b82e2e', '#329262', '#9c5935',
    '#3b3eee', '#fb9a99', '#ccbb22', '#cab2d6',
    '#aaffaa', '#b91383', '#008800', '#660000',
    '#ff0000', '#ffff00', '#00ff00', '#0000ff',
    '#743411', '#111177', '#b77322', '#66aa00',
    '#00aac6', '#a9c413', '#9e8400', '#5574a6',
    '#777777', '#999999', '#bbbbbb', '#eeeeee'
  ];

  service.init = function() {

    airconsole = AirConsoleService.instance();

    // ======================================================
    // SCREEN
    // ======================================================
    if (AirConsoleService.isScreen()) {

      service.updatePlayersMap = function() {
        airconsole.setCustomDeviceStateProperty(service.DATA_PLAYER_MAP_KEY, this.players_map);
      };

      service.addPlayer = function(device_id) {
        if (this.getPlayerByDeviceId(device_id) !== null) return;
        var color = player_colors[device_id] || player_colors[0];
        var player = AirConsoleService.getDeviceData(device_id);
        player.color = color;
        player.stats = {
          score: 0,
          // Map => uid: {total, correct}
          map: {}
        };

        var screen_data = AirConsoleService.getScreenCustomData();
        if (screen_data && screen_data.current_state) {
          player.is_active_round = screen_data.current_state !== AC.State.Ingame;
        }
        this.players.push(player);
        this.players_map[device_id] = player;

        airconsole.requestPersistentData([player.uid]);

        this.updatePlayersMap();
        return player;
      };

      service.removePlayer = function(device_id) {
        var index = this.getPlayerByDeviceId(device_id, true);
        if (index !== null) {
          this.players.splice(index, 1);
          delete this.players_map[device_id];
        } else {
          throw "Could not remove player with device_id " + device_id;
        }
        this.updatePlayersMap();
      };

      service.getPlayer = function(device_id) {
        return this.players_map[device_id];
      };

      service.getPlayerByDeviceId = function(id, as_index) {
        var player = null;
        for (var i = 0; i < this.players.length; i++) {
          if (this.players[i].device_id === id) {
            player = as_index ? i : this.players[i];
            break;
          }
        }
        return player;
      };

      service.getPlayers = function() {
        return this.players;
      };

      service.saveLastVisit = function() {
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          airconsole.storePersistentData(service.STORAGE_LAST_VISIT_KEY, +new Date(), player.uid);
        }
      };

      service.loopPlayers = function(cb) {
        for (var i = 0; i < this.players.length; i++) {
          cb(this.players[i], i);
        }
      };

      service.getLastVisit = function() {
        var ts = null;
        for (var i = 0; i < this.players.length; i++) {
          var player = this.players[i];
          if (player.last_visit_ts) {
            if (!ts || (ts && ts < player.last_visit_ts)) {
              ts = player.last_visit_ts;
            }
          }
        }
        return ts;
      };

      airconsole.on(AirConsoleService.Event.OnPersistentDataLoaded,
        function(device_id, params) {
          var user_data = params.data;
          var storage_key = service.STORAGE_LAST_VISIT_KEY;
          if (user_data) {
            for (var i = 0; i < service.players.length; i++) {
              var uid = service.players[i].uid;
              if (user_data[uid]) {
                // Save last visited timestamp if available
                if (user_data[uid][storage_key]) {
                  service.players[i].last_visit_ts = user_data[uid][storage_key];
                }
              }
            }
          }
      });

      airconsole.on(AirConsoleService.Event.Connect, function(device_id, params) {
        var player = service.addPlayer(device_id);
        airconsole.dispatchEvent(device_id, {
          event_name: service.Event.AddPlayer,
          params: {
            player: player
          }
        });
      });

      airconsole.on(AirConsoleService.Event.Disconnect, function(device_id, params) {
        service.removePlayer(device_id);
        airconsole.dispatchEvent(device_id, {
          event_name: service.Event.RemovePlayer,
          params: {
            device_id: device_id
          }
        });
      });

      airconsole.on(AirConsoleService.Event.ProfileChange, function(device_id, device_data) {
        if (device_data) {
          var player = service.getPlayerByDeviceId(device_id);
          if (player) {
            player.name = device_data.name;
            player.img = device_data.img;
          }
        }

        airconsole.dispatchEvent(device_id, {
          event_name: service.Event.ProfileChange,
          params: {
            device_id: device_id,
            player: player
          }
        });
      });

      service.updatePlayersMap();

    // ======================================================
    // CTRL
    // ======================================================
    } else {

    }

  }

  return service;
}]);
