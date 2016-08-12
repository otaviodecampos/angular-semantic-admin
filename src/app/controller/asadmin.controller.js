(function () {

    /* global angular */
    angular.module('angular-semantic-admin')
        .controller('AsadminController', Controller);

    function Controller($scope, $window, Asadmin) {

        var that = this;
        var scope = $scope;
        var window = angular.element($window);
        var resizeWatchers = ['Asadmin.sidebar.open', 'Asadmin.sidebar.visible', 'Asadmin.sidebar.compact'];
        
        scope.Asadmin = Asadmin;

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
        
        scope.$watchGroup(resizeWatchers, function() {
           window.trigger('resize');
        });
    }

})();