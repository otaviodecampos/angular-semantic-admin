(function() {

    angular.module('asa')
        .directive('adminNavbar', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'asa/navbar.tpl.html',
            replace: true
        }
    }

})();