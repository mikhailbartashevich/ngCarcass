define([
], function() {

    function MenuService($rootScope) {

        var menuItems = [];


        return {

            addMenuItem: function (menuItem) {
                menuItems.push(menuItem);
            },

            getMenuItems: function() {
                return  menuItems;
            }

        };
    }

    return MenuService;
});