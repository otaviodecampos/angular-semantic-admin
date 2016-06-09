(function() {

    /* global angular */
    angular.module('angular-semantic-admin')
        .controller('SidebarItemController', Controller);

    function Controller($parse, $scope, $element, Asadmin) {
        
        var that = this;
        
        var item = $scope.item,
            sidebar = $scope.sidebar;
        
        /* controller functions */
        that.getStateUrl = function(item) {
            return ''; //$state.href(item.state);
        }


        /* item functions */
        item.$open = function (force) {
            $parse(item.click)($scope);
            
            if(item.itens) {
                item.open = !item.open;
            } else if(item.templateUrl) {
                item.open = force || !item.open;
                sidebar.sidebarTemplateUrl = item.templateUrl;
                Asadmin.sidebar.open = force || !Asadmin.sidebar.open;
            }
        };

        /* sidebar events */
        $scope.$on('switch-sidebar', function() {
           item.open = false;
        });
        
        /* popup events */
        item.$onShowPopup = function() {
            var show = true;
            if($element.hasClass('open')) {
                show = false;
            }
            return show;
        };
        
        $element.hover(function(e) {
            e.stopPropagation();
        });
        
        $element.click(hidePopup);
        $element.children('.menu').hover(hidePopup);
        
        function hidePopup(e) {
            $element.popup('hide');
        }
        
        /* initialize */
        if(item.open) {
            item.$open(true);
        }

    }

})();