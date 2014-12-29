angular.module('common').
    value("_logDebug", false).
    value("_testExceptionHandler", false).
    value("_qbaka", true).
    constant('_browser', 'opera').
    factory('_privateRouter', function() {
        return {
            rateItUrl: "https://addons.opera.com/en/extensions/details/omnibox-yandex-dictionary/",
            shareUrl: "http://bit.ly/1vDe8g1",
            hashMemPluginUrl: "https://addons.opera.com/extensions/details/hashmemcom-zakladki-zametki-v-omnibox/",
            googleTranslatePluginUrl: "https://addons.opera.com/extensions/details/omnibox-google-translate/"
        }
    });