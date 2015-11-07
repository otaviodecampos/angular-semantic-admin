(function() {

    angular.module('angular-semantic-admin')
        .controller('SidebarItemController', Controller);

    function Controller($parse, $scope, Asadmin) {
        var item = $scope.item,
            sidebar = $scope.sidebar;

        // functions
        item.$open = function (force) {
            
            $parse(item.click)($scope);
            
            if(item.itens) {
                item.open = !item.open;
            } else if(item.templateUrl) {
                item.open = force || !item.open;
                sidebar.sidebarTemplateUrl = item.templateUrl;
                Asadmin.sidebar.open = force || !Asadmin.sidebar.open;
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