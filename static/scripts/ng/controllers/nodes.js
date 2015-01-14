(function (window) {
    'use strict';

    function NodesCtrl($scope, $http, NodesSvc, nodes) {
        $scope.nodes = nodes;
        $scope.$expanded = {};

        $scope.loadNodes = function () {
            NodesSvc.all().then(function (data) {
                $scope.nodes = data;
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

        $scope.$on('nodes:updated', function () {
            $scope.loadNodes();
        });
    }

    window.app.controller('NodesCtrl', ['$scope', '$http', 'NodesSvc', 'nodes', NodesCtrl]);

    function NodeDetailCtrl($scope, $http, $state, NodesSvc, node, docTypes, templates) {
        angular.forEach(docTypes, function (docType) {
            if (docType.id === node.document.docType.id) {
                node.document.docType = docType;
            }
        });

        $scope.node = node;
        $scope.docTypes = docTypes;
        $scope.templates = templates;

        $scope.saveNode = function () {
            var url = ($scope.node && $scope.node.id) ? '/cms/api/node/' + $scope.node.id : '/cms/api/nodes';
            $http.post(url, $scope.node).then(function () {
                $scope.$emit('nodes:updated');

                $state.transitionTo('nodes');
            });
        };

        $scope.deleteNode = function () {
            var url = '/cms/api/node/' + $scope.node.id;
            $http.delete(url).then(function () {
                $scope.$emit('nodes:updated');

                $state.transitionTo('nodes');
            });
        };
    }

    window.app.controller('NodeDetailCtrl', ['$scope', '$http', '$state', 'NodesSvc', 'node', 'docTypes', 'templates', NodeDetailCtrl]);

})(window);
