function post(url, params) {
  var req = new XMLHttpRequest();
  req.open('POST', url);
  req.send(params);
};

function get(url, params, cb) {
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onreadystatechange = function (e) {
    if (req.readyState != 4) return;

    if(req.status == 200)
      cb(null, req.responseText);
    else
      cb("Error loading page");

  };
  req.send(params);
}


window.pushCallbacks = {
  alertDismissed: function() {},
  
  successHandler: function(result) { alert('result: ' + result) },
  
  errorHandler: function(error) { alert('error: ' + error) },
  
  sendTokenToServer: function(platform, token) {
    // get angular $scope
    // var scope = angular.element(document.body).scope();
    var postUrl = 'http://alerts.homeclub.us/devices';
    var params = 'platform=' + platform + '&token=' + token;
    
    // scope.$apply(function() { scope.token = token; });
    
    post(postUrl, params);
    
    get('http://alerts.homeclub.us/alerts', null, function(err, resp) {
      var scope = angular.element(document.body).scope();
      
      scope.$apply(function() {
        scope.token = token;
        scope.alerts = JSON.parse(resp);
      })
    })
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
      pushNotification.setApplicationIconBadgeNumber(pushCallbacks.successHandler, pushCallbacks.errorHandler, event.badge);
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
        if(e.foreground) {
          alert('foreground message');
        } else {
          if(e.coldstart) {
            alert('coldstart message');
          } else {
            alert('hotstart message');
          }
        }
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