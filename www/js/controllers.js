angular.module('scanner.controllers', [])
    .controller('HomeController', function($scope, $rootScope, $cordovaBarcodeScanner, $ionicPlatform) {
        var vm = this;

        vm.scan = function(){
            $ionicPlatform.ready(function() {
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(result) {
                        // Success! Barcode data is here
                        vm.scanResults = "We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled;
                    }, function(error) {
                        // An error occurred
                        vm.scanResults = 'Error: ' + error;
                    });
            });
        };

        $scope.sendMessage = function() {
            postMessageService.outgoing($scope.outgoingMessage);
            $scope.outgoingMessage = "";
        };

        vm.scanResults = '';
    })

    .controller('MessagesCtrl', function($rootScope, $scope, postMessageService) {
        $scope.messages = postMessageService.messages();
    });
