angular.module('common').
    value("_logDebug", true).
    value("_testExceptionHandler", false).
    value("_qbaka", false).
    constant('_browser', 'chrome').
    factory('_privateRouter', function() {
        return {
            rateItUrl: "https://chrome.google.com/webstore/detail/nmkgaalbomjiafnenbknaoeilejnhnce/reviews?utm_source=chrome-ntp-icon",
            shareUrl: "http://bit.ly/1sSX57o"
        }
    });

if (window.qbaka) window.qbaka.key = "2dcbf73a9f1f2873ce55bec9b4741559";