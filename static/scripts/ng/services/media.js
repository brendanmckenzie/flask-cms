(function (window) {
    'use strict';

    function MediaSvc($http) {

        this.all = function () {
            return $http.get('/cms/api/media').then(function (resp) {
                return resp.data;
            });
        };

        this.delete = function (id) {
            return $http.delete('/cms/api/media/' + id);
        };

        return this;
    }

    window.app.service('MediaSvc', ['$http', MediaSvc]);

})(window);
