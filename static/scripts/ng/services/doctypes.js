(function (window) {
    'use strict';

    function DocTypesSvc($http) {

        this.all = function () {
            return $http.get('/cms/api/doc-types').then(function (resp) {
                return resp.data;
            });
        };

        this.get = function (id) {
            return $http.get('/cms/api/doc-type/' + id).then(function (resp) {
                return resp.data;
            });
        };

        this.fieldTypes = function () {
            return $http.get('/cms/api/field-types').then(function (resp) {
                return resp.data;
            });
        };

        return this;
    }

    window.app.service('DocTypesSvc', ['$http', DocTypesSvc]);

})(window);
