pushNotificationApp.factory('AllAlerts', function($q) {
  var deferred = $q.defer();
  
  get('http://alerts.homeclub.us/alerts', null, function(err, resp) {
    if(err) return deferred.reject(err);
    deferred.resolve(JSON.parse(resp));
  });
  
  return deferred.promise;
})