angular.module('app', ['common']).
    factory('_omni',function (_ya) {
        var latestSuggest = 0;

        var suggest = function(text, callback) {
            var suggestStarted = Date.now();

            _ya.lookup(text, "en-ru").then(function(response) {
                if (latestSuggest > suggestStarted) {
                    return;
                } else {
                    latestSuggest = suggestStarted;

                    callback(response.data)
                }
            });
        };

        var processCommand = function(text) {

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
        _chromeCommonService.add('_omniUtils', _omniUtils);
    });