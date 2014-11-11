<?php

namespace Core;

require_once('DataBase.php');

$feed = new DataBase();
$feed->extractAll();

echo json_encode($feed->getFeed());