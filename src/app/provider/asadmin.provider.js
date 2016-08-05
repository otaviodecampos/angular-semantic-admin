(function () {

    /* global angular */
    angular.module('angular-semantic-admin')
        .provider('Asadmin', Provider);

    function Provider(ASADMIN) {

        var properties = jsoc.bindGetterSetter(angular.copy(ASADMIN));

        properties.$get = function () {
            return properties;
        };

        return properties;
    }

})();