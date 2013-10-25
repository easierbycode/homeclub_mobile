pushNotificationApp.controller('IndexCtrl', function($scope, PhonegapService) {
  
  $scope.token = undefined;
  
  $scope.createDevice = function(deviceAttrs) {
    alert(JSON.stringify(deviceAttrs));
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