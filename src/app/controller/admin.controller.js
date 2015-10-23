(function() {

    angular.module('asa')
        .controller('AdminController', Controller);

    function Controller($scope, ADMIN) {
        angular.extend(this, ADMIN);

        this.switchSidebar = function() {
            this.sidebarVisible = !this.sidebarVisible;
            this.sidebarOpen = false;

            $scope.$broadcast('switch-sidebar');
        }
    }

})();