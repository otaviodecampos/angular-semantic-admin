(function() {

    angular.module('angular-semantic-admin')
        .controller('AsadminController', Controller);

    function Controller($scope, Asadmin) {

        $scope.Asadmin = Asadmin;

        this.switchSidebar = function() {
            Asadmin.getSidebar().toogleVisible();
            Asadmin.getSidebar().setOpen(false);

            $scope.$broadcast('switch-sidebar');
        }
    }

})();