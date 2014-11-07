var rssApp = angular.module('rssCtrl', []);

rssApp.controller('GlobalCtrl', function ($scope) {
    $scope.channels = [
        {
            'id': 0,
            'title': 'Android Phones',
            'link': 'http://en.wikipedia.org/wiki/Smartphone',
            'description': 'About Android Phones',
            'feed': [
                {
                    'id': 0,
                    'title': 'Nexus S',
                    'link': 'https://ru.wikipedia.org/wiki/Nexus_S',
                    'description': 'Fast just got faster with Nexus S.'
                },
                {
                    'id': 1,
                    'title': 'Motorola XOOM™ with Wi-Fi',
                    'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
                    'description': 'The Next, Next Generation tablet.'
                },
                {
                    'id': 2,
                    'title': 'MOTOROLA XOOM™',
                    'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
                    'description': 'The Next, Next Generation tablet.'
                }
            ]
        },
        {
            'id': 1,
            'title': 'iPhones',
            'link': 'https://ru.wikipedia.org/wiki/IPhone',
            'description': 'About iPhones',
            'feed': [
                {
                    'id': 0,
                    'title': 'iPhone 4',
                    'link': 'https://ru.wikipedia.org/wiki/IPhone_4',
                    'description': 'Some info'
                },
                {
                    'id': 1,
                    'title': 'iPhone 5',
                    'link': 'https://ru.wikipedia.org/wiki/IPhone_5',
                    'description': 'Some info'
                },
                {
                    'id': 2,
                    'title': 'iPhone 6',
                    'link': 'http://ru.wikipedia.org/wiki/IPhone_6',
                    'description': 'Some info'
                }
            ]
        }
    ];
    $scope.myChannel = $scope.channels[0];
});

rssApp.controller('FeedCtrl', function ($scope) {



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

    $scope.select = function (index) {
        $scope.selected = index;
    };

    $scope.channelDelete = function (index) {
        $scope.channels.splice(index, 1);
        $scope.myChannel = $scope.channels[0];
    };

    $scope.newsflashDelete = function (index, id) {
        $scope.channels[id].feed.splice(index, 1);
    };

    $scope.addNewsflash = function (channel, newsflash) {
        var id = $scope.channels[channel].feed.length;
        newsflash.id = id;
        $scope.channels[channel].feed.push(newsflash);
        $scope.newsflash = [];
    };

    $scope.addChannel = function (channel) {
        var id = $scope.channels.length;

        channel.id = id;
        if (!('feed' in channel)) {
            channel.feed = [];
        }
        $scope.channels.push(channel);
        $scope.channel = [];
    };
});