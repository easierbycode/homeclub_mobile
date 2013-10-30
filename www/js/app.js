window.pushNotificationApp = angular.module('pushNotificationApp', []);


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