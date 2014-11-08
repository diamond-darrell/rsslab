var rssApp = angular.module('rssCtrl', []);

//-----------------------------------------------------------------------
// All page controller
//-----------------------------------------------------------------------
rssApp.controller('GlobalCtrl', function ($scope, $http, $timeout) {

    $scope.channels = [];

    // alert types and messages
    $scope.alertsMsg = {
        'SUCCESS': {
            'type': 'success',
            'msg': 'Ура! Изменения сохранены!'
        },
        'DANGER': {
            'type': 'danger',
            'msg': 'Хм... Что-то пошло не так. Данные не сохранены!'
        },
        'FAIL': {
            'type': 'danger',
            'msg': 'Данные не загружены!'
        }
    };

    $http.get('core/showFeed.php').success(function (data) {
        $scope.channels = data;
    }).error(function () {
        $scope.onAlert($scope.alertsMsg.FAIL);
    }).then(function () {
        $scope.channels = $scope.rewriteArraysId($scope.channels);
        $scope.myChannel = $scope.channels[0];
    });

    // test data
    //$scope.channels = [
    //    {
    //        'id': 0,
    //        'channel_id': 1,
    //        'title': 'Android Phones',
    //        'link': 'http://en.wikipedia.org/wiki/Smartphone',
    //        'description': 'About Android Phones',
    //        'feed': [
    //            {
    //                'id': 0,
    //                'news_id': 0,
    //                'title': 'Nexus S',
    //                'link': 'https://ru.wikipedia.org/wiki/Nexus_S',
    //                'description': 'Fast just got faster with Nexus S.'
    //            },
    //            {
    //                'id': 1,
    //                'news_id': 1,
    //                'title': 'Motorola XOOM™ with Wi-Fi',
    //                'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
    //                'description': 'The Next, Next Generation tablet.'
    //            },
    //            {
    //                'id': 2,
    //                'news_id': 2,
    //                'title': 'MOTOROLA XOOM™',
    //                'link': 'https://ru.wikipedia.org/wiki/Motorola_XOOM',
    //                'description': 'The Next, Next Generation tablet.'
    //            }
    //        ]
    //    },
    //    {
    //        'id': 1,
    //        'channel_id': 1,
    //        'title': 'iPhones',
    //        'link': 'https://ru.wikipedia.org/wiki/IPhone',
    //        'description': 'About iPhones',
    //        'feed': [
    //            {
    //                'id': 0,
    //                'news_id': 4,
    //                'title': 'iPhone 4',
    //                'link': 'https://ru.wikipedia.org/wiki/IPhone_4',
    //                'description': 'Some info'
    //            },
    //            {
    //                'id': 1,
    //                'news_id': 5,
    //                'title': 'iPhone 5',
    //                'link': 'https://ru.wikipedia.org/wiki/IPhone_5',
    //                'description': 'Some info'
    //            },
    //            {
    //                'id': 2,
    //                'news_id': 6,
    //                'title': 'iPhone 6',
    //                'link': 'http://ru.wikipedia.org/wiki/IPhone_6',
    //                'description': 'Some info'
    //            }
    //        ]
    //    }
    //];

    // rewrite `id` property in channel's array
    // bad idea, but works :)
    $scope.rewriteArraysId = function (arr) {
        for (var i = 0; i < arr.length; i += 1) {
            arr[i].id = i;
        }
        return arr;
    };

    $scope.onAlert = function (result) {
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

//-----------------------------------------------------------------------
// Feed page controller
//-----------------------------------------------------------------------
rssApp.controller('FeedCtrl', function ($scope) {

});

//-----------------------------------------------------------------------
// Navigation controller
//-----------------------------------------------------------------------
rssApp.controller('NavCtrl', function ($scope, $location) {

    $scope.isActive = function (location) {
        return location === $location.path();
    };

    $scope.selected = 0;

    $scope.select = function (index) {
        $scope.selected = index;
    };
});

//-----------------------------------------------------------------------
// Manage page controller
//-----------------------------------------------------------------------
rssApp.controller('ManageCtrl', function ($scope, $http) {

    //-----------------------------------------------------------------------
    // client side functions
    //-----------------------------------------------------------------------
    $scope.select = function (index) {
        $scope.selected = index;
    };

    $scope.deleteChannel = function (index, id) {
        dataBase.deleteChannel(id);

        $scope.channels.splice(index, 1);
        $scope.myChannel = $scope.channels[0];
        $scope.channels = $scope.rewriteArraysId($scope.channels);
    };

    $scope.deleteNewsflash = function (index, id) {
        var newsflashId = $scope.channels[id].feed[index].id;

        dataBase.deleteNewsflash(newsflashId);

        $scope.channels[id].feed.splice(index, 1);

    };

    $scope.addNewsflash = function (channel, channel_id, newsflash) {
        var id = $scope.channels[channel].feed.length;

        newsflash.id = id;
        newsflash.channel = channel_id;
        $scope.channels[channel].feed.push(newsflash);

        dataBase.saveNewsflash(newsflash);
    };

    $scope.addChannel = function (channel) {
        var id = $scope.channels.length;

        channel.id = id;
        if (!('feed' in channel)) {
            channel.feed = [];
        }
        $scope.channels.push(channel);

        dataBase.saveChannel(channel);

    };

    //-----------------------------------------------------------------------
    // Server side functions
    //-----------------------------------------------------------------------
    var dataBase = {
        saveNewsflash: function (item) {
            $http.post('core/saveNewsflash.php', item).success(function () {
                $scope.onAlert($scope.alertsMsg.SUCCESS);
                $scope.newsflash = [];
            }).error(function () {
                $scope.onAlert($scope.alertsMsg.DANGER);
            });
            //console.log(item);
        },

        saveChannel: function (item) {
            $http.post('core/saveChannel.php', item).success(function () {
                $scope.onAlert($scope.alertsMsg.SUCCESS);
                $scope.channel = [];
            }).error(function () {
                $scope.onAlert($scope.alertsMsg.DANGER);
            });
            //console.log(item);
        },

        deleteChannel: function (id) {
            $http.post('core/deleteChannel.php', id).success(function () {
                $scope.onAlert($scope.alertsMsg.SUCCESS);
                $scope.channel = [];
            }).error(function () {
                $scope.onAlert($scope.alertsMsg.DANGER);
            });
        },

        deleteNewsflash: function (id) {
            $http.post('core/deleteNewsflash.php', id).success(function () {
                $scope.onAlert($scope.alertsMsg.SUCCESS);
                $scope.channel = [];
            }).error(function () {
                $scope.onAlert($scope.alertsMsg.DANGER);
            });
        }
    };
});