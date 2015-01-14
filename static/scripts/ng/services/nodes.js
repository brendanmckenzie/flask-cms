(function (window) {
    'use strict';

    function NodesSvc($http) {

        this.all = function () {
            return $http.get('/cms/api/nodes').then(function (resp) {
                return resp.data;
            });
        };

        this.get = function (id) {
            return $http.get('/cms/api/node/' + id).then(function (resp) {
                return resp.data;
            });
        };

        return this;
    }

    window.app.service('NodesSvc', ['$http', NodesSvc]);

})(window);
