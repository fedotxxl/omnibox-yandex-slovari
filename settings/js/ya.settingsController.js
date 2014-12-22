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
    controller('SettingsBaseController', function($scope, _browser, _settings, _privateRouter, _i18n, _settingsData) {
        //icons - http://findicons.com/pack/282/flags
        var browser = (_browser == 'opera') ? 'opera' : 'chrome';

        $scope.rateItUrl = _privateRouter.rateItUrl;
        $scope.shareUrl = _privateRouter.shareUrl;
        $scope.shareMessage = _i18n('omni.settings.share.' + browser + '.message');

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

        $scope.getSettings = function() {
            return $.extend(true, {}, {
                default: {},
                pairs: []
            }, _settings.get());
        };

        $scope.langsFrom = _settingsData.getLangs();

        $scope.getSavedLabel = function() {
            var d = new Date();
            var label = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

            return label;
        }
    }).
    controller('SettingsMainController', function($scope, _settingsData, _settings) {
        var loadState = function() {
            $scope.default = $scope.getSettings().default;

            if ($scope.default.from) {
                $scope.default.langsTo = _settingsData.getDependentLangs($scope.default.from);
            }
        };

        $scope.$watch('default.from', function(current, prev) {
            if (current != prev) {
                $scope.default.to = null;
                $scope.default.langsTo = _settingsData.getDependentLangs(current);
            }
        });

        $scope.isStateChanged = function() {
            var saved = _settings.get().default || {};
            var current = $scope.default;

            return saved.from != current.from || saved.to != current.to;
        };

        $scope.save = function() {
            var d = {
                from: $scope.default.from,
                to: $scope.default.to
            };

            _settings.set($.extend({}, _settings.get(), {default: d}));
            loadState();

            $scope.saved = $scope.getSavedLabel();
        };

        loadState();
    }).
    controller('SettingsAdvancedController',function ($scope, _settingsData, _settings) {
        var changed = false;

        $scope.pairs = $scope.getSettings().pairs;
        $scope.$watch('pairs', function(c, p) {
            if (c.length != p.length) {
                changed = true;
                return;
            }

            var length = c.length;

            for (var i = 0; i < length; i++) {
                var current = c ? c[i] : null;
                var prev = p ? p[i] : null;

                if (current) {
                    current.langsTo = _settingsData.getDependentLangs(current.from);
                }

                if (current && prev) {
                    if (current.from != prev.from) {
                        current.to = null;
                    }
                }

                if (current && !prev) {
                    changed = true;
                } else if (prev && !current) {
                    changed = true;
                } else if (current.from != prev.from || current.to != prev.to || current.prefix != prev.prefix) {
                    changed = true;
                }
            }
        }, true);

        $scope.addPair = function() {
            $scope.pairs.push({});
        };

        $scope.removePair = function(pair) {
            $scope.pairs.remove(pair);
        };

        $scope.isStateChanged = function() {
            return changed;
        };

        $scope.save = function() {
            var pairs = _.map($scope.pairs, function(pair) {
                return {
                    prefix: pair.prefix,
                    from: pair.from,
                    to: pair.to
                }
            });

            _settings.set($.extend({}, _settings.get(), {pairs: pairs}));
            changed = false;

            $scope.saved = $scope.getSavedLabel();
        };
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