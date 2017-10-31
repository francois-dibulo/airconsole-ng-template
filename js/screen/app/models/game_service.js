 AirApp.services.factory('GameService', ['$http', '$q', 'PlayerService', 'AirConsoleService',
    function ($http, $q, PlayerService, AirConsoleService) {

  var service = {};
  var airconsole = null;

  service.init = function() {
    airconsole = AirConsoleService.instance();
  };

  return service;
}]);
