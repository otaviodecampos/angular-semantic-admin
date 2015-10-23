(function() {

    angular.module('asa')
        .directive('admin', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'asa/portal.tpl.html',
            controller: 'AdminController as admin',
            transclude: true,
            replace: true,
            link: function(scope, element) {
                 element.addClass('animate');
            }
        }
    }

})();