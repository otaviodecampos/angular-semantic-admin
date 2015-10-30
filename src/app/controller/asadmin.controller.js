(function() {

    angular.module('angular-semantic-admin')
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