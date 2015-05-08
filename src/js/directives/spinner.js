angular.module('app')
    .directive('spinner', function () {
    return {
        restrict: "E",
        templateUrl: "views/directives/spinner.html",
        scope: {
            showSpinner: "@",
            position: "@",
            top: '@'
        },
        link: function(scope, element, attrs) {
            var spinnerContainer = element.children()[0];
            //use the $watch to listen for our spinner value.
            scope.$watch(attrs.showSpinner, function(showSpinner) {
              //if the showSpinner attribute is set to false,
              //angular sets it as a string by default.
              //we need to set the type to a boolean
              scope.type = typeof showSpinner;
              scope.showSpinner = showSpinner;
            });

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