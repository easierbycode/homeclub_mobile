pushNotificationApp.factory('Alert', function($q) {
  return {
    all: function() {
      var d = $q.defer();
  
      get('http://alerts.homeclub.us/alerts', null, function(err, resp) {
        if(err) return d.reject(err);
        alert(resp);
        d.resolve(JSON.parse(resp));
      });
      
      return d.promise;
    }
  }
});