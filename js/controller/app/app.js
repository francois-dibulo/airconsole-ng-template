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
      when('/loading', {
        templateUrl: VIEW_PATH + 'game/loading_view.html',
      }).
      when('/game', {
        templateUrl: VIEW_PATH + 'game/game_view.html',
        controller: 'GameCtrl'
      }).
      when('/end', {
        templateUrl: VIEW_PATH + 'end_view.html',
        controller: 'GameEndCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
