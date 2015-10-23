(function() {

    angular.module('asa')
        .controller('SidebarItemController', Controller);

    function Controller($scope) {
        var item = $scope.item,
            sidebar = $scope.sidebar,
            admin = $scope.admin;

        // functions

        item.$open = function (force) {
            if(item.itens) {
                item.open = !item.open;
            } else if(item.templateUrl) {
                item.open = force || !item.open;
                admin.sidebarOpen = force || !admin.sidebarOpen;
                sidebar.sidebarTemplateUrl = item.templateUrl;
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