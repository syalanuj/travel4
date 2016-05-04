var app = angular.module('campture');
app.factory('GearService', ['$http', '$q', function ($http, $q) {

    return {
        getWeatherDataFromCloud: getWeatherDataFromCloud,
        gearBuyPoll: gearBuyPoll
    };

    function getWeatherDataFromCloud(coordinates, dateTime, duration, callback) {
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

    function gearBuyPoll(decision,callback) {
        var BuyGearPoll = Parse.Object.extend("Buy_Gear_Poll");
        var buyGearPoll = new BuyGearPoll();
        buyGearPoll.id = '93dN6sUy2T';
        if (decision == 0) {
            buyGearPoll.increment("no_count");
        }
        else{
            buyGearPoll.increment("yes_count");
        }
        buyGearPoll.save(null, {
            success: function (parseObject) {
                callback(parseObject)
            },
            error: function (gameScore, error) {
                console.log(error.message);
            }
        });
    }
} ]);