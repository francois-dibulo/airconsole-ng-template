var VIEW_PATH = "views/screen/";
AirApp.app = angular.module(Config.APP_NAME, Config.getDependencies());

AirApp.app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: VIEW_PATH + 'splash_view.html'
      }).
      when('/lobby', {
        templateUrl: VIEW_PATH + 'lobby_view.html',
        controller: 'LobbyCtrl'
      }).
      when('/game', {
        templateUrl: VIEW_PATH + 'game/_game_view.html',
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

window.onload = function() {
  AirApp.app.run(function($rootScope) {});
}
