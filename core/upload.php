<?php

if (!empty($_FILES)) {

    $tempPath = $_FILES['file']['tmp_name'];
    $uploadPath = $_SERVER['DOCUMENT_ROOT'] .
        DIRECTORY_SEPARATOR . 'index' .
        DIRECTORY_SEPARATOR . 'rsslab' .
        DIRECTORY_SEPARATOR . 'images' .
        DIRECTORY_SEPARATOR . $_FILES['file']['name'];

    move_uploaded_file($tempPath, $uploadPath);

    $answer = array('answer' => 'File transfer completed');
    $json = json_encode($answer);

    echo $json;

//    print_r($uploadPath);

} else {

    echo 'No files';

}