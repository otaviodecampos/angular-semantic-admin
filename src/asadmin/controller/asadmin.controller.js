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