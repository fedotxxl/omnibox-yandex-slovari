angular.module('app', ['common']).
    factory('_omni',function (_settings, _ya, _chrome, $rootScope) {
        var latestSuggest = 0;
        var settings = null;

        var getPairForPrefix = function(prefix) {
            if (prefix) {
                return _.find(settings.pairs, function(pair) {
                    return pair.prefix == prefix;
                });
            } else {
                return settings.default;
            }
        };

        var reload = function() {
            settings = _settings.get();
        };

        var splitSuggestion = function(suggest) {
            if (!suggest) suggest = '';

            var word, translations, request, pair;
            var pos = suggest.indexOf(" - ");

            if (pos > 0) {
                word = suggest.substring(0, pos).trim();
                translations = suggest.substring(pos + 3).trim();
            } else {
                word = suggest.trim();
            }

            if (word) {
                var space = word.indexOf(" ");
                if (space > 0) {
                    request = word.substring(space + 1);
                    pair = getPairForPrefix(word.substring(0, space));
                }
            }

            if (!pair) {
                request = word;
                pair = getPairForPrefix();
            }

            return {
                request: request,
                pair: pair,
                translations: translations
            }
        };

        var convertResponseToSuggest = function(data) {
            var answer = [];
            var word = data[0];
            var suggestions = data[1];

            _.each(suggestions, function(suggestion, i) {
                var s = suggestion[1];
                var text = s.text + " - " + s.translation;

                answer.push({content: text, description: text});
            });

            return answer
        };

        var suggest = function(text, callback) {
            var suggestStarted = Date.now();
            var pairAndRequest = getPairAndRequest(text);
            var pair = _ya.getFixedPair(pairAndRequest.pair);

            _ya.lookup(pairAndRequest.request, pair.from, pair.to).then(function(response) {
                if (latestSuggest > suggestStarted) {
                    return;
                } else {
                    latestSuggest = suggestStarted;

                    callback(convertResponseToSuggest(response.data));
                }
            });
        };

        var processCommand = function(text) {
            var pairAndRequest = splitSuggestion(text);
            var pair = _ya.getFixedPair(pairAndRequest.pair);
            var key = _ya.getKey(pair);
            var url = "https://slovari.yandex.ru/" + encodeURIComponent(pairAndRequest.request) + "/" + key;

            _chrome.openTab(url);
        };

        var getPairAndRequest = function(text) {
            text = (text) ? text.trim() : "";

            var pair = null;
            var request = null;
            var space = text.indexOf(" ");

            if (space > 0) {
                request = text.substring(space + 1);
                pair = getPairForPrefix(text.substring(0, space));
            }

            if (!pair) {
                request = text;
                pair = getPairForPrefix();
            }

            return {
                request: request,
                pair: pair
            }
        };

        $rootScope.$on('settings:changed', function() {
            reload();
        });

        reload();

        return {
            suggest: suggest,
            processCommand: processCommand
        }
    }).
    run(function (_omni, _i18n, _chromeCommonService, $timeout) {
        chrome.omnibox.onInputChanged.addListener(
            function (text, suggest) {
                _omni.suggest(text, suggest);
            });

        chrome.omnibox.onInputEntered.addListener(
            function (text) {
                $timeout(function() { //add angular context for promises
                    _omni.processCommand(text);
                }, 0);
            });

        // share objects with ui
        _chromeCommonService.add('_omni', _omni);
    });