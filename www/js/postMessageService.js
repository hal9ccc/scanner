'use strict';

angular.module('scanner.services', [])
  .factory('postMessageService', function($rootScope) {
  var $messages = ['Bärbel', 'Uschi', 'Monika'];
  var api = {
    messages: function(_message_) {
      if (_message_) {
        $messages.push(_message_);
        $rootScope.$apply();
      }
      return $messages;
    },
    outgoing: function(message) {
      $rootScope.$broadcast('outgoingMessage', message);
    }
  };
  return api;
});