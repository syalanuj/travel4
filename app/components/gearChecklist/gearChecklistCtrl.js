(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('GearChecklistCtrl', ['$scope', '$cookies', '$rootScope', 'uiGmapIsReady', '$routeParams', 'GearService', controller]);
    function controller($scope, $cookies, $rootScope, uiGmapIsReady, $routeParams, gearService) {
        //====== Scope Variables==========
        //================================
        $scope.coordinates = { latitude: $routeParams.lat, longitude: $routeParams.lon };
        $scope.map = { center: $scope.coordinates, zoom: 12 };
        $scope.marker = { id: 0, bounds: {}, coords: $scope.coordinates };
        $scope.frameSrc = 'http://forecast.io/embed/#lat=28.6139&lon=77.2090';
        $scope.location = $routeParams.formattedAddress;
        $scope.dateValue = $routeParams.dateString;
        $scope.duration = $routeParams.numberOfDays;
        $scope.options;
        $scope.date;
        $scope.status = {
            opened: false
        };
        $scope.gearList;
        var temperatureGrade;
        var durationGrade;
        $scope.isResultsShown = false;
        $scope.profileTabPos = 0;

        $scope.details = function (details) {
            $scope.location = new Object();
            $scope.coordinates = { latitude: details.geometry.location.lat(), longitude: details.geometry.location.lng() };
            $scope.location.locationDetails = details;
            $scope.location.formatted_address = details.formatted_address;
            $scope.marker = {
                id: 1,
                coords: $scope.coordinates
            }
            $scope.map = { center: { latitude: $scope.coordinates.latitude, longitude: $scope.coordinates.longitude }, zoom: 12 }

        };


        $scope.open = function ($event) {
            $scope.status.opened = true;
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.getGearCheckList = function () {
            gearService.getWeatherDataFromCloud($scope.coordinates, $scope.dateValue, $scope.duration, function (data) {
                if (data) {
                    $scope.gearList = data.gearList;
                    $scope.minTemp = data.minTemp;
                    $scope.maxTemp = data.maxTemp;
                    $scope.isResultsShown = true;
                    $scope.$apply();
                }
            });

        }
        $scope.getGearCheckList();
        $scope.updateTabPos = function (pos) {
            $scope.profileTabPos = pos;
        }

    };
})();