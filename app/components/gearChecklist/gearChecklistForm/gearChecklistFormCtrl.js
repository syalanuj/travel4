(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('GearChecklistFormCtrl', ['$scope', '$cookies', '$rootScope', 'uiGmapIsReady', '$location', 'GearService', controller]);
    function controller($scope, $cookies, $rootScope, uiGmapIsReady, $location, gearService) {
        //====== Scope Variables==========
        //================================
        $scope.coordinates = new Object();
        $scope.map = { center: { latitude: 28.6139, longitude: 77.2090 }, zoom: 4 };
        $scope.marker = { id: 0, bounds: {} };
        $scope.frameSrc = 'http://forecast.io/embed/#lat=28.6139&lon=77.2090';
        $scope.location;
        $scope.options;
        $scope.date;
        $scope.duration;
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
        $scope.getCheckList = function () {
            if ($scope.location && $scope.date && $scope.duration) {
                var dateString = $scope.date.toISOString();
                var dateString = dateString.substr(0, dateString.indexOf('T')) + 'T12:00:00-0400';
                $location.path('/gearChecklistResults/' + $scope.coordinates.latitude + '/' + $scope.coordinates.longitude + '/' + $scope.location + '/' + $scope.duration + '/' + dateString);
            }
        }
        $scope.getGearCheckList = function () {
            var dateString = $scope.date.toISOString();
            var dateString = dateString.substr(0, dateString.indexOf('T')) + 'T12:00:00-0400';
            gearService.getWeatherData($scope.coordinates, dateString).then(function (weatherData) {
                if (weatherData && weatherData.status == 200) {
                    if (weatherData.data.daily && weatherData.data.daily.data[0]) {
                        $scope.maxTemp = (weatherData.data.daily.data[0].temperatureMax - 32) * (5 / 9);
                        $scope.minTemp = (weatherData.data.daily.data[0].temperatureMin - 32) * (5 / 9);
                        temperatureGrade = getTemperatureGrade($scope.minTemp);
                        durationGrade = getDurationGrade($scope.duration);
                        gearService.getGearList(temperatureGrade, durationGrade, function (data) {
                            if (data) {
                                $scope.gearList = data;
                                $scope.isResultsShown = true;
                                $scope.$apply();
                            }
                        });
                    }
                }
            });
        }
        $scope.updateTabPos = function (pos) {
            $scope.profileTabPos = pos;
        }
        function getTemperatureGrade(temp) {
            var grade
            if (temp < -10) {
                grade = 0;
            }
            else if (temp < 0) {
                grade = 1;
            }
            else if (temp < 10) {
                grade = 2;
            }
            else if (temp < 20) {
                grade = 3;
            }
            else {
                grade = 4;
            }
            return grade;
        }
        function getDurationGrade(duration) {
            var grade
            if (duration <= 1) {
                grade = 0;
            }
            else if (duration <= 3) {
                grade = 1;
            }
            else if (duration <= 6) {
                grade = 2;
            }
            else {
                grade = 3;
            }
            return grade;
        }

    };
})();