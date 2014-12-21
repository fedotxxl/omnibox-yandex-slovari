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

angular.module('app', ['common']).
    factory('_settings',function (_bootstrapData) {
        return _bootstrapData._settings;
    }).
    controller('SettingsController',function ($scope, _browser, _privateRouter, _i18n, _settings) {
        var browser = (_browser == 'opera') ? 'opera' : 'chrome';

        $scope.rateItUrl = _privateRouter.rateItUrl;
        $scope.shareUrl = _privateRouter.shareUrl;
        $scope.shareMessage = _i18n('omni.settings.share.' + browser + '.message');
        $scope.settings = $.extend({}, _settings.get());
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

        open((window.location.hash) ? window.location.hash : '#sync')
    });
});