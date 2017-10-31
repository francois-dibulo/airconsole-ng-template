var Screen = {
  sounds: {
    'player_join': 'player_join.m4a',
  },
  View: {
  }
};

var Ctrl = {
  sounds: {
  },
  View: {
    GameEndWin: 'game_end_win',
    GameEndLose: 'game_end_lose'
  }
};

var Shared = {
  View: {
    Lobby: "lobby",
    Ingame: "game",
    GameEnd: "game_end"
  }
};

/**
  CONSTANTS for message exchange
*/
var AC =  {};

AC.State = {
  Idle: 'idle',
  Ingame: 'ingame'
};

AC.Action = {
};

AC.Event = {
};


/**
  Angular JS setup
*/
var Config = {
  // @const {String} APP_NAME - The name of the angular module
  APP_NAME: 'airApp',
  // @var {Object} dependencies - Dictionary of the angular dependency modules
  dependencies: {
    controllers: 'airAppControllers',
    services: 'airAppServices',
    directives: 'airAppDirectives',
    filters: 'airAppFilters'
  },

  /**
   * @desc Returns list of dependencies
   * @return {Array}
   */
  getDependencies: function() {
    var dependencies = [];
    for(var depenceny in this.dependencies) {
      dependencies.push(this.dependencies[depenceny]);
    }
    dependencies.push('ngRoute');
    return dependencies;
  }
};

var AirApp = AirApp || {
  app: null,
  services: null,
  controllers: null,
  directives: null
};

/**
 * Provide shortcut and to avoid long module code.
 * Instead use it like:
 *   AirApp.controllers.controller('YourCtrl', ['$scope', function ($scope) { ... }]);
 */
AirApp.controllers = angular.module(Config.dependencies.controllers, []);
AirApp.services = angular.module(Config.dependencies.services, []);
AirApp.directives = angular.module(Config.dependencies.directives, []);
AirApp.filters = angular.module(Config.dependencies.filters, []);
