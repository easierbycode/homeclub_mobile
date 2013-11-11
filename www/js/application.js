// main ng-app
window.hc = angular.module('hc', [
  'hc.controllers',
  'hc.models',
  'ngAnimate',
  'ngRoute'
]).config(function($routeProvider) {
  $routeProvider.
    when('/dashboard', {
      templateUrl : 'partials/dashboard.html',
      controller  : 'DashboardCtrl'
    })
    .when('/alerts', {
    // .otherwise({
      templateUrl : 'partials/alerts_index.html',
      controller  : 'AlertCtrl'
    })
    .otherwise({
      templateUrl : 'partials/home.html'
    });
});


hc.run(function($rootScope, PhonegapService) {
  
  $rootScope.back = function() {
    window.history.back();
  };
  
  $rootScope.$on('$locationChangeStart', function(e, next, current) {
    if($rootScope.pageTransition) {
      $rootScope.pageTransition = /#/.test(next) ? 'bounceInRight' : 'bounceInLeft';
    } else {
      $rootScope.pageTransition = 'fade-in';
    }
  });
  
  PhonegapService.ready.then(function() {
    
    pushNotification = window.plugins.pushNotification;
    
    // when launching app for the first time
    // register with APN/GCM, then send token to alerts server
    if(! localStorage.getItem('token')) {

      if(device.platform == 'iOS') {
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
  });
});


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