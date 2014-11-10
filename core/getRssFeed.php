<?php
header("Content-Type: application/xml; charset=UTF-8");

include ('RssFeed.php');

$feed = new core\RssFeed();

$feed->getFeed();

?>