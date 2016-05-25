(function () {
    'use strict';

    var app = angular.module('campture');
    app.directive('formSubmit', function () {
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: function (scope, element, attrs) {
                var theForm = document.getElementById('theForm');
                var x = attrs;
                new stepsForm(theForm, {
                    onSubmit: function (form) {
                        // hide form		

                        scope.$parent.submitForm(scope.ngModel);
                        classie.addClass(theForm.querySelector('.simform-inner'), 'hide');

                        /*		
                        form.submit()		
                        or		
                        AJAX request (maybe show loading indicator while we don't have an answer..)		
                        */

                        // let's just simulate something...		
                        var messageEl = theForm.querySelector('.final-message');
                        messageEl.innerHTML = 'Hey, that was pretty good! <br />It was a pleasure speaking to you! <h4>Keep a lookout at our Blog, we might just feature your trip with the world!</h4><h4>Travel - Explore - Repeat<br />Cheers!</h4></br> ';
                        classie.addClass(messageEl, 'show');
                        scope.$parent.isFormSubmitted = true;
                    }
                });
            }
        };
    });
    app.controller('ChatWithCamptureCtrl', ['$scope', 'AccountService', controller]);
    function controller($scope, accountService) {
        //====== Scope Variables==========		
        //================================		
        $scope.form = new Object();
        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
        var placeId;
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
            placeId = details.place_id;
        };
        $scope.loginForChat = function () {

            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                    if (!user.existed()) {
                        accountService.getMyProfile().then(function (response) {
                            $scope.fbResponse = response
                            accountService.updateUserFacebookProfile(response, user.id, function (data) {
                                $scope.$apply(function () {
                                    if (data) {
                                        var x = data;
                                        var currentUser = Parse.User.current();
                                        currentUser.set('facebook_profile', $scope.fbResponse);
                                        currentUser.save();
                                        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
                                    }
                                });
                            });
                        });
                    }
                    else {
                        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
                        $scope.$apply();
                    }
                },
                error: function (user, error) {
                    console.log("Cancelled");
                }
            });
        };
        $scope.submitForm = function (form) {
            var data = {
                formData: form,
                user: $scope.userObj,
                placeId: placeId
            }
            Parse.Cloud.run("postChatWithCampture", data, {
                success: function (object) {
                    $scope.submitted = false;
                    $('#feedbackModal').modal('hide');
                    $('#response').html('Email sent!').addClass('success').fadeIn('fast');
                    $scope.form = undefined;
                },

                error: function (object, error) {
                    $scope.submitted = false;
                    $('#feedbackModal').modal('hide');
                    console.log(error);
                    $('#response').html('Error! Email not sent!').addClass('error').fadeIn('fast');
                }
            });
        }
    };
})();