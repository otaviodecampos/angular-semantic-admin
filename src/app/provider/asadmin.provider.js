(function () {

    /* global angular */
    angular.module('angular-semantic-admin')
        .provider('Asadmin', Provider);

    function Provider(ASADMIN) {

        var properties = angular.copy(ASADMIN);

        function createGetterSetter(obj) {
            for (var attr in obj) {

                (function (attr) {
                    var attrValue = obj[attr];
    
                    if(attr.indexOf('get') != 0 && attr.indexOf('set') != 0 && attr.indexOf('toogle') != 0 && attr.indexOf('is') != 0) {
                        var name = attr.charAt(0).toUpperCase() + attr.slice(1);
                    
                        obj['set' + name] = function (value) {
                            if (typeof value == "object") {
                                value = angular.extend(obj[attr], value);
                                createGetterSetter(value);
                            }
                            obj[attr] = value;
                        };
        
                        if (typeof attrValue == "boolean") {
                            obj['is' + name] = function () {
                                return obj[attr] == true;
                            };
        
                            obj['toogle' + name] = function () {
                                return obj[attr] = !obj[attr];
                            };
                        } else {
                            obj['get' + name] = function () {
                                return obj[attr];
                            };
                        }
                        
                        if (typeof attrValue == "object") {
                            createGetterSetter(attrValue);
                        }
                    }
                    
                })(attr);
            }   
        }
        
        createGetterSetter(properties);
        
        properties.$get = function () {
            return properties;
        };
        
        return properties;
    }

})();