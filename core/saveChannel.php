<?php

namespace Core;

require_once('DataBase.php');

$request = json_decode(file_get_contents('php://input'));

$feed = new DataBase();
$feed->insertChannel($request);