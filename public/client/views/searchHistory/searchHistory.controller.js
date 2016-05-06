/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){

    angular
        .module('weather')
        .controller('searchHistoryController', searchHistory);

    function searchHistory($http, $scope){
        $http.get("/api/history").then(function(response){
            $scope.history = response.data;
        })






    }



})();