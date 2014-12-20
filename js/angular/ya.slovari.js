angular.module('app').
    factory('_ya',function ($http, _yaKey) {
        var lookup = function(text, lang) {
            return $http.get("https://dictionary.yandex.net/api/v1/dicservice.json/lookup", {
                params: {
                    key: _yaKey,
                    lang: lang,
                    text: text
                }
            })
        };

        return {
            lookup: lookup
        }
    });