AirApp.services.factory('SoundService', [function () {

  var BASE_URL = 'assets/sounds/';

  return {

    sounds_map: {},
    sound_ids: {},

    load: function(sounds) {
      this.sounds_map = sounds;
      for (var key in sounds) {
        var path = BASE_URL + sounds[key];
        this.sounds_map[key] = path;
        new Howl({
          src: [path]
        });
      }
    },

    play: function(key, opts) {
      opts = opts || {};
      if (opts.mute) {
        this.stopAll();
      }

      if (this.sounds_map[key]) {
        var sound_opts = {
          autoplay: true,
          src: [this.sounds_map[key]]
        };

        if (opts.loop) {
          sound_opts.loop = true;
        }

        var sound = new Howl(sound_opts);
        // Play returns a unique Sound ID that can be passed
        // into any method on Howl to control that specific sound.
        this.sound_ids[key] = sound;
        sound.play();

        return sound;
      }
    },

    stop: function(key) {
      var sound = this.sound_ids[key];
      if (sound) {
        sound.stop();
        delete this.sound_ids[key];
      }
    },

    stopAll: function() {
      for (var key in this.sound_ids) {
        this.stop(key);
      }
    },

    /*
     * Plays a list of soundtracks
     * @param {Array} list - List of sound keys
     * @param {Object} opts - { loop: <Boolean> }
     * @param {Boolean} random - If to sort randomly
     * Example:
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

        if (play_opts && !play_opts.loop) {
          list.shift(id);
        }

        var sound = self.play(id);

        var onfinish = function() {
          var next_id = list.pop();
          if (next_id) {
            if (play_opts && play_opts.loop) {
              list.unshift(next_id);
            }
            playTrack(next_id);
          }
        };

        sound.once('end', function() {
          onfinish();
        });
      };

      playTrack(list[0]);
    }

  };

}]);
