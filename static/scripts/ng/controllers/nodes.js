(function (window) {
    'use strict';

    function NodesCtrl($scope, $http, NodesSvc, data, docTypes, templates) {
        $scope.nodes = data;
        $scope.docTypes = docTypes;
        $scope.templates = templates;
        $scope.$expanded = {};

        $scope.loadNodes = function () {
            NodesSvc.all().then(function (data) {
                $scope.nodes = data;
            });
        };

        $scope.saveNode = function () {
            var url = ($scope.n && $scope.n.id) ? '/cms/api/node/' + $scope.n.id : '/cms/api/nodes';
            $http.post(url, $scope.n).then(function () {
                $scope.loadNodes();
                $scope.n = null;
            });
        };

        $scope.selectNode = function (node) {
            angular.forEach($scope.docTypes, function (docType) {
                if (docType.id === node.document.docType.id) {
                    node.document.docType = docType;
                }
            });
            $scope.n = node;
        };

        $scope.newNode = function () {
            $scope.n = {};
        };

        $scope.deleteNode = function (id) {
            var url = '/cms/api/node/' + id;
            $http.delete(url).then(function () {
                $scope.loadNodes();
                $scope.n = {};
            });
        };

        $scope.nodeHasChildren = function (node) {
            var ret = false;
            angular.forEach($scope.nodes, function (n) {
                if (n.parent_id === node.id) {
                    ret = true;
                    return false;
                }
            });
            return ret;
        };
    }

    window.app.controller('NodesCtrl', ['$scope', '$http', 'NodesSvc', 'data', 'docTypes', 'templates', NodesCtrl]);

})(window);
