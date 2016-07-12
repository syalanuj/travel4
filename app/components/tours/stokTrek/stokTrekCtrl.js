(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('StokTrekCtrl', ['$scope', '$location', '$anchorScroll', '$route', 'TourService', controller]);
    function controller($scope, $location, $anchorScroll, $route, tourService) {
        //====== Scope Variables==========
        //================================
        $scope.pillTabIndex = 0;
        $scope.privateGroupTabIndex = 0;
        $scope.numberOfPeople = 1;
        $scope.peoplesCost = 0

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        }
        $scope.updatePillTabPos = function (pos) {
            $scope.pillTabIndex = pos;
        }
        $scope.updatePrivateGroupTab = function (pos) {
            $scope.privateGroupTabIndex = pos;
        }
        $scope.priceList = [{ people: 2, cost_per_person: 16000 }, { people: 4, cost_per_person: 12500 }, { people: 6, cost_per_person: 10500 }, { people: 8, cost_per_person: 6500}]
        $scope.calculatePeoplesCost = function(){
            if($scope.numberOfPeople <= 2){
                $scope.peoplesCost = 16000 * $scope.numberOfPeople  
            }
            else if (peopleCount <= 4){
                $scope.peoplesCost = 12500  * $scope.numberOfPeople
            }
            else if (peopleCount <= 6){
                $scope.peoplesCost = 10500  * $scope.numberOfPeople
            }
            else if (peopleCount <= 8){
                $scope.peoplesCost = 6500  * $scope.numberOfPeople
            }
        }

        function getMarkhaTrekPriceDetails() {
            tourService.getMarkhaTrekPriceDetails(function (data) {
                if (data) {

                }
            })
        }
        //getMarkhaTrekPriceDetails()
    };
})();