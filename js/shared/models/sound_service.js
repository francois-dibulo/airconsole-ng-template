AirApp.services.factory('SoundService', [function () {

  var BASE_URL = 'assets/sounds/';

  return {

    load: function(sounds) {
      soundManager.setup({
        debugMode: false,
        onready: function() {
          for (var key in sounds) {
            var sound_file = sounds[key];
            soundManager.createSound({url: BASE_URL + sound_file, id: key});
          }
        }
      });
    },

    play: function(key, opts) {
      opts = opts || {};
      if (opts.mute) {
        this.stopAll();
      }
      soundManager.play(key, opts);
    },

    stopAll: function() {
      soundManager.stopAll();
    },

    /*
      SoundService.play("end_game", {
        mute: true,
        onfinish: function() {
          SoundService.play("happy_game_show", { mute: true });
        }
      });
    */
    playQueue: function(list, opts, random) {
      var self = this;
      if (!list) return;
      if (random) {
        shuffleArray(list);
      }
      opts = opts || {};

      var playTrack = function playTrack(id) {
        var play_opts = {};
        play_opts = angular.copy(opts, play_opts);
        play_opts.onfinish = function() {
          var next_id = list.pop();
          list.unshift(next_id);
          playTrack(next_id);
        }

        self.play(id, play_opts);
      };

      playTrack(list[0]);
    }

  };

}]);
