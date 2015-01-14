(function (window) {
    'use strict';

    function RoutesSvc($http) {

        this.all = function () {
            return $http.get('/cms/api/all-routes').then(function (resp) {
                return resp.data;
            });
        };

        return this;
    }

    window.app.service('RoutesSvc', ['$http', RoutesSvc]);

})(window);
