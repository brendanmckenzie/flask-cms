(function (window) {
    'use strict';

    function DocTypesCtrl($scope, $http, data) {
        $scope.docTypes = data;

        $scope.fieldTypes = ['shortText', 'longText', 'image'];

        $scope.loadDocTypes = function () {
            $http.get('/cms/api/doc-types').then(function (resp) {
                $scope.docTypes = resp.data;
            });
        };

        $scope.saveDocType = function () {
            var url = ($scope.dt && $scope.dt.id) ? '/cms/api/doc-type/' + $scope.dt.id : '/cms/api/doc-types';
            $http.post(url, $scope.dt).then(function () {
                $scope.loadDocTypes();
                $scope.dt = null;
            });
        };
    }

    window.app.controller('DocTypesCtrl', ['$scope', '$http', 'data', DocTypesCtrl]);

})(window);
