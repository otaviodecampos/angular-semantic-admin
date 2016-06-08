(function() {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiPopup', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var settings = $parse(attrs.uiPopup)(scope);
                element.popup(settings);
            }
        };
    }

})();