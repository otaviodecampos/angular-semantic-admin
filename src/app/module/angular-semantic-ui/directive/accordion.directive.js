(function() {
    
    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiAccordion', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var settings = $parse(attrs.uiAccordion)(scope);
                element.accordion(settings);
            }
        };
    }

})();