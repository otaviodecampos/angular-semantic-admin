(function() {

    angular.module('asadmin')
        .directive('asadminNavbar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'asadmin/navbar.tpl.html',
            replace: true
        }
    }

})();