AirApp.services.factory('DeviceSelectService', ['SelectService',
    function (SelectService) {

  var service = {};
  service.KEY = AC.List.Mode;

  service.list = [
    { name: "A" },
    { name: "B" },
    { name: "C" }
  ];

  service.init = function() {
    SelectService.addList(this.KEY, this.list, [0], AirConsole.SCREEN);
  };

  return service;
}]);
