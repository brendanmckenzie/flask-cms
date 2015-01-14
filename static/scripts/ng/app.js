(function (window) {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ngProgress']);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', { template: '' })
            .state('nodes', {
                url: '/nodes',
                templateUrl: window.static_root + 'templates/nodes.html',
                controller: 'NodesCtrl',
                resolve: {
                    nodes: function (NodesSvc) {
                        return NodesSvc.all();
                    }
                }
            })
            .state('nodes.detail', {
                url: '/:id',
                templateUrl: window.static_root + 'templates/node_detail.html',
                controller: 'NodeDetailCtrl',
                resolve: {
                    node: function (NodesSvc, $stateParams) {
                        return NodesSvc.get($stateParams.id);
                    },
                    docTypes: function (DocTypesSvc) {
                        return DocTypesSvc.all();
                    },
                    templates: function (TemplatesSvc) {
                        return TemplatesSvc.all();
                    }
                }
            })
            .state('nodes.create', {
                url: '/new',
                templateUrl: window.static_root + 'templates/node_detail.html',
                controller: 'NodeDetailCtrl',
                resolve: {
                    node: function () {
                        return {};
                    },
                    docTypes: function (DocTypesSvc) {
                        return DocTypesSvc.all();
                    },
                    templates: function (TemplatesSvc) {
                        return TemplatesSvc.all();
                    }
                }
            })
            .state('doctypes', {
                url: '/doc-types',
                templateUrl: window.static_root + 'templates/doctypes.html',
                controller: 'DocTypesCtrl',
                resolve: {
                    data: function (DocTypesSvc) {
                        return DocTypesSvc.all();
                    }
                }
            })
            .state('routes', {
                url: '/routes',
                templateUrl: window.static_root + 'templates/routes.html',
                controller: 'RoutesCtrl',
                resolve: {
                    data: function (RoutesSvc) {
                        return RoutesSvc.all();
                    }
                }
            });
    }]);

    window.app = app;

})(window);
