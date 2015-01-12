(function () {
    'use strict';

    function ReallyClick() {
        var directive = {
            restrict: 'A',

            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    var message = attrs.ngReallyMessage || 'Are you sure?';
                    if (message && confirm(message)) {
                        scope.$apply(attrs.ngReallyClick);
                    }
                });
            }
        };

        return directive;
    }

    window.app.directive('ngReallyClick', ReallyClick);
})(window);
