/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){

    angular
        .module('weather')
        .controller('searchHistoryController', searchHistory);

    function searchHistory($http, $scope){
        $http.get("/api/history").then(function(response){
            if(Array.isArray(response.data)) {
                $scope.history = response.data;
            }else{
                $scope.message = "You have no search results for now.";

            }

        })




    }



})();