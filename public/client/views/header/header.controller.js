/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){
    angular
        .module('weather')
        .controller("headerController", headerController);

    function headerController($scope, weatherService, $location) {
        console.log("asdasdasd");

        var location = $scope.location;
        console.log("*****");
        console.log(location);

        $scope.checkIfEnterKeyWasPressed = function ($event) {
            var keyCode = $event.which || $event.keyCode;
            if (keyCode === 13) {
                console.log($scope.location);
                var location = $scope.location;
                weatherService.getSearchLocationLatLng(location).then(function(response){
                    console.log(response);
                    $location.url('/weatherSearch/' +
                        response.lat +
                        ',' +
                        response.lng);

                    weatherService.getSearchLocatinoFullNameByLatLng(response).then(function(fullName){
                        if(fullName.results.length != 0) {
                            var fullName = fullName.results[0].formatted_address;
                            $scope.location = fullName;
                            weatherService.saveSearchingHistory(fullName);
                        }
                    })
                });



            }


        }
    }

})();