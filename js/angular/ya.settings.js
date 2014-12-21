angular.module("app").
    factory('_settings', function(_chromeStorage, _bootstrapData) {
        var settings = _bootstrapData.settings || {};

        var get = function() {
            return settings;
        };

        var set = function(settings) {
            return _chromeStorage.set('settings', settings);
        };

        return {
            get: get,
            set: set
        }
    }).
    run(function(_chromeCommonService, _settings) {
        _chromeCommonService.add('_settings', _settings);
    });