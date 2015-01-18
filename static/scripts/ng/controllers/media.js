(function (window) {
    'use strict';

    function MediaCtrl($scope, $upload, MediaSvc, media) {
        $scope.allMedia = media;

        $scope.refresh = function () {
            MediaSvc.all().then(function (resp) {
                $scope.allMedia = resp.data;
            });
        };

        $scope.upload = function () {
            $scope.$uploading = true;
            $scope.upload = $upload.upload({
                url: '/cms/api/media',
                method: 'POST',
                file: $scope.uploads
            }).progress(function (evt) {
                $scope.$uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data, status, headers, config) {
                $scope.uploads = null;
                $scope.$uploading = false;

                $scope.refresh();
            });
        };

        $scope.delete = function (media) {
            MediaSvc.delete(media.id).then(function (resp) {
                $scope.allMedia.splice($scope.allMedia.indexOf(media), 1);
            });
        };
    }

    window.app.controller('MediaCtrl', ['$scope', '$upload', 'MediaSvc', 'media', MediaCtrl]);

})(window);
