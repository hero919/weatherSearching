/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){
    "use strict";
    angular
        .module('weather')
        .controller("searchResultsController", searchResultsController);

    function searchResultsController($routeParams,weatherService, $scope){

        var vm = this;
        function init(){
            vm.$scope = $scope;
            vm.weatherService = weatherService;
        }
        init();

        var lat = $routeParams.lat;
        var lng = $routeParams.lng;

        var loc = {
            lat: lat,
            lng: lng
        };



        function getTime(num){
            var date = new Date(num*1000);
            return date.toString().substring(0,21);
        }

        function convertFtoC(f){
            return Math.floor((f - 32) * (5/9));
        }

        weatherService.getSearchLocatinoFullNameByLatLng(loc).then(function(response){
            if(response.results.length != 0) {
                $scope.location = weatherService.getSharedLocation();
            }else{
                $scope.message = "The Enter Location can't be found or have multiple choices. Please Specify the location";
            }
        });

        weatherService.getWeatherByLatLng(loc).then(function(response){
            if(response) {
                $scope.currently = response.currently;
                $scope.icon = response.currently.icon;
                $scope.weatherIcons = weatherService.getCorrespondingWeatherIcons(response.currently.icon);
                $scope.temperatureF = Math.floor(response.currently.temperature);
                $scope.temperatureC = convertFtoC(response.currently.temperature);
                $scope.time = getTime(response.currently.time);
                var summary = "Summary: " + response.currently.summary;

                $scope.summary = summary;

                var Precipitation = "Precipitation: "+ Math.floor(response.currently.precipProbability)*100 + "%";
                $scope.Precipitation = Precipitation;

                var humidity = "Humidity: "+ Math.floor(response.currently.humidity*100) + "%";
                $scope.humidity = humidity;

                var wind = "Wind: " + Math.floor(response.currently.windSpeed) + " miles/hour";

                $scope.wind = wind;
                $scope.futureDays = response.daily.data;
                //console.log(document.getElementById('searchLocationTemperatureChart'));
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