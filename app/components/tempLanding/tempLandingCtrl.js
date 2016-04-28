(function () {
    'use strict';

    var app = angular.module('campture');
    app.controller('TempLandingCtrl', ['$scope', '$cookies', '$rootScope', 'GearService', controller]);
    function controller($scope, $cookies, $rootScope, gearService) {
        //====== Scope Variables==========
        //================================
        $scope.emailField1;
        $scope.userName;
        $scope.emailField2;
        $scope.mailSubject;
        $scope.mailMessage;
        $scope.feedback = new Object();

        $scope.sendUserEmail = function () {
            var data = {
                email: $scope.emailField1
            }
            Parse.Cloud.run("sendEmailMailgun", data, {
                success: function (object) {
                    $('#response').html('Email sent!').addClass('success').fadeIn('fast');
                },

                error: function (object, error) {
                    console.log(error);
                    $('#response').html('Error! Email not sent!').addClass('error').fadeIn('fast');
                }
            });
        }
        $scope.sendUserQuery = function () {
            var data = {
                name: $scope.userName,
                email: $scope.emailField2,
                subject: $scope.mailSubject,
                message: $scope.mailMessage
            }
            Parse.Cloud.run("sendUserQuery", data, {
                success: function (object) {
                    $('#response').html('Email sent!').addClass('success').fadeIn('fast');
                },

                error: function (object, error) {
                    console.log(error);
                    $('#response').html('Error! Email not sent!').addClass('error').fadeIn('fast');
                }
            });
        }
        $scope.sendFeedback = function (isValid) {
            $scope.submitted = true;
            if (isValid) {
                var data = {
                    name: $scope.feedback.name,
                    email: $scope.feedback.email,
                    comments: $scope.feedback.comments
                }
                Parse.Cloud.run("sendFeedback", data, {
                    success: function (object) {
                        $scope.submitted = false;
                         $('#feedbackModal').modal('hide');
                        $('#response').html('Email sent!').addClass('success').fadeIn('fast');
                    },

                    error: function (object, error) {
                        $scope.submitted = false;
                         $('#feedbackModal').modal('hide');
                        console.log(error);
                        $('#response').html('Error! Email not sent!').addClass('error').fadeIn('fast');
                    }
                });
            }
        }
    };
})();