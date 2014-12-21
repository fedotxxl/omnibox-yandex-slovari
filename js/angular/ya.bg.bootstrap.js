(function() {
    //http://stackoverflow.com/questions/16286605/initialize-angularjs-service-with-asynchronous-data
    var appContainer = document.createElement('div');

    angular.module('bootstrap', ['common']).
        run(function(_bootstrapData, _chromeStorage) {
            _chromeStorage.get('settings').then(function(settings) {
                _bootstrapData.settings = settings;

                angular.bootstrap(document, ['app']);
                appContainer.remove();
            });
        });

    angular.element(document).ready(function() {
        angular.bootstrap(appContainer, ['bootstrap']);
    });
}());