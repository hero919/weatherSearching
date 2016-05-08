/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){

    angular
        .module('weather')
        .controller('searchHistoryController', searchHistory);

    function searchHistory($http, $scope, weatherService, $location){
        $scope.sample = "sample";
        $http.get("/api/history").then(function(response){
            if(Array.isArray(response.data)) {
                $scope.history = response.data;
            }else{
                $scope.message = "You have no search results for now.";

            }
        });

        var vm = this;
        function init(){
            vm.getAndSetSearchResult = getAndSetSearchResult;
        }
        init();




        function getAndSetSearchResult(his){
            weatherService.saveSearchingHistory(his);
            weatherService.setSharedLocation(his);
            weatherService.getSearchLocationLatLng(his).then(function (response) {
                $location.url('/weatherSearch/' +
                    response.lat +
                    ',' +
                    response.lng);
            });

        }

    }



})();