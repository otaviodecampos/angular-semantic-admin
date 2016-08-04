(function () {

    angular.module('demo')
        .config(Config);

    function Config($urlRouterProvider, AsadminProvider, SIDEBAR, SETTINGS) {

        $urlRouterProvider.otherwise(SETTINGS.defaultUrl);
        AsadminProvider.setSidebar(SIDEBAR);

    }

})();