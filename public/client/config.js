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
            otherwise({
                redirectTo: 'mainpage'
            });
    }










})();