var rssApp = angular.module('rssApp', [
    'ngRoute',
    'ui.bootstrap',
    'rssCtrl',
    'angularFileUpload'
]);

rssApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            redirectTo: '/feed'
        }).
        when('/feed', {
            templateUrl: 'partials/feed.html',
            controller: 'FeedCtrl'
        }).
        when('/manage', {
            templateUrl: 'partials/manage.html',
            controller: 'ManageCtrl'
        }).
        otherwise({
            redirectTo: '/feed'
        });
}]);