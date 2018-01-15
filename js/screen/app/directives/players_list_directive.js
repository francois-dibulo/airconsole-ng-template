/**
 * This is an example directive. Use it to kickstart a new directive.
 * Happy Coding. Please remove me before releasing.
*/
AirApp.directives.directive("playersList", [ 'AirConsoleService', 'PlayerService',
  function(AirConsoleService, PlayerService) {
  return {
    // E = element, A = attribute, C = class, M = comment
    restrict: 'EA',
    templateUrl: function(elem, attrs) {
      return attrs.templateUrl || 'views/screen/directives/_players_list_view.html';
    },
    scope: {
      // @ reads the attribute value, = provides two-way binding, & works with functions
    },
    // Embed a custom controller in the directive
    controller: function($scope) {

    },
    // DOM manipulation
    link: function ($scope, element, attrs) {
      $scope.players = [];
      var evts = {};
      var airconsole = AirConsoleService.instance();

      var setPlayers = function(no_update) {
        $scope.players = PlayerService.getPlayers();
        if (!no_update) {
          $scope.$apply();
        }
      };

      evts.on_add = airconsole.on(PlayerService.Event.AddPlayer, function() {
        setPlayers();
      });

      evts.on_rm = airconsole.on(PlayerService.Event.RemovePlayer, function() {
        setPlayers();
      });

      setPlayers(true);

      $scope.$on("$destroy", function() {
        for (var id in evts) {
          airconsole.off(evts[id]);
        }
      });

    }
  };
}]);
