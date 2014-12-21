(function() {
    //http://stackoverflow.com/questions/16286605/initialize-angularjs-service-with-asynchronous-data
    var appContainer = document.createElement('div');

    angular.module('bootstrap', ['common']).
        factory('_bootstrapper', function(_bootstrapData, $timeout, $q) {
            return {
                bootstrap: function() {
                    var getBackgroundData = function() {
                        return $q(function(resolve) {
                            var common = chrome.extension.getBackgroundPage().common || null;
                            if (common) {
                                var settings = common._settings;
                                if (settings) {
                                    _bootstrapData._settings = settings;
                                    resolve();
                                } else {
                                    $timeout(getBackgroundData, 100);
                                }
                            }
                        });
                    };

                    return getBackgroundData();
                }
            }
        }).
        run(function(_bootstrapper) {
            _bootstrapper.bootstrap().then(function() {
                angular.bootstrap(document, ['app']);
                appContainer.remove();
            });
        });

    angular.element(document).ready(function() {
        angular.bootstrap(appContainer, ['bootstrap']);
    });
}());

angular.module('app', ['common', 'ui.select2']).
    factory('_settings', function (_bootstrapData) {
        return _bootstrapData._settings;
    }).
    factory('_settingsData', function(_i18n) {
        var langDependencies = {
            ru: ['en', 'de', 'fr', 'it', 'es', 'uk', 'kk', 'tr'],
            en: ['ru', 'uk'],
            de: ['ru'],
            fr: ['ru'],
            it: ['ru'],
            es: ['ru'],
            uk: ['ru', 'en'],
            kk: ['ru'],
            tr: ['ru']
        };

        var langs = _.map(['ru', 'en', 'de', 'fr', 'it', 'es', 'uk', 'kk', 'tr'], function(lang) {
            return {
                id: lang,
                text: _i18n('lang.' + lang)
            }
        });

        var filter = function(langIds) {
            return _.filter(langs, function(lang) {
                return _.contains(langIds, lang.id);
            });
        };

        var getDependentLangs = function(lang) {
            var currentDependentLangs = lang ? langDependencies[lang] : null;

            if (!currentDependentLangs) {
                return [];
            } else {
                return filter(currentDependentLangs);
            }
        };

        return {
            getDependentLangs: getDependentLangs,
            getLangs: function() {
                return langs;
            }
        }
    }).
    controller('SettingsController',function ($scope, _browser, _privateRouter, _i18n, _settings, _settingsData) {
        //icons - http://findicons.com/pack/282/flags
        var browser = (_browser == 'opera') ? 'opera' : 'chrome';

        $scope.rateItUrl = _privateRouter.rateItUrl;
        $scope.shareUrl = _privateRouter.shareUrl;
        $scope.shareMessage = _i18n('omni.settings.share.' + browser + '.message');
        $scope.settings = $.extend({}, _settings.get());

        var format = function(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='m-flag' src='settings/img/flags/" + state.id.toLowerCase() + ".png'/> " + state.text;
        };

        $scope.select2Options = {
            width: '120px',
            formatResult: format,
            formatSelection: format,
            escapeMarkup: function(m) { return m; }
        };

        $scope.$watch('defaultFrom', function(current, prev) {
            if (current != prev) {
                $scope.defaultTo = null;
                $scope.langsTo = _settingsData.getDependentLangs(current);
            }
        });

        $scope.langsFrom = _settingsData.getLangs();
    });

$(document).ready(function () {
    //just copied it as is from http://roykolak.github.io/chrome-bootstrap/
    //minor changes

    var open = function (page) {
        var selected = 'selected';

        $('.mainview > *').removeClass(selected);
        $('.menu li').removeClass(selected);
        setTimeout(function () {
            $('.mainview > *:not(.selected)').css('display', 'none');
        }, 100);

        $('.menu a[href="' + page + '"]').parent().addClass(selected);

        var currentView = $(page);
        currentView.css('display', 'block');
        setTimeout(function () {
            currentView.addClass(selected);
        }, 0);
        setTimeout(function () {
            $('body')[0].scrollTop = 0;
        }, 200);
    };

    $(function () {
        $('.menu-selector').click(function (ev) {
            ev.preventDefault();
            open($(ev.currentTarget).attr('href'))
        });

        open((window.location.hash) ? window.location.hash : '#main')
    });
});