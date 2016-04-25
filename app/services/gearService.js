var app = angular.module('campture');
app.factory('GearService', ['$http', '$q', function ($http, $q) {
    var Gear = Parse.Object.extend("Gears");

    var gear = new Gear();

    return {
        getWeatherDataFromCloud: getWeatherDataFromCloud
    };

    function getWeatherDataFromCloud(coordinates, dateTime,duration, callback) {
        var data = {
            coordinates: coordinates,
            dateTime: dateTime,
            duration: duration
        }
        Parse.Cloud.run("getGearData", data, {
            success: function (object) {
                callback(object);
            },

            error: function (object, error) {
                console.log(object + ' ' + error);
            }
        });
    }
} ]);