var rssApp = angular.module('rssCtrl', []);

rssApp.controller('GlobalCtrl', function ($scope) {

    $scope.alertsMsg = {
        'SUCCESS': {
            'type': 'success',
            'msg': 'Ура! Изменения сохранены!'
        }
    };

    $scope.channels = [
        {
            'id': 0,
            'channel_id': 1,
            'title': 'Android Phones',
            'link': 'http://en.wikipedia.org/wiki/Smartphone',
            'description': 'About Android Phones',
            'feed': [
                {
                    'id': 0,
                    'news_id': 0,
                    'title': 'Nexus S',
                    'link': 'https://ru.wikipedia.org/wiki/Nexus_S',
                    'description': 'Fast just got faster with Nexus S.'
                },
                {
                    'id': 1,
                    'news_id': 1,
                    'title': 'Motorola XOOM™ with Wi-Fi',
                    'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
                    'description': 'The Next, Next Generation tablet.'
                },
                {
                    'id': 2,
                    'news_id': 2,
                    'title': 'MOTOROLA XOOM™',
                    'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
                    'description': 'The Next, Next Generation tablet.'
                }
            ]
        },
        {
            'id': 1,
            'channel_id': 1,
            'title': 'iPhones',
            'link': 'https://ru.wikipedia.org/wiki/IPhone',
            'description': 'About iPhones',
            'feed': [
                {
                    'id': 0,
                    'news_id': 4,
                    'title': 'iPhone 4',
                    'link': 'https://ru.wikipedia.org/wiki/IPhone_4',
                    'description': 'Some info'
                },
                {
                    'id': 1,
                    'news_id': 5,
                    'title': 'iPhone 5',
                    'link': 'https://ru.wikipedia.org/wiki/IPhone_5',
                    'description': 'Some info'
                },
                {
                    'id': 2,
                    'news_id': 6,
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

rssApp.controller('NavCtrl', function ($scope, $location) {

    $scope.isActive = function (location) {
        return location === $location.path();
    };

    $scope.selected = 0;

    $scope.select = function (index) {
        $scope.selected = index;
    };
});

rssApp.controller('ManageCtrl', function ($scope, $timeout) {

    $scope.select = function (index) {
        $scope.selected = index;
    };

    $scope.deleteChannel = function (index) {
        $scope.channels.splice(index, 1);
        $scope.myChannel = $scope.channels[0];
        $scope.channels = rewriteArraysId($scope.channels);

        onAlert($scope.alertsMsg.SUCCESS);
    };

    $scope.deleteNewsflash = function (index, id) {
        $scope.channels[id].feed.splice(index, 1);

        onAlert($scope.alertsMsg.SUCCESS);
    };

    $scope.addNewsflash = function (channel, newsflash) {
        var id = $scope.channels[channel].feed.length;

        newsflash.id = id;
        $scope.channels[channel].feed.push(newsflash);
        $scope.newsflash = [];

        onAlert($scope.alertsMsg.SUCCESS);
    };

    $scope.addChannel = function (channel) {
        var id = $scope.channels.length;

        channel.id = id;
        if (!('feed' in channel)) {
            channel.feed = [];
        }
        $scope.channels.push(channel);
        $scope.channel = [];

        onAlert($scope.alertsMsg.SUCCESS);
    };

    // rewrite `id` property in channel's array
    // bad idea, but works :)
    var rewriteArraysId = function (arr) {
        for (var i = 0; i < arr.length; i += 1) {
            arr[i].id = i;
        }
        return arr;
    };

    var onAlert = function (result) {
        $scope.alertClass = "animated fadeInDown";
        $scope.alerts = [
            {type: result.type, msg: result.msg}
        ];
        $timeout(removeAlert, 5000);


    };

    var removeAlert = function () {
        $scope.alertClass = "animated fadeOutDown";
        $timeout(function () {
            $scope.alerts = [];
        }, 800);

    }
});