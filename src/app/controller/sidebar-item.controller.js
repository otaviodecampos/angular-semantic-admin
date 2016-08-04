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