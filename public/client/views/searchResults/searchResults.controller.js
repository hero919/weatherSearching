/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){
    "use strict";
    angular
        .module('weather')
        .controller("searchResultsController", searchResultsController);

    function searchResultsController($routeParams,weatherService, $scope){
        var lat = $routeParams.lat;
        var lng = $routeParams.lng;

        var loc = {
            lat: lat,
            lng: lng
        };


        function convertFtoC(f){
            return Math.floor((f - 32) * (5/9));
        }

        weatherService.getSearchLocatinoFullNameByLatLng(loc).then(function(response){
            if(response.results.length != 0) {
                $scope.location = response.results[0].formatted_address;
            }else{
                $scope.message = "The Enter Location can't be found or have multiple choices. Please Specify the location";
            }


        });

        weatherService.getWeatherByLatLng(loc).then(function(response){
            if(response) {
                $scope.precipType = response.currently.precipType;
                $scope.temperatureF = response.currently.temperature;
                $scope.temperatureC = convertFtoC(response.currently.temperature);
                google.charts.setOnLoadCallback(drawLineColors);
            }else{
                $scope.message = "The Enter Location can't be found or have multiple choices. Please Specify the location";
            }


            function drawLineColors() {

                var options = {
                    hAxis: {
                        title: 'Time'
                    },
                    vAxis: {
                        title: 'Temperature(F)'
                    },
                    colors: ['#a52714', '#097138'],

                    'title':'searchLocationTemperature',
                    'width':800,
                    'height':500
                };

                var chart = new google.visualization.LineChart(document.getElementById('searchLocationTemperatureChart'));
                chart.draw(weatherService.getDrawLineColorsData(response), options);
            }

            //google.charts.load("current", {packages: ['corechart', 'line']});


        });










    }

})();