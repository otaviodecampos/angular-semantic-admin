(function() {

    angular.module('asa')
        .controller('SidebarController', Controller);

    function Controller(SIDEBAR, ADMIN) {
        this.itens = SIDEBAR.itens;
        this.sidebarTemplateUrl = ADMIN.sidebarOpen;
    }

})();