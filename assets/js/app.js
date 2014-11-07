var rssApp = angular.module('rssApp', [
    'ngRoute',
    'rssCtrl'
]);

rssApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/feed.html',
            controller: 'FeedCtrl'
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