(function(window, angular, moment) {
    // remove facebook hash left after auth
    if (window.location.hash === '#_=_') {
        window.location.hash = '';
        history.pushState('', document.title,window.location.pathname);
    }

    angular.isDate = function (input) { return moment(input).isValid(); };

})(window, window.angular, window.moment);
