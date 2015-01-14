(function (window) {
    'use strict';

    var app = angular.module('app', ['ui.router', 'ngProgress']);

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('nodes', {
                templateUrl: window.static_root + 'templates/nodes.html',
                controller: 'NodesCtrl',
                resolve: {
                    data: function (NodesSvc) {
                        return NodesSvc.all();
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
                templateUrl: window.static_root + 'templates/doctypes.html',
                controller: 'DocTypesCtrl',
                resolve: {
                    data: function (DocTypesSvc) {
                        return DocTypesSvc.all();
                    }
                }
            })
            .state('routes', {
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
