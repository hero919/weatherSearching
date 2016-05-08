/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){
    angular
        .module('weather')
        .controller("headerController", headerController);

    function headerController($scope, weatherService, $location) {
        var location = $scope.location;
        $scope.checkIfEnterKeyWasPressed = function ($event) {
            var keyCode = $event.which || $event.keyCode;
            if (keyCode === 13) {
                var location = $scope.location;

                weatherService.getSearchLocationFullName(location).then(function(response){
                    if(response) {
                        $scope.location = response;
                        weatherService.saveSearchingHistory(response);
                        weatherService.setSharedLocation(response);
                        weatherService.getSearchLocationLatLng(location).then(function (response) {
                            console.log(response);
                            $location.url('/weatherSearch/' +
                                response.lat +
                                ',' +
                                response.lng);
                        });
                    }else{
                        $location.url('/weatherSearch/' +
                            response.lat +
                            ',' +
                            response.lng);
                    }

                });





            }


        }
    }

})();