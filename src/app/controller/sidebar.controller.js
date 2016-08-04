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