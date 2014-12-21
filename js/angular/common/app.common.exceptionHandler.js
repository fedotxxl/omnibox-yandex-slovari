angular.module('common').
    factory('$exceptionHandler', function($injector, $log) {
        //handle angular exception
        return function(exception, cause) {
            //qkaba
            if (window.qbaka && window.qbaka.report) window.qbaka.report(exception);

            //console log
            $log.error.apply($log, arguments);
        };
    });