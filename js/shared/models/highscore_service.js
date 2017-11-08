AirApp.services.factory('HighScoreService', ['AirConsoleService',
    function (AirConsoleService) {

  var version = "1.0";
  var airconsole = null;
  var service = {
    Event: {
      OnHighScoresLoaded: 'hs.on_loaded'
    },
    highscores: {}
  };

  service.store = function(key, score, uid, data, label) {
    console.info("Saving: ", key, version, score, uid, data, label);
    airconsole.storeHighScore(key, version, score, uid, data, label);
  };

  service.load = function(key, uids, ranks, total, top) {
    airconsole.requestHighScores(key, version, uids, ranks, total, top);
  };

  service.onHighScoresLoaded = function(high_scores) {
    airconsole.dispatchEvent(AirConsole.SCREEN, {
      event_name: service.Event.OnHighScoresLoaded,
      params: high_scores
    });
  };

  service.init = function() {
    airconsole = AirConsoleService.instance();
    airconsole.onHighScores = this.onHighScoresLoaded.bind(this);
  };

  return service;

}]);
