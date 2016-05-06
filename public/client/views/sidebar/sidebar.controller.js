/**
 * Created by zeqingzhang on 5/5/16.
 */
(function(){
    angular
        .module('weather')
        .controller('sidebarController',sidebarController);


    function sidebarController($location){
        var vm = this;

        function init(){
            vm.$location = $location;
        }

        init();


    }





})();