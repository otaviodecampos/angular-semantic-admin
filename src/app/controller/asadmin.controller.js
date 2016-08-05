(function () {

    /* global angular */
    angular.module('angular-semantic-admin')
        .controller('AsadminController', Controller);

    function Controller($scope, Asadmin) {

        $scope.Asadmin = Asadmin;

        this.switchSidebar = function () {
            var behavior = Asadmin.getSidebar().getSwitchBehavior();

            if (behavior == 'visible') {
                Asadmin.getSidebar().toggleVisible();
            } else if (behavior == 'compact') {
                Asadmin.getSidebar().toggleCompact();
            }

            Asadmin.getSidebar().setOpen(false);
            $scope.$broadcast('switch-sidebar');
        };
    }

})();