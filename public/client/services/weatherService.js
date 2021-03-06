/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){
    angular
        .module('weather')
        .factory("weatherService", weatherService);


    function weatherService($http, $q){

        var GoogleAPIKey = "AIzaSyB0p62vFkkTZWwjOAUWbMBAytxIkbpPy6c";
        var weatherAPIKey = "aa7eb74cde7b5118eb567834d8c4216c";
        var sharedLocation = null;

        var api = {
            getCurrentLatLng : getCurrentLatLng,
            getCurrentLocation : getCurrentLocation,
            getCurrentWeatherInfo: getCurrentWeatherInfo,
            getSearchLocationLatLng : getSearchLocationLatLng,
            getSearchWeather : getSearchWeather,
            getSearchLocationFullName: getSearchLocationFullName,
            getWeatherByLatLng : getWeatherByLatLng,
            getSearchLocatinoFullNameByLatLng: getSearchLocatinoFullNameByLatLng,
            saveSearchingHistory: saveSearchingHistory,
            getSearchHistory : getSearchHistory,
            getDate : getDate,
            getDrawLineColorsData: drawLineColors,
            autoFillLocation : autoFillLocation,
            getSharedLocation : getSharedLocation,
            setSharedLocation : setSharedLocation,
            getCorrespondingWeatherIcons: getCorrespondingWeatherIcons
        };

        return api;



//clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
        function getCorrespondingWeatherIcons(icon){
            var result = null;
            switch (icon){
                case "clear-day": result = "wi wi-day-sunny";
                    break;
                case "clear-night": result = "wi wi-night-clear";
                    break;
                case "rain": result = "wi wi-rain";
                    break;
                case "snow": result = "wi wi-snow";
                    break;
                case "sleet": result = "wi wi-sleet";
                    break;
                case "wind": result = "wi wi-windy";
                    break;
                case "fog": result = "wi wi-fog";
                    break;
                case "cloudy": result = "wi wi-cloudy";
                    break;
                case "partly-cloudy-day": result = "wi wi-day-cloudy";
                    break;
                case "partly-cloudy-night": result = "wi wi-night-alt-cloudy";
                    break;
                default : result = "wi wi-na";
            }

            return result;



        }
        function setSharedLocation(location){
            sharedLocation = location;
        }


        function getSharedLocation(){
            return sharedLocation;
        }

        function autoFillLocation(location){
            var deferred = $q.defer();
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                location +
                "&key=" +
                GoogleAPIKey;

            $http.get(url).
                success(function(response) {
                    console.log(response);
                    deferred.resolve(response);
                });
            return deferred.promise;
        }


        function drawLineColors(weatherInfo){
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'X');
            data.addColumn('number', 'MaxTemperature');
            data.addColumn('number', 'MinTemperature');

            var weatherData = weatherInfo.daily.data;
            var rowsArray = [];
            for(i = 0; i < 7; i ++) {
                var eachWeatherData =  [getDate(weatherData[i].time),weatherData[i].temperatureMax, weatherData[i].temperatureMin];
                rowsArray.push(eachWeatherData);
            }
            data.addRows(rowsArray);
            return data;
        }


        function getDate(num){
            var myDate = new Date(1000*num);

            return myDate.toString().substring(0,4);


        }

        function getSearchHistory(){
            return $http.get("/api/history");

        }

        function saveSearchingHistory(result){
            var address = {
              address: result
            };
            return $http.post("/api/history", address);

        }



        //Get The Whole Data which includes the name
        function getSearchLocatinoFullNameByLatLng(loc){
            var deferred = $q.defer();
            var lat = loc.lat;
            var lng = loc.lng;

            var url = "https://maps.googleapis.com/maps/api/geocode/json?" +
                "latlng=" +
                lat +
                "," +
                lng +
                "&key=" +
                GoogleAPIKey;
            $http.get(url)
                .success(function(response){
                    //console.log(response);
                    deferred.resolve(response);
                });

            return deferred.promise;

        }




        function getWeatherByLatLng(loc){
            var deferred = $q.defer();
            if(loc.lat != 'undefined'&&loc.lng != 'undefined'){
                var lat = loc.lat;
                var lng = loc.lng;
                var url ="https://json2jsonp.com/?url=" +
                    "https://api.forecast.io/forecast/" +
                    weatherAPIKey +
                    "/" +
                    lat +
                    "," +
                    lng +
                    "&&callback=JSON_CALLBACK";
                $http.jsonp(url)
                    .success(function(response){
                        deferred.resolve(response);
                    });

            }else{
                deferred.resolve(false);
            }

            return deferred.promise;


        }

        //Takes in a locaton, then return the full name of that location
        function getSearchLocationFullName(location){
            var deferred = $q.defer();
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                location +
                "&key=" +
                GoogleAPIKey;

            $http.get(url).
                success(function(response){
                    //console.log(response);
                    if(response.results.length <= 2&&response.results != 0){
                        var formatted_address = response.results[0].formatted_address;
                        deferred.resolve(formatted_address);

                    }else{
                        deferred.resolve(false);
                    }

                });

            return deferred.promise;

        }

        function getSearchWeather(location){
            var deferred = $q.defer();
           getSearchLocationLatLng(location).then(function(response){
               if(response){
                   var lat = response.lat;
                   var lng = response.lng;
                   var url ="https://json2jsonp.com/?url=" +
                       "https://api.forecast.io/forecast/" +
                       weatherAPIKey +
                       "/" +
                       lat +
                       "," +
                       lng +
                       "&&callback=JSON_CALLBACK";
                   $http.jsonp(url)
                       .success(function(response){
                           deferred.resolve(response);
                       })

               }else{
                   deferred.resolve(false);
               }
               return deferred.promise;
           });





        }


        function getSearchLocationLatLng(location){
            var deferred = $q.defer();
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                location +
                "&key=" +
                GoogleAPIKey;

            //console.log(url);
            $http.get(url).
                success(function(response){
                    if(response.results.length <= 2&&response.results != 0){
                        var location = response.results[0].geometry.location;
                        deferred.resolve(location);

                    }else{
                        deferred.resolve(false);
                    }

                });

            return deferred.promise;

        }






        function getCurrentLatLng(){
            var deferred = $q.defer();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                   // console.log(position);
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    deferred.resolve(pos);
                });
            } else {
                // Browser doesn't support Geolocation
                console.log("The brower doen't support Geolocation");
                deferred.resolve(false);
            }
            return deferred.promise;
        }
        //Get the name of the current location


        function getCurrentLocation(){
            var deferred = $q.defer();
            getCurrentLatLng().then(function(loc){
                if(loc){
                   // console.log(loc);
                    var lat = loc.lat;
                    var lng = loc.lng;

                    var url = "https://maps.googleapis.com/maps/api/geocode/json?" +
                        "latlng=" +
                        lat +
                        "," +
                        lng +
                        "&key=" +
                        GoogleAPIKey;
                    $http.get(url)
                        .success(function(response){
                           // console.log(response);
                            deferred.resolve(response);
                        });

                }else{
                    deferred.resolve(false);

                }

            });
           return deferred.promise;

        }



        function getCurrentWeatherInfo(){
            var deferred = $q.defer();
            getCurrentLatLng().then(function(loc){
                if(loc){
                    var lat = loc.lat;
                    var lng = loc.lng;
                    var url ="https://json2jsonp.com/?url=" +
                        "https://api.forecast.io/forecast/" +
                        weatherAPIKey +
                        "/" +
                        lat +
                        "," +
                        lng +
                        "&&callback=JSON_CALLBACK";
                    $http.jsonp(url)
                        .success(function(response){
                           // console.log(response);
                            deferred.resolve(response);
                        })

                }else{
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        }

    }




})();