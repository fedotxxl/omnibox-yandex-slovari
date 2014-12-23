angular.module('app').
    factory('_ya',function ($http, _yaKey) {
        var pairsToReverse = {
            ru: ['en', 'de', 'fr', 'it', 'es'],
            uk: ['en']
        };

        var pairsWithSpecialKeys = {
            uk: {
                en: 'enuk'
            },
            en: {
                uk: 'enuk'
            }
        };

        var getKey = function(pair) {
            var special = pairsWithSpecialKeys[pair.from];
            var key = (special) ? special[pair.to] : null;

            return key || pair.from + "-" + pair.to
        };

        var lookup = function(text, from, to) {
            return $http.jsonp("https://suggest-slovari.yandex.ru/suggest-lingvo?callback=JSON_CALLBACK", {
                params: {
                    v: 6,
                    part: text,
                    to: to,
                    from: from ? from : ''
                }
            })
        };

        var getFixedPair = function(pair) {
            var reverse = pairsToReverse[pair.from];

            if (reverse && _.contains(reverse, pair.to)) {
                return {
                    from: pair.to,
                    to: pair.from
                }
            } else {
                return {
                    from: pair.from,
                    to: pair.to
                }
            }
        };

        return {
            lookup: lookup,
            getFixedPair: getFixedPair,
            getKey: getKey
        }
    });