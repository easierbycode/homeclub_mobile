var module = angular.module('DeviceModel', ['restangular']);

module.factory('DeviceRestangular', function(Restangular) {

  return Restangular.withConfig(function(RestangularConfigurer) {

    RestangularConfigurer.setBaseUrl('http://alerts.homeclub.us');

  });

});