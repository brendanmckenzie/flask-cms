(function (window) {
    'use strict';

    function DocTypesCtrl($scope, $http, docTypes, fieldTypes) {
        $scope.docTypes = docTypes;

        $scope.fieldTypes = fieldTypes;

        $scope.loadDocTypes = function () {
            $http.get('/cms/api/doc-types').then(function (resp) {
                $scope.docTypes = resp.data;
            });
        };

        $scope.$on('doctypes:updated', function () {
            $scope.loadDocTypes();
        });
    }

    window.app.controller('DocTypesCtrl', ['$scope', '$http', 'docTypes', 'fieldTypes', DocTypesCtrl]);

    function DocTypeDetailCtrl($scope, $http, $state, docType) {
        $scope.docType = docType;

        $scope.saveDocType = function () {
            var url = ($scope.docType && $scope.docType.id) ? '/cms/api/doc-type/' + $scope.docType.id : '/cms/api/doc-types';
            $http.post(url, $scope.docType).then(function () {
                $scope.$emit('doctypes:updated');

                $state.transitionTo('doctypes');
            });
        };

        $scope.export = function () {
            window.location = '/cms/api/doc-type/' + $scope.docType.id + '/export';
        };
    }

    window.app.controller('DocTypeDetailCtrl', ['$scope', '$http', '$state', 'docType', DocTypeDetailCtrl]);

})(window);
