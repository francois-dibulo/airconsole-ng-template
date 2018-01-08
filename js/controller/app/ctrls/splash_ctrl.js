AirApp.controllers.controller('SplashCtrl',
  ['$scope', '$timeout', 'ViewService', 'AirConsoleService',
  function ($scope, $timeout, ViewService, AirConsoleService) {

  var evts = {};
  var splash_timeout = null;

  $scope.init = function() {
    $timeout(function() {
      ViewService.ctrl.go(Shared.View.Lobby);
    }, 3000);
  };

  $scope.$on("$destroy", function() {
    $timeout.cancel(splash_timeout);
    for (var id in evts) {
      $scope.airconsole.off(evts[id]);
    }
  });

}]);
