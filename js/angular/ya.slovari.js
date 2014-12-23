angular.module('app').
    factory('_ya',function ($http, _yaKey) {
        var lookup = function(text, to, from) {
            return $http.jsonp("https://suggest-slovari.yandex.ru/suggest-lingvo?callback=JSON_CALLBACK", {
                params: {
                    v: 6,
                    part: text,
                    to: to,
                    from: from ? from : ''
                }
            })
        };

        return {
            lookup: lookup
        }
    });