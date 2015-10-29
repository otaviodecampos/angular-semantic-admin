(function () {

    angular.module('asadmin')
        .provider('Asadmin', Provider);

    function Provider(ASADMIN) {

        var properties = {};

        for (var attr in ASADMIN) {

            (function (attr) {
                properties[attr] = ASADMIN[attr];

                var name = attr.charAt(0).toUpperCase() + attr.slice(1);
                properties['set' + name] = function (value) {
                    properties[attr] = value;
                }

                if (typeof ASADMIN[attr] == "boolean") {
                    properties['is' + name] = function () {
                        return properties[attr] == true;
                    }

                    properties['toogle' + name] = function () {
                        return properties[attr] = !properties[attr];
                    }
                } else {
                    properties['get' + name] = function () {
                        return properties[attr];
                    }
                }

            })(attr);

        }

        properties.$get = function () {
            return properties;
        }

        return properties;
    }

})();