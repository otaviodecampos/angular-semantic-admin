(function() {

    angular.module('demo')
        .config(Config);

    function Config(AsadminProvider, SIDEBAR) {

        AsadminProvider.setSidebar(SIDEBAR);

    }

})();