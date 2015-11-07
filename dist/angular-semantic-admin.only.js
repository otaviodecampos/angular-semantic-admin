(function() {
    'use strict'

    angular.module('angular-semantic-admin', [
        

    ]);

})();

(function() {
    'use strict'

    angular.module('angular-semantic-admin')
        .constant('ASADMIN', Constant());

    function Constant() {
        return {
          "sidebar": {
                    "visible": true,
                    "open": false,
                    "itens": []
          }
};
    }

})();

(function () {

    angular.module('angular-semantic-admin')
        .provider('Asadmin', Provider);

    function Provider(ASADMIN) {

        var properties = angular.copy(ASADMIN);

        function createGetterSetter(obj) {
            for (var attr in obj) {

                (function (attr) {
                    var attrValue = obj[attr]
    
                    if(attr.indexOf('get') != 0 && attr.indexOf('set') != 0 && attr.indexOf('toogle') != 0 && attr.indexOf('is') != 0) {
                        var name = attr.charAt(0).toUpperCase() + attr.slice(1);
                    
                        obj['set' + name] = function (value) {
                            if (typeof value == "object") {
                                value = angular.extend(obj[attr], value);
                                createGetterSetter(value);
                            }
                            obj[attr] = value;
                        }
        
                        if (typeof attrValue == "boolean") {
                            obj['is' + name] = function () {
                                return obj[attr] == true;
                            }
        
                            obj['toogle' + name] = function () {
                                return obj[attr] = !obj[attr];
                            }
                        } else {
                            obj['get' + name] = function () {
                                return obj[attr];
                            }
                        }
                        
                        if (typeof attrValue == "object") {
                            createGetterSetter(attrValue);
                        }
                    }
                    
                })(attr);
            }   
        }
        
        createGetterSetter(properties);
        
        window.teste = properties;
        
        properties.$get = function () {
            return properties;
        }

        return properties;
    }

})();
(function() {

    angular.module('angular-semantic-admin')
        .controller('AsadminController', Controller);

    function Controller($scope, Asadmin) {

        $scope.Asadmin = Asadmin;

        this.switchSidebar = function() {
            Asadmin.getSidebar().toogleVisible();
            Asadmin.getSidebar().setOpen(false);

            $scope.$broadcast('switch-sidebar');
        }
    }

})();
(function() {

    angular.module('angular-semantic-admin')
        .controller('SidebarItemController', Controller);

    function Controller($scope, Asadmin) {
        var item = $scope.item,
            sidebar = $scope.sidebar;

        // functions
        item.$open = function (force) {
            if(item.itens) {
                item.open = !item.open;
            } else if(item.templateUrl) {
                item.open = force || !item.open;
                sidebar.sidebarTemplateUrl = item.templateUrl;
                force && Asadmin.getSidebar().setOpen(true) || Asadmin.getSidebar().toogleOpen();
            }
        }

        // initialize
        if(item.open) {
            item.$open(true);
        }

        // events
        $scope.$on('switch-sidebar', function() {
           item.open = false;
        });

    }

})();
(function() {

    angular.module('angular-semantic-admin')
        .controller('SidebarController', Controller);

    function Controller(Asadmin) {

        var sidebar = Asadmin.getSidebar();
        this.itens = sidebar.itens;

    }

})();
(function() {

    angular.module('angular-semantic-admin')
        .directive('asAdmin', Directive);

    function Directive() {
        return {
            restrict: 'EC',
            templateUrl: 'angular-semantic-admin/asadmin.tpl.html',
            controller: 'AsadminController as asadmin',
            transclude: true,
            replace: true,
            link: function(scope, element) {
                 element.addClass('animate');
            }
        }
    }

})();
(function() {

    angular.module('angular-semantic-admin')
        .directive('asadminNavbar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'angular-semantic-admin/navbar.tpl.html',
            replace: true
        }
    }

})();
(function() {

    angular.module('angular-semantic-admin')
        .directive('asadminSidebar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            require: 'asAdmin',
            controller: 'SidebarController as sidebar',
            templateUrl: 'angular-semantic-admin/sidebar.tpl.html',
            replace: true
        }
    }

})();
angular.module("angular-semantic-admin").run(["$templateCache", function($templateCache) {$templateCache.put("angular-semantic-admin/asadmin.tpl.html","<div class=\"asadmin\" ng-class=\"{\'sidebar-visible\': Asadmin.sidebar.visible, \'sidebar-open\': Asadmin.sidebar.open}\">\n    <asadmin-sidebar></asadmin-sidebar>\n    <asadmin-navbar></asadmin-navbar>\n    <div class=\"asadmin-content\" ng-transclude></div>\n</div>");
$templateCache.put("angular-semantic-admin/navbar.tpl.html","<div class=\"asadmin-navbar ui inverted menu\">\n    <div ng-click=\"asadmin.switchSidebar()\" class=\"sidebar-switch\"></div>\n    Navigation\n</div>");
$templateCache.put("angular-semantic-admin/sidebar-template.tpl.html","sidebar-template.tpl.html");
$templateCache.put("angular-semantic-admin/sidebar.tpl.html","<div class=\"asadmin-sidebar\">\n    <div class=\"ui inverted fluid visible vertical sidebar static icon menu\">\n        <a ng-click=\"item.$open()\" ng-class=\"{\'open\': item.open, \'sidebar-open\': item.templateUrl && item.open}\" ng-repeat=\"item in sidebar.itens\" ng-controller=\"SidebarItemController\" class=\"item\">\n            <i ng-class=\"item.icon\" class=\"icon\"></i>\n            <div ng-if=\"item.itens\" class=\"ui inverted fluid icon link menu horizontal\">\n                <div ng-repeat=\"item in item.itens\" class=\"item\">\n                    <i ng-class=\"item.icon\" class=\"icon\"></i>\n                </div>\n            </div>\n        </a>\n    </div>\n    <div class=\"asadmin-sidebar-open\">\n        <div ng-include=\"sidebar.sidebarTemplateUrl\"></div>\n    </div>\n</div>");}]);