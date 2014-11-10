<?php

namespace Core;

use \PDO;
use \PDOException;
use \DateTime;

/**
 * Description of DataBase
 *
 * @author kgt
 */
class DataBase
{
//  server settings
//    private $host = 'mysql.hostinger.com.ua';
//    private $user = 'u894053700_root';
//    private $password = 'qu7C5K5sktyfI79Rt';
//    private $db = 'u894053700_rss';

//  localhost settings
    private $host = 'localhost';
    private $user = 'root';
    private $password = '';
    private $db = 'rss_ar';

    private $charset = 'utf8';
    private $pdo = null;
    private $feed = array();

    public function __construct()
    {
        $dsn = "mysql:host=$this->host;dbname=$this->db;charset=$this->charset";
        $opt = array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_PERSISTENT => true
        );

        try {
            $this->pdo = new PDO($dsn, $this->user, $this->password, $opt);
        } catch (PDOException $e) {
            die('Подключение не удалось: ' . $e->getMessage());
        }
    }

    // i know, it's bad
    private function deleteImage($path)
    {
        $deletePath = $_SERVER['DOCUMENT_ROOT'] .
            DIRECTORY_SEPARATOR . 'index' .
            DIRECTORY_SEPARATOR . 'rsslab' .
            DIRECTORY_SEPARATOR . $path;

        // for remote host
//        $deletePath = $_SERVER['DOCUMENT_ROOT'] .
//        DIRECTORY_SEPARATOR . $path;

        if (file_exists($deletePath)) {
            unlink($deletePath);
        }
    }

    public function deleteNewsflash($params)
    {
        $query = "SELECT image FROM newsflash WHERE id=?";
        $sth = $this->pdo->prepare($query);
        $sth->execute(array($params));

        $data = $sth->fetch();
        $this->deleteImage($data['image']);

        $query = "DELETE FROM newsflash WHERE id=?";
        $sth = $this->pdo->prepare($query);
        $sth->execute(array($params));

        $query = "DELETE FROM news WHERE newsflash=?";
        $sth = $this->pdo->prepare($query);
        $sth->execute(array($params));
    }

    public function deleteChannel($params)
    {

        $query = "SELECT newsflash FROM news WHERE channel=?";
        $sth = $this->pdo->prepare($query);
        $sth->execute(array($params));

        $data = $sth->fetchAll();

        for ($i = 0; $i < count($data); $i += 1) {
            $this->deleteNewsflash($data[$i]['newsflash']);
        }

        $query = "DELETE FROM news WHERE channel=?";
        $sth = $this->pdo->prepare($query);
        $sth->execute(array($params));

        $query = "DELETE FROM channel WHERE id=?";
        $sth = $this->pdo->prepare($query);
        $sth->execute(array($params));
    }

    public function insertNewsflash($params)
    {
        $date = new DateTime('now');
        $result = $date->format('d-m-Y H:i:s');

        $query = "INSERT INTO newsflash (title, description, link, image, datetime) VALUES (:title, :description, :link, :image, :datetime)";
        $sth = $this->pdo->prepare($query);
        $sth->bindParam(':title', $params->title);
        $sth->bindParam(':description', $params->description);
        $sth->bindParam(':link', $params->link);
        $sth->bindParam(':image', $params->image);
        $sth->bindParam(':datetime', $result);
        $sth->execute();

        $query = "SELECT MAX(id) AS id FROM newsflash;";
        $sth = $this->pdo->prepare($query);
        $sth->execute();

        $data = $sth->fetch();

        $query = "INSERT INTO news (channel, newsflash) VALUES (:channel, :max)";
        $sth = $this->pdo->prepare($query);
        $sth->bindParam(':channel', $params->channel);
        $sth->bindParam(':max', $data['id']);
        $sth->execute();

    }

    public function insertChannel($params)
    {
        $date = new DateTime('now');
        $result = $date->format('d-m-Y H:i:s');

        $query = "INSERT INTO channel (title, description, link, datetime) VALUES (:title, :description, :link, :datetime)";

        $sth = $this->pdo->prepare($query);
        $sth->bindParam(':title', $params->title);
        $sth->bindParam(':description', $params->description);
        $sth->bindParam(':link', $params->link);
        $sth->bindParam(':datetime', $result);
        $sth->execute();
    }

    public function extract()
    {
        $query = "SELECT * FROM channel";
        $sth = $this->pdo->prepare($query);
        $sth->execute();

        $data = $sth->fetchAll();


        for ($i = 0; $i < count($data); $i += 1) {

            $this->feed[] = array(
                'id' => $data[$i]['id'],
                'channel_id' => $data[$i]['id'],
                'title' => $data[$i]['title'],
                'description' => $data[$i]['description'],
                'link' => $data[$i]['link'],
                'datetime' => $data[$i]['datetime'],
                'feed' => array());
        }

        $query = "SELECT newsflash.id, newsflash.title, newsflash.link, newsflash.description, newsflash.image, newsflash.datetime, news.channel
                  FROM newsflash
                  INNER JOIN news
                  ON newsflash.id = news.newsflash";
        $sth = $this->pdo->prepare($query);
        $sth->execute();

        $data = $sth->fetchAll();

        for ($i = 0; $i < count($data); $i += 1) {
            for ($j = 0; $j < count($this->feed); $j += 1) {
                if ($this->feed[$j]['id'] == $data[$i]['channel']) {
                    $this->feed[$j]['feed'][] = array(
                        'id' => $data[$i]['id'],
                        'title' => $data[$i]['title'],
                        'description' => $data[$i]['description'],
                        'link' => $data[$i]['link'],
                        'image' => $data[$i]['image'],
                        'datetime' => $data[$i]['datetime']
                    );
                }
            }
        }

    }

    public function getFeed()
    {
        if (!empty($this->feed))
            return $this->feed;
        else
            return "No feed";
    }
}