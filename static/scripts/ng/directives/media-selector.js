(function (window) {
    'use strict';

    function MediaSelector() {
        var directive = {
            restrict: 'A',
            replace: false,
            scope: {
                'ngModel': '=ngModel'
            }
        };

        directive.link = function (scope, elem) {
            scope.elem = elem;

            scope.init();
        };

        directive.controller = ['$scope', '$modal', function ($scope, $modal) {
            $scope.init = function () {
                $($scope.elem).on('click', function () {
                    $scope.$apply(function () { $scope.show(); });
                });
            };

            $scope.show = function () {
                var modalInst = $modal.open({
                    templateUrl: window.static_root + 'dialogs/media-selector.html',
                    controller: 'MediaSelectorCtrl',
                    resolve: {
                        media: function (MediaSvc) {
                            return MediaSvc.all();
                        }
                    }
                });

                modalInst.result.then(function (selection) {
                    $scope.ngModel = selection;
                }, function () {

                });
            };
        }];

        return directive;
    }

    window.app.directive('mediaSelector', MediaSelector);

    function MediaSelectorCtrl($scope, $modalInstance, media) {
        $scope.allMedia = media;

        $scope.select = function (selection) {
            $modalInstance.close(selection);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

    window.app.controller('MediaSelectorCtrl', ['$scope', '$modalInstance', 'media', MediaSelectorCtrl]);
})(window);
