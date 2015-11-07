(function() {

    angular.module('demo')
        .controller('DemoCtrl', Controller);

    function Controller() {
        this.click = function() {
            console.log('click!');
        }
    }

})();