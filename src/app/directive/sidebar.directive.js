(function() {

    angular.module('asadmin')
        .directive('asadminSidebar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            require: 'asAdmin',
            controller: 'SidebarController as sidebar',
            templateUrl: 'asadmin/sidebar.tpl.html',
            replace: true
        }
    }

})();