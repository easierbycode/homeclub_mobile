window.pushCallbacks = {
  alertDismissed: function() {},
  
  errorHandler: function(error) { alert('error: ' + error) },
  
  sendTokenToServer: function(token) {
    var params = angular.extend(device, {
      token: token
    });
    
    alert(JSON.stringify(params));
  },
  
  successHandler: function(result) { alert('result: ' + result) }
};


pushCallbacks.APN = {
  onNotification: function(event) {
    if(event.alert) {
      alert(event.alert);
    }

    if(event.sound) {
      var snd = new Media(event.sound);
      snd.play();
    }

    if(event.badge) {
      pushNotification.setApplicationIconBadgeNumber(pushCallbacks.successHandler, event.badge);
    }
  },
  
  successfulRegistration: function(token) {
    pushCallbacks.sendTokenToServer(token);
  }
};
  

pushCallbacks.GCM = {
  onNotification: function(e) {
    switch(e.event) {
      case 'registered':
        var token = e.regid;
        
        if(token.length) {
          pushCallbacks.sendTokenToServer(token);
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
  },
  
  successfulRegistration: function(id) {}
};