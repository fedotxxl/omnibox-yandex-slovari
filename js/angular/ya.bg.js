angular.module('app', ['common']).
    factory('_omni',function (_ya, _chrome) {
        var latestSuggest = 0;
        var langFrom = "ru";
        var langTo = "de";

        var splitSuggestion = function(suggest) {
            if (!suggest) suggest = '';

            var word, translations;
            var pos = suggest.indexOf(" - ");

            if (pos > 0) {
                word = suggest.substring(0, pos).trim();
                translations = suggest.substring(pos + 3).trim();
            } else {
                word = suggest.trim();
            }

            return {
                word: word,
                translations: translations
            }
        };

        var convertResponseToSuggest = function(data) {
            var answer = [];
            var word = data[0];
            var suggestions = data[1];

            _.each(suggestions, function(suggestion, i) {
                answer.push({content:  suggestion, description: suggestion});
            });

            return answer
        };

        var suggest = function(text, callback) {
            var suggestStarted = Date.now();

            _ya.lookup(text, langTo).then(function(response) {
                if (latestSuggest > suggestStarted) {
                    return;
                } else {
                    latestSuggest = suggestStarted;

                    callback(convertResponseToSuggest(response.data));
                }
            });
        };

        var processCommand = function(text) {
            var word = splitSuggestion(text).word;
            var url = "https://slovari.yandex.ru/" + encodeURIComponent(word) + "/" + langFrom + "-" + langTo;

            _chrome.openTab(url);
        };

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