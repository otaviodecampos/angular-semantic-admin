(function() {
    'use strict'

    angular.module('asadmin', [
        

    ]);

})();

(function() {
    'use strict'

    angular.module('asadmin')
        .constant('ASADMIN', Constant());

    function Constant() {
        return {
          "sidebar": {},
          "sidebarVisible": true,
          "sidebarOpen": false
};
    }

})();

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
(function() {

    angular.module('asadmin')
        .controller('AsadminController', Controller);

    function Controller($scope, Asadmin) {

        $scope.Asadmin = Asadmin;

        this.switchSidebar = function() {
            Asadmin.toogleSidebarVisible();
            Asadmin.setSidebarOpen(false);

            $scope.$broadcast('switch-sidebar');
        }
    }

})();
(function() {

    angular.module('asadmin')
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
                Asadmin.sidebarOpen = force || !Asadmin.sidebarOpen;
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

    angular.module('asadmin')
        .controller('SidebarController', Controller);

    function Controller(Asadmin) {

        var sidebar = Asadmin.getSidebar();
        this.itens = sidebar.itens;

    }

})();
(function() {

    angular.module('asadmin')
        .directive('asAdmin', Directive);

    function Directive() {
        return {
            restrict: 'EC',
            templateUrl: 'asadmin/asadmin.tpl.html',
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

    angular.module('asadmin')
        .directive('asadminNavbar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'asadmin/navbar.tpl.html',
            replace: true
        }
    }

})();
(function() {

    angular.module('asadmin')
        .directive('asadminSidebar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            require: 'asAdmin',
            controller: 'SidebarController as sidebar',
            templateUrl: 'asadmin/sidebar.tpl.html',
            replace: true
        }
    }

})();
angular.module("asadmin").run(["$templateCache", function($templateCache) {$templateCache.put("asadmin/asadmin.tpl.html","<div class=\"asadmin\" ng-class=\"{\'sidebar-visible\': Asadmin.sidebarVisible, \'sidebar-open\': Asadmin.sidebarOpen}\">\r\n    <asadmin-sidebar></asadmin-sidebar>\r\n    <asadmin-navbar></asadmin-navbar>\r\n    <div class=\"asadmin-content\" ng-transclude></div>\r\n</div>");
$templateCache.put("asadmin/navbar.tpl.html","<div class=\"asadmin-navbar ui inverted menu\">\r\n    <div ng-click=\"asadmin.switchSidebar()\" class=\"sidebar-switch\"></div>\r\n    Navigation\r\n</div>");
$templateCache.put("asadmin/sidebar-template.tpl.html","sidebar-template.tpl.html");
$templateCache.put("asadmin/sidebar.tpl.html","<div class=\"asadmin-sidebar\">\r\n    <div class=\"ui inverted fluid visible vertical sidebar static icon menu\">\r\n        <a ng-click=\"item.$open()\" ng-class=\"{\'open\': item.open, \'sidebar-open\': item.templateUrl && item.open}\" ng-repeat=\"item in sidebar.itens\" ng-controller=\"SidebarItemController\" class=\"item\">\r\n            <i ng-class=\"item.icon\" class=\"icon\"></i>\r\n            <div ng-if=\"item.itens\" class=\"ui inverted fluid icon link menu horizontal\">\r\n                <div ng-repeat=\"item in item.itens\" class=\"item\">\r\n                    <i ng-class=\"item.icon\" class=\"icon\"></i>\r\n                </div>\r\n            </div>\r\n        </a>\r\n    </div>\r\n    <div class=\"asadmin-sidebar-open\">\r\n        <div ng-include=\"sidebar.sidebarTemplateUrl\"></div>\r\n    </div>\r\n</div>");}]);