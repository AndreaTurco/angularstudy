(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('myApp', [
        'ngRoute',
        'myApp.view1',
        'myApp.view2',
        'myApp.version'
    ]).config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);
})();

(function () {
    'use strict';
    angular.module('myApp')
        .controller('ManageDomsParallax', ['ParallaxPxAmount', '$window','$scope', function (ParallaxPxAmount,$window,$scope) {
            var prx = this,
                offsetX = 100,
                $thumb = angular.element("#thumb"),
                $description = angular.element("#description");
            angular.element($window).bind("scroll", function () {
                $thumb.css("top",ParallaxPxAmount(offsetX, $thumb, $description));
            });
        }]);
})();

(function () {
    'use strict';
    angular.module('myApp')
        .factory("ParallaxPxAmount", function () {

            return function (offsetX, $thumb, $description) {
                var $window = $(window),
                    windowHeight = $window.outerHeight(),
                    descriptionHeight = $description.outerHeight(),
                    thumbHeight = $thumb.outerHeight();

                var scrollRapport = (windowHeight - thumbHeight - offsetX) / ( descriptionHeight - windowHeight);
                return parseInt(( $window.scrollTop() * scrollRapport ) + offsetX);

            }
        });
})();