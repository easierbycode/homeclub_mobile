pushNotificationApp.factory('AllAlerts', function($q) {
  var d = $q.defer();
  
  get('http://alerts.homeclub.us/alerts', null, function(err, resp) {
    if(err) return d.reject(err);
    alert(resp);
    d.resolve(JSON.parse(resp));
  });
  
  return d.promise;
});