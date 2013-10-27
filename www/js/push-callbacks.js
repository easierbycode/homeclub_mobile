window.fooUrl = undefined;

window.pushCallbacks = {
  alertDismissed: function() {},
  
  successHandler: function(result) { alert('result: ' + result) },
  
  errorHandler: function(error) { alert('error: ' + error) },
  
  sendTokenToServer: function(platform, token) {
    // get angular $scope
    var scope = angular.element(document.body).scope();
    var postUrl = 'http://alerts.homeclub.us/devices?platform=' + platform + '&token=' + token;
    
    window.fooUrl = postUrl;
    
    scope.$apply(function() { scope.token = token; });
    
    jx.load(postUrl, pushCallbacks.successHandler, "json", "POST");
  }
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
    pushCallbacks.sendTokenToServer('iPhone', token);
  }
};
  

pushCallbacks.GCM = {
  onNotification: function(e) {
    switch(e.event) {
      case 'registered':
        var token = e.regid;
        
        if(token.length) {
          pushCallbacks.sendTokenToServer('Android', token);
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