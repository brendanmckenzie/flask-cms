(function (window) {
    'use strict';

    function TemplatesSvc($http) {

        this.all = function () {
            return $http.get('/cms/api/templates').then(function (resp) {
                return resp.data;
            });
        };

        return this;
    }

    window.app.service('TemplatesSvc', ['$http', TemplatesSvc]);

})(window);
