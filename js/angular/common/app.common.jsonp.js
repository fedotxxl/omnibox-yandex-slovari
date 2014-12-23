//http://stackoverflow.com/questions/25400891/how-to-custom-set-angularjs-jsonp-callback-name
angular.module('common').factory('jsonpInterceptor', function($timeout, $window, $q) {
    return {
        'request': function(config) {
            if (config.method === 'JSONP') {
                var callbackId = angular.callbacks.counter.toString(36);
                config.callbackName = 'angular_callbacks_' + callbackId;
                config.url = config.url.replace('JSON_CALLBACK', config.callbackName);

                $timeout(function() {
                    $window[config.callbackName] = angular.callbacks['_' + callbackId];
                }, 0, false);
            }

            return config;
        },

        'response': function(response) {
            var config = response.config;
            if (config.method === 'JSONP') {
                delete $window[config.callbackName]; // cleanup
            }

            return response;
        },

        'responseError': function(rejection) {
            var config = rejection.config;
            if (config.method === 'JSONP') {
                delete $window[config.callbackName]; // cleanup
            }

            return $q.reject(rejection);
        }
    };
}).config(function($httpProvider) {
    $httpProvider.interceptors.push('jsonpInterceptor');
});