pushNotificationApp.controller('IndexCtrl', function($scope, $resource, PhonegapService) {
  
  console.log('.. inside IndexCtrl');
  
  window.foo = 'monkey';
  
  var Device = $resource('http://alerts.homeclub.us/devices');
  
  $scope.token = undefined;

  $scope.alertDismissed = function() {
  };
  
  $scope.createDevice = function(token) {

    alert('token: ' + token);    
    $scope.token = token;
    
    var attrs = angular.extend(device, {
      token: token
    });
    
    var newDevice = new Device(attrs);
    
    newDevice.$save(function(d, putResponseHeaders) {
      //d => saved device object
      //putResponseHeaders => $http header getter
      
      console.log(d);
      console.log(putResponseHeaders);
    }); 
  };

  $scope.apnSuccessfulRegistration = function(token) {
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might token to send it the token for later use.
    $scope.createDevice(token);
  };

  $scope.errorHandler = function(error) {
    alert('error = ' + error);
  };

  $scope.successHandler = function(result) {
    alert('result = ' + result);
  };

  $scope.onNotificationAPN = function(event) {
    if(event.alert) {
      navigator.notification.alert(event.alert, $scope.alertDismissed);
    }

    if(event.sound) {
      var snd = new Media(event.sound);
      snd.play();
    }

    if(event.badge) {
      pushNotification.setApplicationIconBadgeNumber($scope.successHandler, event.badge);
    }
  };
  
  // callback for all GCM events
  $scope.onNotificationGCM = function(e) {
    switch(e.event) {
      case 'registered':
        if(e.regid.length > 0) {
          $scope.createDevice(e.regid);
        }
        break;
        
      case 'message':
        // getMessageFromServer();
        alert('new message on server');
        break;
        
      case 'error':
        alert('GCM error: ' + e.msg);
        break;
        
      default:
        alert('An unknown GCM event has occured');
        break;
    }
  };
  
  $scope.gcmSuccessfulRegistration = function(id) {
  };

  // $document.addEventListener('deviceready', function() {
  PhonegapService.ready.then(function() {
    $scope.receivedEvent('deviceready');
    
    pushNotification = window.plugins.pushNotification;

    if(device.platform == 'iOS') {
      
      pushNotification.register(
        $scope.apnSuccessfulRegistration,
        $scope.errorHandler,
        {
          "badge":"true",
          "sound":"true",
          "alert":"true",
          "ecb":"$scope.onNotificationAPN"
        }
      )
    } else {
      pushNotification.register(
        $scope.gcmSuccessfulRegistration,
        $scope.errorHandler,
        {
          "senderID":"125902103424",
          "ecb":"$scope.onNotificationGCM"
        }
      )
    }
  });
});