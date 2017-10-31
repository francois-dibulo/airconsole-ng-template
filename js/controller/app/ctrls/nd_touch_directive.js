AirApp.directives.directive('ndTouch', [function() {
  return function(scope, element, attr) {
    var event_down = isMobile() ? 'touchstart' : 'mousedown';
    element.on(event_down, function(event) {
      scope.$apply(function() {
        scope.$eval(attr.ndTouch);
      });
      event.stopPropagation();
      event.preventDefault();
      return false;
    });
  };
}]);

AirApp.directives.directive('ndTouchEnd', [function() {
  return function(scope, element, attr) {
    var event_up = isMobile() ? 'touchend' : 'mouseup';
    element.on(event_up, function(event) {
      scope.$apply(function() {
        scope.$eval(attr.ndTouchEnd);
      });
      event.stopPropagation();
      event.preventDefault();
      return false;
    });
  };
}]);
