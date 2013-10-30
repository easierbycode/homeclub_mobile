pushNotificationApp.factory('Alert', function($resource) {
  $resource('http://alerts.homeclub.us/getAlerts');
});