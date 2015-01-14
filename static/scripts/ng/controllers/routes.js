(function (window) {
    'use strict';

    function RoutesCtrl($scope, data) {
        $scope.allRoutes = data;
    }

    window.app.controller('RoutesCtrl', ['$scope', 'data', RoutesCtrl]);

})(window);
