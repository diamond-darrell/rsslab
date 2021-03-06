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
        //console.log($scope.channels);
    }).error(function () {
        $scope.onAlert($scope.alertsMsg.FAIL);
    }).then(function () {
        $scope.channels = $scope.rewriteArraysId($scope.channels);
        $scope.currentChannel = $scope.channels[0];
        $scope.currentChannelId = $scope.currentChannel.channel_id;

        //console.log($scope.currentChannel);
    });

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
        $timeout($scope.removeAlert, 5000);


    };

    $scope.removeAlert = function () {
        $scope.alertClass = "animated fadeOutDown";
        $timeout(function () {
            $scope.alerts = [];
        }, 800);
    };

    $scope.selectChange = function (channel) {
        $scope.currentChannelId = channel.channel_id;
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
rssApp.controller('ManageCtrl', function ($scope, $http, FileUploader) {

    var image = "";

    //-----------------------------------------------------------------------
    // client side functions
    //-----------------------------------------------------------------------
    $scope.select = function (index) {
        $scope.selected = index;
    };

    $scope.deleteChannel = function (index, id) {
        dataBase.deleteChannel(id);

        $scope.channels.splice(index, 1);
        $scope.currentChannel = $scope.channels[0];
        $scope.channels = $scope.rewriteArraysId($scope.channels);
    };

    $scope.deleteNewsflash = function (index, id) {
        var newsflashId = $scope.channels[id].feed[index].id;

        dataBase.deleteNewsflash(newsflashId);

        $scope.channels[id].feed.splice(index, 1);

    };

    $scope.addNewsflash = function (channel, channel_id, newsflash) {
        newsflash.id = $scope.channels[channel].feed.length;
        newsflash.channel = channel_id;
        newsflash.image = "images/" + image;
        $scope.channels[channel].feed.push(newsflash);

        dataBase.saveNewsflash(newsflash);
    };

    $scope.addChannel = function (channel) {

        channel.id = $scope.channels.length;
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

    var uploader = $scope.uploader = new FileUploader({
        url: 'core/upload.php'
    });

    // FILTERS

    uploader.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // sorry for that T_T
    // you can kill me later
    $scope.fileNameChanged = function () {
        var input = document.getElementById("newsflash-img");
        image = input.value.substr(12);

        //console.log(image);
    };
});


//-----------------------------------------------------------------------
// ReadCtrl controller
//-----------------------------------------------------------------------

var feeds = [];

rssApp.factory('FeedLoader', function ($resource) {
    return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
        fetch: {method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'}}
    });
})
    .service('FeedList', function ($rootScope, FeedLoader) {
        this.get = function (feedSources) {

            if (feeds.length === 0) {
                for (var i = 0; i < feedSources.length; i++) {
                    FeedLoader.fetch({q: feedSources[i].url, num: 10}, {}, function (data) {
                        var feed = data.responseData.feed;
                        feeds.push(feed);
                    });
                }
            }

            console.log(feeds);

            return feeds;
        };
    })
    .controller('ReadCtrl', function ($scope, FeedList) {

        var sources = [];

        $scope.addChannel = function (channel) {
            sources.push({url: channel});

            $scope.feeds = FeedList.get(sources);

            $scope.$on('FeedList', function (event, data) {
                $scope.feeds = data;
            });
            $scope.addChannel = [];
        };
    });