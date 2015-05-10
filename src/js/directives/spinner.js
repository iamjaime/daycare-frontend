angular.module('app')
    .directive('spinner', function () {
    return {
        restrict: "E",
        templateUrl: "views/directives/spinner.html",
        scope: {
            showSpinner: "=",
            position: "@",
            top: '@'
        },
        link: function(scope, element, attrs) {
            var spinnerContainer = element.children()[0];

            spinnerContainer.style.color = '#d64635';
            spinnerContainer.style.position = 'fixed';
            spinnerContainer.style.top = '35%';
            spinnerContainer.style.left = '48%';
            spinnerContainer.style.height = '20%';
            spinnerContainer.style.width = '20%';
            spinnerContainer.style.zIndex = 999999;
        }
    };


});