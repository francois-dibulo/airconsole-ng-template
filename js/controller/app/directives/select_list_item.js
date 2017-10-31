AirApp.directives.directive("selectItem", ['DeviceSelectService',
    function(DeviceSelectService) {
  return {
    // E = element, A = attribute, C = class, M = comment
    restrict: 'EA',
    templateUrl: 'views/controller/directives/_select_list.html',
    scope: {
      // @ reads the attribute value, = provides two-way binding, & works with functions
      items: '=items',
      key: '@'
    },
    // Embed a custom controller in the directive
    controller: function($scope) {
      var key = $scope.key;
      $scope.current_index = 0;
      $scope.list = $scope.items;
      var list = DeviceSelectService.getList(key);
      var is_multi = list.multiple;

      $scope.isSelectedItem = function(value) {
        return DeviceSelectService.isSelectedValue(key, value);
      };

      $scope.prevItem = function() {
        var prev = $scope.current_index - 1;
        if (prev < 0) {
          prev = $scope.list.length - 1;
        }
        $scope.selectIndex(prev);
      };

      $scope.nextItem = function() {
        var next = $scope.current_index + 1;
        if (next > $scope.list.length - 1) {
          next = 0;
        }
        $scope.selectIndex(next);
      };

      $scope.selectIndex = function(index) {
        $scope.current_index = index;
        DeviceSelectService.selectScreenItem(key, $scope.current_index);
      };

    },
    // DOM manipulation
    link: function ($scope, element, attrs) {

    }
  };
}]);
