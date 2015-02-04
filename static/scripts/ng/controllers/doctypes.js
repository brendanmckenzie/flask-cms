(function (window) {
    'use strict';

    function DocTypesCtrl($scope, $http, docTypes, fieldTypes) {
        $scope.docTypes = docTypes;

        $scope.fieldTypes = fieldTypes;

        $scope.loadDocTypes = function () {
            $http.get('/cms/api/doc-types').then(function (resp) {
                $scope.docTypes = resp.data;
            });
        };

        $scope.$on('doctypes:updated', function () {
            $scope.loadDocTypes();
        });
    }

    window.app.controller('DocTypesCtrl', ['$scope', '$http', 'docTypes', 'fieldTypes', DocTypesCtrl]);

    function DocTypeDetailCtrl($scope, $http, $state, docType) {
        $scope.docType = docType;

        $scope.saveDocType = function () {
            var url = ($scope.docType && $scope.docType.id) ? '/cms/api/doc-type/' + $scope.docType.id : '/cms/api/doc-types';
            $http.post(url, $scope.docType).then(function () {
                $scope.$emit('doctypes:updated');

                $state.transitionTo('doctypes');
            });
        };

        $scope.export = function () {
            window.location = '/cms/api/doc-type/' + $scope.docType.id + '/export';
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
                            $scope.docType.alias = obj.alias;
                            $scope.docType.name = obj.name;
                            $scope.docType.fields = obj.fields;
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

    window.app.controller('DocTypeDetailCtrl', ['$scope', '$http', '$state', 'docType', DocTypeDetailCtrl]);

})(window);
