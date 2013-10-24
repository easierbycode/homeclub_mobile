pushNotificationApp.controller('IndexCtrl', function($resource, $scope, PhonegapService) {
  
  $scope.token = undefined;
  
  $scope.createDevice = function(deviceAttrs) {
    var Device = $resource('http://alerts.homeclub.us/devices');
    
    var newDevice = new Device(deviceAttrs);
    
    newDevice.$save(function(d, respHeaders) {
      alert('savedDevice: ' + JSON.stringify(d));
      alert('resp: ' + JSON.stringify(respHeaders));
    })
  };

  PhonegapService.ready.then(function() {
    
    pushNotification = window.plugins.pushNotification;

    if(device.platform == 'iOS') {
      
      $scope.token = 'Requesting APNS token';
      
      pushNotification.register(
        pushCallbacks.APN.successfulRegistration,
        pushCallbacks.errorHandler,
        {
          "badge":"true",
          "sound":"true",
          "alert":"true",
          "ecb":"pushCallbacks.APN.onNotification"
        }
      )
    } else {
      
      $scope.token = 'Requesting GCM token';
      
      pushNotification.register(
        pushCallbacks.GCM.successfulRegistration,
        pushCallbacks.errorHandler,
        {
          "senderID":"125902103424",
          "ecb":"pushCallbacks.GCM.onNotification"
        }
      )
    }
  });
});