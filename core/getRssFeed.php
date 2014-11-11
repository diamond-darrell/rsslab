<?php
header("Content-Type: application/xml; charset=UTF-8");

include ('RssFeed.php');

$request = $_GET['channelId'];

$feed = new core\RssFeed($request);

$feed->getFeed();