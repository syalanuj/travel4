(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('MarkhaValleyTrekCtrl', ['$scope', '$location', '$anchorScroll', '$route', controller]);
    function controller($scope, $location, $anchorScroll, $route) {
        //====== Scope Variables==========
        //================================
        $scope.pillTabIndex = 0;
        $scope.privateGroupTabIndex = 0;

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        }
        $scope.updatePillTabPos = function (pos) {
            $scope.pillTabIndex = pos;
            $scope.$apply()
        }
        $scope.updatePrivateGroupTab = function (pos) {
            $scope.privateGroupTabIndex = pos;
            $scope.$apply()
        }
    };
})();