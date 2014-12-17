angular.module('app', ['common']).
    factory('_omni',function (_chrome) {
    }).
    run(function (_omni, _i18n, _chromeCommonService, $timeout) {
        chrome.omnibox.onInputChanged.addListener(
            function (text, suggest) {
                var s = omni.suggest(text);
                suggest(s);
            });

        chrome.omnibox.onInputEntered.addListener(
            function (text) {
                $timeout(function() { //add angular context for promises
                    omni.processCommand(text);
                }, 0);
            });

        // share objects with ui
        _chromeCommonService.add('_omni', _omni);
        _chromeCommonService.add('_omniUtils', _omniUtils);
    });