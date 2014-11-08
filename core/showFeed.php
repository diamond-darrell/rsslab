<?php

namespace Core;

require_once('DataBase.php');

$feed = new DataBase();
$feed->connect();
$feed->extract();

echo json_encode($feed->getFeed());