AirApp.services.factory('DeviceSelectService', ['$http', '$q', 'SelectService',
    function ($http, $q, SelectService) {

  var service = angular.merge({}, SelectService);
  service.KEY = AC.List.Mode;

  service.list = [
    { name: "A" },
    { name: "B" },
    { name: "C" }
  ];

  service.init = function() {
    this.init_.apply(this);
    this.addList(this.KEY, this.list , [0]);
  };

  return service;
}]);
