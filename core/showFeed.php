<?php

namespace Core;

require_once('DataBase.php');

$feed = new DataBase();
$feed->extract();

echo json_encode($feed->getFeed());