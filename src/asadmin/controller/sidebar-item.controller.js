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