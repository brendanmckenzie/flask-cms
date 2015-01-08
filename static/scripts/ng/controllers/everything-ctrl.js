(function (window, moment) {
    'use strict';

    function EverythingCtrl($scope, $http) {
        $scope.moment = moment;

        $scope.fieldTypes = ['shortText', 'longText', 'image'];

        $scope.loadTemplates = function () {
            $http.get('/cms/api/templates').then(function (resp) {
                $scope.templates = resp.data;
            });
        };

        $scope.loadNodes = function () {
            $http.get('/cms/api/nodes').then(function (resp) {
                $scope.nodes = resp.data;
            });
        };

        $scope.saveNode = function () {
            var url = ($scope.n && $scope.n.id) ? '/cms/api/node/' + $scope.n.id : '/cms/api/nodes';
            $http.post(url, $scope.n).then(function () {
                $scope.loadNodes();
                $scope.n = null;
            });
        };

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

        $scope.loadTemplates();
        $scope.loadDocTypes();
        $scope.loadNodes();
    }

    window.app.controller('EverythingCtrl', ['$scope', '$http', EverythingCtrl]);
})(window, window.moment);
