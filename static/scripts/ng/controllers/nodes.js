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
        if (node.document) {
            angular.forEach(docTypes, function (docType) {
                if (docType.id === node.document.docType.id) {
                    node.document.docType = docType;
                }
            });
        }

        if (node.parent_id) {
            angular.forEach($scope.nodes, function (node2) {
                if (node2.id === node.parent_id) {
                    node.parent = node2;
                }
            });
        }

        $scope.node = node;
        $scope.docTypes = docTypes;
        $scope.templates = templates;

        $scope.saveNode = function () {
            if ($scope.node.parent) {
                $scope.node.parent_id = $scope.node.parent.id;
            }

            var url = ($scope.node && $scope.node.id) ? '/cms/api/node/' + $scope.node.id : '/cms/api/nodes';
            $http.post(url, $scope.node).then(function () {
                $scope.$emit('nodes:updated');

                // $state.transitionTo('nodes');
            });
        };

        $scope.deleteNode = function () {
            var url = '/cms/api/node/' + $scope.node.id;
            $http.delete(url).then(function () {
                $scope.$emit('nodes:updated');

                $state.transitionTo('nodes');
            });
        };

        $scope.editorTemplateUrl = function (type) {
            return window.static_root + 'editors/' + type + '.html';
        };

        // TODO: angularify this
        $scope.import = function() {
            var el = document.createElement('input');
            el.type = 'file';

            el.addEventListener('change', function (ev) {
                var fd = ev.target.files[0];

                var reader = new FileReader();

                reader.onload = function (ev) {
                    var data = ev.target.result;

                    try {
                        var obj = JSON.parse(data);

                        $scope.$apply(function () {
                            if (!$scope.node.document) {
                                $scope.node.document = {};
                            }
                            $scope.node.alias = obj.alias;
                            $scope.node.document.data = obj.document.data;
                            $scope.node.document.template = obj.document.template;

                            angular.forEach($scope.docTypes, function (docType) {
                                if (docType.id === obj.document.docType.id) {
                                    $scope.node.document.docType = docType;
                                }
                            });
                        });
                    }
                    catch (ex) {
                        console.error('invalid file');
                    }
                };

                reader.readAsText(fd, 'UTF-8');
            });

            el.click();
        };
    }

    window.app.controller('NodeDetailCtrl', ['$scope', '$http', '$state', 'NodesSvc', 'node', 'docTypes', 'templates', NodeDetailCtrl]);

})(window);
