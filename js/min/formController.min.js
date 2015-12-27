angular.module('pageApp', [])
.controller('formController', function($scope, $http) {
    $scope.user = {
        name: 'Joe',
        phone: '80982395776',
        email: 'gooddealthanks@gmail.com',
        message: 'Hello'
    };
    $scope.processForm = function() {
        $http({
                method  : 'POST',
                url     : 'forms.php',
                data    : $.param($scope.user),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                console.log(data);
                $scope.message = data.message;
        });
    };
});