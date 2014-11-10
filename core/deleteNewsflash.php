<?php

namespace Core;

require_once('DataBase.php');

$request = json_decode(file_get_contents('php://input'));

//print_r($request);

$feed = new DataBase();
$feed->deleteNewsflash($request);