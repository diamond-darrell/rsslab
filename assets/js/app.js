var rssApp = angular.module('rssApp', [
    'ngRoute',
    'ui.bootstrap',
    'rssCtrl',
    'angularFileUpload',
    'ngResource'
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
        when('/read', {
            templateUrl: 'partials/read.html',
            controller: 'ManageCtrl'
        }).
        otherwise({
            redirectTo: '/feed'
        });
}]);