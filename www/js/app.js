// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('scanner', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',
  'ionic.service.deploy',
  'scanner.controllers',
  'scanner.services',
  'scanner.directives'
])
.constant('debug', true)

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: 'YOUR_APP_ID',
    // The public API key all services will use for this app
    api_key: 'YOUR_API_KEY',
    // The GCM project ID (project number) from your Google Developer Console (un-comment if used)
    //gcm_id: 'GCM_ID',
  });
}])

.run(function($rootScope, $ionicDeploy, $ionicPlatform, $cordovaStatusbar) {

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // Color the iOS status bar text to white
    if (window.StatusBar) {
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusBar.style(1); //Light
    }

    // Default update checking
    $rootScope.updateOptions = {
      interval: 2 * 60 * 1000
    };

    // Watch Ionic Deploy service for new code
    $ionicDeploy.watch($rootScope.updateOptions).then(function() {}, function() {}, function(hasUpdate) {
      $rootScope.lastChecked = new Date();
      console.log('WATCH RESULT', hasUpdate);
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $provide) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  // Welcome tab
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeController as vm'
      }
    }
  })

  .state('tab.messages', {
    url: '/messages',
    views: {
      'tab-messages': {
        templateUrl: 'templates/tab-messages.html',
        controller: 'MessagesCtrl'
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');


  // catch exceptions in angular
  $provide.decorator('$exceptionHandler', ['$delegate', function($delegate){
    return function(exception, cause){
      $delegate(exception, cause);

      var data = {
        type: 'angular',
        url: window.location.hash,
        localtime: Date.now()
      };
      if(cause)               { data.cause    = cause;              }
      if(exception){
        if(exception.message) { data.message  = exception.message;  }
        if(exception.name)    { data.name     = exception.name;     }
        if(exception.stack)   { data.stack    = exception.stack;    }
      }

      //if(debug){
        console.log('exception', data);
        window.alert('Error: '+data.message);
      //} else {
        track('exception', data);
      //}
    };
  }]);

  // catch exceptions out of angular
  window.onerror = function(message, url, line, col, error){
    var stopPropagation = false;//debug ? false : true;
    var data = {
      type: 'javascript',
      url: window.location.hash,
      localtime: Date.now()
    };
    if(message)       { data.message      = message;      }
    if(url)           { data.fileName     = url;          }
    if(line)          { data.lineNumber   = line;         }
    if(col)           { data.columnNumber = col;          }
    if(error){
      if(error.name)  { data.name         = error.name;   }
      if(error.stack) { data.stack        = error.stack;  }
    }

    //if(debug){
      console.log('exception', data);
      window.alert('Error: '+data.message);
    //} else {
      track('exception', data);
    //}

    return stopPropagation;
  };  

});
