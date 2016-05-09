/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){
    angular
        .module('weather')
        .controller("mainpageController", MainpageController);


    function MainpageController(weatherService, $scope){
        //weatherService.getCurrentLocation().then(function(response){
        //    console.log(response);
        //})



        var vm = this;
        function init(){
            vm.$scope = $scope;
            vm.weatherService = weatherService;
        }
        init();

        function convertFtoC(f){
            return Math.floor((f - 32) * (5/9));
        }

        function getTime(num){
            var date = new Date(num*1000);
            return date.toString().substring(0,21);
        }


        weatherService.getCurrentLocation().then(function(response){
            $scope.location = "You are now around: "+ response.results[0].formatted_address;
        });


        weatherService.getCurrentWeatherInfo().then(function(response){
            //console.log(response);
            if(response) {
                $scope.currently = response.currently;
                $scope.icon = response.currently.icon;
                $scope.weatherIcons = weatherService.getCorrespondingWeatherIcons(response.currently.icon);
                $scope.temperatureF = Math.floor(response.currently.temperature);
                $scope.temperatureC = convertFtoC(response.currently.temperature);
                $scope.time = getTime(response.currently.time);
                var summary = "Summary: " + response.currently.summary;

                $scope.summary = summary;

                var Precipitation = "Precipitation: " + Math.floor(response.currently.precipProbability) * 100 + "%";
                $scope.Precipitation = Precipitation;

                var humidity = "Humidity: " + Math.floor(response.currently.humidity * 100) + "%";
                $scope.humidity = humidity;

                var wind = "Wind: " + Math.floor(response.currently.windSpeed) + " miles/hour";

                $scope.wind = wind;
                $scope.futureDays = response.daily.data;


                function drawLineColors() {
                    var options = {
                        hAxis: {
                            title: 'Time'
                        },
                        vAxis: {
                            title: 'Temperature(F)'
                        },
                        colors: ['#a52714', '#097138'],

                        'title': 'CurrentLocationTemprature',
                        'width': 800,
                        'height': 500
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('currentLocationTemperatureChart'));
                    chart.draw(weatherService.getDrawLineColorsData(response), options);
                }


                //console.log(document.getElementById('currentLocationTemperatureChart'));
                google.charts.setOnLoadCallback(drawLineColors);
            }else{

            }

        });





    }






})();
