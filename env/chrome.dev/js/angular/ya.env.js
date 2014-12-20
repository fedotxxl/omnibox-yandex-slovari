angular.module('common').
    value("_logDebug", true).
    value("_testExceptionHandler", false).
    constant('applicationId', 'omni.dev-1.4').
    constant('_browser', 'chrome').
    constant('c_host', 'http://localhost:8080').
    factory('_privateRouter', function() {
        return {
            rateItUrl: "https://chrome.google.com/webstore/detail/nmkgaalbomjiafnenbknaoeilejnhnce/reviews?utm_source=chrome-ntp-icon",
            shareUrl: "http://bit.ly/1sSX57o"
        }
    });

if (window.qbaka) window.qbaka.key = "d560075a7c1b03299ff79426d494345e";