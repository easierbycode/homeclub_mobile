var models = angular.module('hc.models', []);

models.factory('Alert', function($q) {
  return {
    all: function() {
      var d = $q.defer();
  
      get('https://api.mongolab.com/api/1/databases/homeclub/collections/alert?apiKey=dVe_7wqJOPnX0jePzHXah5W8mcGXhuvg', null, function(err, resp) {
        if(err) return d.reject(err);
        d.resolve(JSON.parse(resp));
      });
      
      return d.promise;
    }
  }
});