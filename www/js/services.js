pushNotificationApp.service('PhonegapService', function($document, $q) {
  var d = $q.defer();
  
  this.ready = d.promise;
  
  document.addEventListener('deviceready', function() {
    d.resolve(window.cordova);
  });
});