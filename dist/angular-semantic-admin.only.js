(function() {
    'use strict'

    angular.module('angular-semantic-admin', [
        
        'angular-semantic-ui', 
        'ui.router' 

    ]);

})();

(function() {
    'use strict'

    angular.module('angular-semantic-ui', [
        

    ]);

})();

(function() {
    'use strict'

    angular.module('angular-semantic-admin')
        .constant('ASADMIN', Constant());

    function Constant() {
        return {
          "navigationTitle": "Navigation",
          "sidebar": {
                    "switchBehavior": "compact",
                    "visible": true,
                    "compact": false,
                    "open": false,
                    "itens": []
          }
};
    }

})();

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
(function () {

    /* global angular */
    angular.module('angular-semantic-admin')
        .controller('AsadminController', Controller);

    function Controller($scope, Asadmin) {

        $scope.Asadmin = Asadmin;

        this.switchSidebar = function () {
            var behavior = Asadmin.getSidebar().getSwitchBehavior();

            if (behavior == 'visible') {
                Asadmin.getSidebar().toggleVisible();
            } else if (behavior == 'compact') {
                Asadmin.getSidebar().toggleCompact();
            }

            Asadmin.getSidebar().setOpen(false);
            $scope.$broadcast('switch-sidebar');
        };
    }

})();
(function () {

    /* global angular */
    angular.module('angular-semantic-admin')
        .controller('SidebarItemController', Controller);

    function Controller($scope, $state, $element, Asadmin) {

        var that = this;
        var element = $element;
        var scope = $scope;
        var state = $state;
        var item = scope.item;
        var parent = scope.parent;
        var sidebar = scope.sidebar;

        /* public functions */
        that.getStateUrl = function (item) {
            return state.href(item.state);
        }

        that.isActive = function (item) {
            return state.includes(item.state);
        }

        that.open = function (item, force) {
            if (!item.state) {
                if (item.itens) {
                    item.open = !item.open;
                } else if (item.templateUrl) {
                    item.open = force || !item.open;
                    sidebar.sidebarTemplateUrl = item.templateUrl;
                    Asadmin.sidebar.open = force || !Asadmin.sidebar.open;
                }
            }

            if (parent && (parent.horizontal || Asadmin.sidebar.compact)) {
                parent.open = false;
            }

            scope.$emit('open-item-changed', item);
        };

        that.onShowPopup = function () {
            var show = Asadmin.sidebar.compact && !item.open && !parent;

            if (parent && parent.horizontal) {
                show = true;
            }

            return show;
        };

        /* events */
        scope.$on('switch-sidebar', function () {
            item.open = false;
        });

        /* popup events */
        element.click(hidePopup);
        element.children('.menu').hover(hidePopup);
        element.hover(function (event) {
            event.stopPropagation();
        });

        function hidePopup(event) {
            element.popup('hide');
        }

        /* init */
        if (item.open) {
            that.open(item, true);
        }

    }

})();
(function () {

    /* global angular */
    angular.module('angular-semantic-admin')
        .controller('SidebarController', Controller);

    function Controller(Asadmin, $scope) {

        var that = this;
        var sidebar = Asadmin.getSidebar();
        var scope = $scope;
        var lastItemChanged = null;

        that.itens = sidebar.itens;
        that.sidebarItemTemplateUrl = 'angular-semantic-admin/sidebar-item.tpl.html';

        scope.$on('open-item-changed', function (event, openItem) {
            if (lastItemChanged && lastItemChanged != openItem && (lastItemChanged.horizontal || Asadmin.sidebar.compact)) {
                lastItemChanged.open = false;
            }
            lastItemChanged = openItem;
        });


    }

})();
(function () {

    angular.module('angular-semantic-admin')
        .directive('asAdmin', Directive);

    function Directive() {
        return {
            restrict: 'EC',
            templateUrl: 'angular-semantic-admin/asadmin.tpl.html',
            controller: 'AsadminController as asadmin',
            transclude: true,
            replace: true,
            link: function (scope, element) {
                element.addClass('animate');
            }
        }
    }

})();
(function () {

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
(function () {

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
(function () {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiAccordion', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var settings = $parse(attrs.uiAccordion)(scope);
                element.accordion(settings);
            }
        };
    }

})();
(function () {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiPopup', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var settings = $parse(attrs.uiPopup)(scope);
                element.popup(settings);
            }
        };
    }

})();
angular.module("angular-semantic-admin").run(["$templateCache", function($templateCache) {$templateCache.put("angular-semantic-admin/asadmin.tpl.html","<div class=\"asadmin\"\r\n     ng-class=\"{\'sidebar-behavior-visible\': Asadmin.sidebar.switchBehavior == \'visible\', \'sidebar-compact\': Asadmin.sidebar.compact, \'sidebar-visible\': Asadmin.sidebar.visible, \'sidebar-open\': Asadmin.sidebar.open}\">\r\n    <asadmin-sidebar></asadmin-sidebar>\r\n    <asadmin-navbar></asadmin-navbar>\r\n    <div class=\"asadmin-content\" ng-transclude></div>\r\n</div>");
$templateCache.put("angular-semantic-admin/navbar.tpl.html","<div class=\"asadmin-navbar ui inverted menu\">\r\n    <div ng-click=\"asadmin.switchSidebar()\" class=\"sidebar-switch\"></div>\r\n    {{ Asadmin.navigationTitle }}\r\n</div>");
$templateCache.put("angular-semantic-admin/sidebar-item.tpl.html","<a class=\"item\" data-content=\"{{ item.label }}\" data-variation=\"inverted\" ng-href=\"{{ itemCtrl.getStateUrl(item) }}\"\r\n   ng-click=\"itemCtrl.open(item); $event.stopPropagation()\"\r\n   ui-popup=\"{position: \'bottom right\', onShow: itemCtrl.onShowPopup}\"\r\n   ng-class=\"{\'open\': item.open, \'active\': itemCtrl.isActive(item), \'sidebar-open\': item.templateUrl && item.open}\"\r\n   ng-controller=\"SidebarItemController as itemCtrl\" ng-repeat=\"item in itens\">\r\n    <i ng-class=\"item.icon\" class=\"icon\"></i>\r\n    <span>{{ item.label }}</span>\r\n    <div class=\"ui inverted fluid icon link menu\" ng-class=\"{horizontal: item.horizontal}\" ng-if=\"item.itens\">\r\n        <div ng-init=\"itens = item.itens; parent = item\" ng-include=\"sidebar.sidebarItemTemplateUrl\"></div>\r\n    </div>\r\n</a>");
$templateCache.put("angular-semantic-admin/sidebar-template.tpl.html","sidebar-template.tpl.html");
$templateCache.put("angular-semantic-admin/sidebar.tpl.html","<div class=\"asadmin-sidebar\">\r\n    <div class=\"ui inverted fluid visible vertical sidebar static icon menu\" ng-init=\"itens = sidebar.itens\"\r\n         ng-include=\"sidebar.sidebarItemTemplateUrl\"></div>\r\n    <div class=\"asadmin-sidebar-open\">\r\n        <div ng-include=\"sidebar.sidebarTemplateUrl\"></div>\r\n    </div>\r\n</div>");}]);