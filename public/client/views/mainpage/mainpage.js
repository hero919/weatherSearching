/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){
    angular
        .module('weather')
        .controller("mainpageController", MainpageController);


    function MainpageController(weatherService, $scope, $route){
        //weatherService.getCurrentLocation().then(function(response){
        //    console.log(response);
        //})


        function convertFtoC(f){
            return Math.floor((f - 32) * (5/9));
        }



        weatherService.getCurrentLocation().then(function(response){
            $scope.location = response.results[0].formatted_address;
        });


        weatherService.getCurrentWeatherInfo().then(function(response){
            $scope.currently = response.currently;
            $scope.icon = response.currently.icon;
            $scope.temperatureF = response.currently.temperature;
            $scope.temperatureC = convertFtoC(response.currently.temperature);


            function drawLineColors() {

                var options = {
                    hAxis: {
                        title: 'Time'
                    },
                    vAxis: {
                        title: 'Temperature(F)'
                    },
                    colors: ['#a52714', '#097138'],

                    'title':'CurrentLocationTemprature',
                    'width':800,
                    'height':500
                };

                var chart = new google.visualization.LineChart(document.getElementById('currentLocationTempratureChart'));
                chart.draw(weatherService.getDrawLineColorsData(response), options);
            }


            google.charts.setOnLoadCallback(drawLineColors);

        });





    }






})();
