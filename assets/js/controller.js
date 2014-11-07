var rssApp = angular.module('rssCtrl', []);

rssApp.controller('FeedCtrl', function ($scope) {
    var channels = [
        {
            'title': 'Android Phones',
            'link': 'http://en.wikipedia.org/wiki/Smartphone',
            'description': 'About Android Phones',
            'feed': [
                {
                    'title': 'Nexus S',
                    'link': 'https://ru.wikipedia.org/wiki/Nexus_S',
                    'description': 'Fast just got faster with Nexus S.'
                },
                {
                    'title': 'Motorola XOOM™ with Wi-Fi',
                    'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
                    'description': 'The Next, Next Generation tablet.'
                },
                {
                    'title': 'MOTOROLA XOOM™',
                    'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
                    'description': 'The Next, Next Generation tablet.'
                }
            ]
        },
        {
            'title': 'iPhones',
            'link': 'https://ru.wikipedia.org/wiki/IPhone',
            'description': 'About iPhones',
            'feed': [
                {
                    'title': 'iPhone 4',
                    'link': 'https://ru.wikipedia.org/wiki/IPhone_4',
                    'description': 'Some info'
                },
                {
                    'title': 'iPhone 5',
                    'link': 'https://ru.wikipedia.org/wiki/IPhone_5',
                    'description': 'Some info'
                },
                {
                    'title': 'iPhone 6',
                    'link': 'http://ru.wikipedia.org/wiki/IPhone_6',
                    'description': 'Some info'
                }
            ]
        }
    ];

    $scope.channels = channels;
    $scope.myChannel = $scope.channels[0];

    $scope.select = function (index) {
        $scope.selected = index;
    };
});

rssApp.controller('NavCtrl', function ($scope) {

    var links = [
        {
            'name': 'Лента',
            'link': 'feed'
        },
        {
            'name': 'Менеджер новостей',
            'link': 'manage'
        }
    ];

    $scope.links = links;
    $scope.selected = 0;

    $scope.select = function (index) {
        $scope.selected = index;
    };
});

rssApp.controller('ManageCtrl', function ($scope) {
    var channels = [
        {
            'title': 'Android Phones',
            'link': 'http://en.wikipedia.org/wiki/Smartphone',
            'description': 'About Android Phones',
            'feed': [
                {
                    'title': 'Nexus S',
                    'link': 'https://ru.wikipedia.org/wiki/Nexus_S',
                    'description': 'Fast just got faster with Nexus S.'
                },
                {
                    'title': 'Motorola XOOM™ with Wi-Fi',
                    'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
                    'description': 'The Next, Next Generation tablet.'
                },
                {
                    'title': 'MOTOROLA XOOM™',
                    'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
                    'description': 'The Next, Next Generation tablet.'
                }
            ]
        },
        {
            'title': 'iPhones',
            'link': 'https://ru.wikipedia.org/wiki/IPhone',
            'description': 'About iPhones',
            'feed': [
                {
                    'title': 'iPhone 4',
                    'link': 'https://ru.wikipedia.org/wiki/IPhone_4',
                    'description': 'Some info'
                },
                {
                    'title': 'iPhone 5',
                    'link': 'https://ru.wikipedia.org/wiki/IPhone_5',
                    'description': 'Some info'
                },
                {
                    'title': 'iPhone 6',
                    'link': 'http://ru.wikipedia.org/wiki/IPhone_6',
                    'description': 'Some info'
                }
            ]
        }
    ];

    $scope.channels = channels;
    $scope.myChannel = $scope.channels[0];

    $scope.select = function (index) {
        $scope.selected = index;
    };
});