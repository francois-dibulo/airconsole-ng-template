AirApp.controllers.controller('SplashCtrl',
  ['$scope', '$timeout', 'ViewService', 'AirConsoleService',
  function ($scope, $timeout, ViewService, AirConsoleService) {

  var evts = {};

  $scope.init = function() {
    $timeout(function() {
      ViewService.ctrl.go(Shared.View.Lobby);
    }, 1000);
  };

  $scope.$on("$destroy", function() {
    for (var id in evts) {
      $scope.airconsole.off(evts[id]);
    }
  });

}]);
