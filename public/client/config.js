/**
 * Created by zeqingzhang on 5/5/16.
 */
/**
 * Created by zeqingzhang on 3/7/16.
 */
(function () {
    "use strict";

    angular.module('weather')
        .config(config);

    function config($routeProvider) {
        $routeProvider.
            when('/mainpage', {
                templateUrl: 'views/mainpage/mainpage.view.html',
                controller:"mainpageController"
            }).
            when('/weatherSearch/:lat,:lng', {
                templateUrl: 'views/searchResults/searchResults.view.html',
                controller: 'searchResultsController',
                controllerAs: "model"
            }).
            when('/searchHistory', {
                templateUrl: 'views/searchHistory/searchHistory.view.html',
                controller: 'searchHistoryController',
                controllerAs: "model"
            }).
            //
            //when('/airlinesSearching', {
            //    templateUrl: 'views/airlinesSearching/airlinesSearching.view.html',
            //    controller: 'airlinesSearchingController',
            //    controllerAs: "model"
            //    //controllerAs: "model"
            //}).
            //when('/register', {
            //    templateUrl: 'views/register/register.view.html',
            //    controller: 'RegisterController',
            //    controllerAs: "model"
            //
            //}).
            //when('/favoriteAirlines', {
            //    templateUrl: 'views/favoriteAirlines/favoriteAirlines.view.html',
            //    controller: 'favoriteAirlinesController',
            //    controllerAs: "model"
            //
            //}).
            //
            ////#/api/project/airlines/{{airline._id}}/details
            //
            //when('/api/project/airlines/:flightId/details', {
            //    templateUrl: 'views/favoriteAirlines/favoriteAirlines.view.html',
            //    controller: 'favoriteAirlinesController',
            //    controllerAs: "model"
            //
            //
            //}).
            //
            //when('/api/project/hotels/:hotelId/:checkInDate/:checkOutDate/details', {
            //    templateUrl: 'views/favoriteAirlines/favoriteAirlines.view.html',
            //    controller: 'favoriteAirlinesController',
            //    controllerAs: "model"
            //
            //}).
            //
            //
            //
            //
            //when('/flightSearch', {
            //    templateUrl: 'views/airlinesSearching/airlinesSearching.view.html',
            //    controller: "airlinesSearchingController"
            //    // controllerAs:"model"
            //}).
            //when('/flightSearch/from/:flyFrom/to/:flyTo/:year/:month/:day/maxFlight/:maxFlight', {
            //    templateUrl: 'views/airlinesSearching/airlinesSearching.view.html',
            //    controller: "airlinesSearchingController"
            //    // controllerAs:"model"
            //}).
            //when('/hotelSearch', {
            //    templateUrl: 'views/hotelsSearching/hotelsSearching.view.html',
            //    controller: "hotelsSearchingController"
            //    //controllerAs:"model"
            //}).
            //when('/hotelSearch/location/:location/checkInDate/:checkInDate/checkOutDate/:checkOutDate/radius/:radius/maxHotels/:maxHotels', {
            //    templateUrl: 'views/hotelsSearching/hotelsSearching.view.html',
            //    controller: "hotelsSearchingController"
            //    //controllerAs:"model"
            //}).

            otherwise({
                redirectTo: 'mainpage'
            });
    }










})();