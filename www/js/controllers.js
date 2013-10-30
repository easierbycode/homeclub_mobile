pushNotificationApp.controller('IndexCtrl', function($scope, PhonegapService) {

  PhonegapService.ready.then(function() {
    
    pushNotification = window.plugins.pushNotification;
    
    $scope.alerts = [];
    $scope.token = localStorage.getItem('token');
    
    if(! $scope.token) {

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
    }
    
    get('http://alerts.homeclub.us/alerts', null, function(err, resp) {
      if(err) return;
      $scope.$apply(function() { $scope.alerts = JSON.parse(resp); });
    });
  });
});