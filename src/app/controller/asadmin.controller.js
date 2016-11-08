(function () {

    /* global angular */
    angular.module('angular-semantic-admin')
        .controller('AsadminController', Controller);

    function Controller($scope, $window, $timeout, Asadmin) {

        var that = this;
        var scope = $scope;
        var window = angular.element($window);
        var resizeWatchers = ['Asadmin.sidebar.open', 'Asadmin.sidebar.visible', 'Asadmin.sidebar.compact'];
        var resizeDelay = 400;
        var sidebar = Asadmin.getSidebar();

        scope.Asadmin = Asadmin;

        that.switchSidebar = function () {
            var behavior = sidebar.getSwitchBehavior();

            if (behavior == 'visible') {
                sidebar.toggleVisible();
            } else if (behavior == 'compact') {
                sidebar.toggleCompact();
            }

            sidebar.setOpen(false);
            scope.$broadcast('switch-sidebar');
        };
        
        scope.$watchGroup(resizeWatchers, function() {
            $timeout(function() {
                window.trigger('resize');
            }, resizeDelay);
        });
    }

})();