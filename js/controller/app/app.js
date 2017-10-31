var VIEW_PATH = "views/controller/";
var dependencies = Config.getDependencies();

AirApp.app = angular.module(Config.APP_NAME, dependencies);

AirApp.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: VIEW_PATH + 'splash_view.html',
        controller: 'SplashCtrl'
      }).
      when('/lobby', {
        templateUrl: VIEW_PATH + 'lobby_view.html',
        controller: 'LobbyCtrl'
      }).
      when('/game', {
        templateUrl: VIEW_PATH + 'game/game_view.html',
        controller: 'GameCtrl'
      }).
      when('/game_end_win', {
        templateUrl: VIEW_PATH + 'game/game_end_win_view.html',
        controller: "GameEndCtrl"
      }).
      when('/game_end_lose', {
        templateUrl: VIEW_PATH + 'game/game_end_lose_view.html',
        controller: "GameEndCtrl"
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
