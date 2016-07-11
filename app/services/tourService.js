var app = angular.module('campture');
app.factory('TourService', ['$http', '$q', function ($http, $q) {
    var TourPrice = Parse.Object.extend("Tour_Price");
    //var tourPrice = TourPrice();    

    return {
        getMarkhaTrekPriceDetails: getMarkhaTrekPriceDetails
    };

    function getMarkhaTrekPriceDetails(callback) {
        var tourPrice = TourPrice();
        var query = new Parse.Query(tourPrice);
        query.get("ER0eK6MkTl", {
            success: function (parseObject) {
                callback(JSON.parse(JSON.stringify(parseObject)));
            },
            error: function (object, error) {
                // The object was not retrieved successfully.
            }
        });
    }

} ]);