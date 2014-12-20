angular.module('app').
    factory('_ya',function ($http, _yaKey) {
        var lookup = function(text, to, from) {
            return $http.get("http://suggest-slovari.yandex.ru/suggest-lingvo", {
                params: {
                    v: 2,
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