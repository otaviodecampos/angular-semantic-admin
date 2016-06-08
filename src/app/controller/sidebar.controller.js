(function() {

    /* global angular */
    angular.module('angular-semantic-admin')
        .controller('SidebarController', Controller);

    function Controller(Asadmin) {

        var sidebar = Asadmin.getSidebar();
        this.itens = sidebar.itens;

    }

})();