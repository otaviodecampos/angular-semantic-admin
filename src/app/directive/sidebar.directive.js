(function() {

    angular.module('asa')
        .directive('adminSidebar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            require: 'admin',
            controller: 'SidebarController as sidebar',
            templateUrl: 'asa/sidebar.tpl.html',
            replace: true
        }
    }

})();