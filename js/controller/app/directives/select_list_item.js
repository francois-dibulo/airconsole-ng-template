AirApp.directives.directive("selectItem", ['SelectService', 'AirConsoleService',
    function(SelectService, AirConsoleService) {
  return {
    // E = element, A = attribute, C = class, M = comment
    restrict: 'EA',
    templateUrl: 'views/controller/directives/_select_list.html',
    scope: {
      // @ reads the attribute value, = provides two-way binding, & works with functions
      //items: '=items',
      key: '@',
      targetDeviceId: '@'
    },
    // Embed a custom controller in the directive
    controller: function($scope) {
      var key = $scope.key;
      var airconsole = AirConsoleService.instance();
      var target_device_id = parseInt($scope.targetDeviceId, 10);
      $scope.list = SelectService.getList(key, target_device_id).values;
      $scope.current_index = SelectService.getSelectedValues(key, target_device_id);

      $scope.isSelectedItem = function(value) {
        return SelectService.isSelectedValue(key, value, target_device_id);
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
        SelectService.selectItem(key, index, target_device_id);
      };

      airconsole.observeCustomProperty(target_device_id, SelectService.CUSTOM_DEVICE_KEY,
        function(new_value, old_value) {
          SelectService.syncDeviceList(target_device_id, new_value);
          $scope.current_index = SelectService.getSelectedValues(key, target_device_id);
          $scope.$apply();
      });

    },
    // DOM manipulation
    link: function ($scope, element, attrs) {

    }
  };
}]);
