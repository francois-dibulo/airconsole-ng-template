AirApp.services.factory('DeviceSelectService', ['$http', '$q', 'SelectService',
    function ($http, $q, SelectService) {

  var service = angular.merge({}, SelectService);
  service.KEY = "device_select";

  service.list = [
    { name: "A" },
    { name: "B" },
    { name: "C" }
  ];

  service.init = function() {
    this.init_.apply(this);
  };

  return service;
}]);
