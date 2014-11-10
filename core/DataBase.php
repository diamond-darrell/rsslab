<?php

namespace Core;

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
    private $password = 'thatsinsane';
    private $db = 'rss_ar';

    private $query_string = '';
    private $result = null;
    private $feed = array();

    public function connect()
    {
        $dbn = mysql_connect($this->host, $this->user, $this->password) or die("Cannot connect to MySQL!");
        mysql_select_db($this->db) or die("Cannot connect to database!");
        mysql_query("set character_set_client='utf8'");
        mysql_query("set character_set_results='utf8'");
        mysql_query("set collation_connection='utf8_general_ci'");
    }

    public function deleteNewsflash($params)
    {
        $this->query_string = "DELETE FROM newsflash WHERE id='{$params}'";
        $this->execute();

        $this->query_string = "DELETE FROM news WHERE newsflash='{$params}'";
        $this->execute();
    }

    public function deleteChannel($params)
    {
        $this->query_string = "SELECT newsflash FROM news WHERE channel='{$params}'";
        $this->execute();

        $row = mysql_fetch_array($this->result);
        $this->query_string = "DELETE FROM newsflash WHERE id='{$row['newsflash']}'";
        $this->execute();

        $this->query_string = "DELETE FROM news WHERE channel='{$params}'";
        $this->execute();

        $this->query_string = "DELETE FROM channel WHERE id='{$params}'";
        $this->execute();

    }

    public function insertNewsflash($params)
    {
        $max = 0;
        $date = new \DateTime('now');
        $result = $date->format('d-m-Y H:i:s');

        $this->query_string = "INSERT INTO newsflash (title, description, link, image, datetime) VALUES ('{$params->title}', '{$params->description}', '{$params->link}', '{$params->image}', '{$result}');";
        $this->execute();

        $this->query_string = "SELECT MAX(id) AS id FROM newsflash;";
        $this->execute();
        while ($row = mysql_fetch_array($this->result)) {
            $max = $row['id'];
        }

        $this->query_string = "INSERT INTO news (channel, newsflash) VALUES ('{$params->channel}', '{$max}');";
        $this->execute();
    }

    public function insertChannel($params)
    {
        $date = new \DateTime('now');
        $result = $date->format('d-m-Y H:i:s');

        $this->query_string = "INSERT INTO channel (title, description, link, datetime) VALUES ('{$params->title}', '{$params->description}', '{$params->link}', '{$result}')";
        $this->execute();
    }

    public function extract()
    {
        $this->query_string = "SELECT * FROM channel";
        $this->execute();

        while ($row = mysql_fetch_array($this->result)) {
            $this->feed[] = array(
                'id' => $row['id'],
                'channel_id' => $row['id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'link' => $row['link'],
                'datetime' => $row['datetime'],
                'feed' => array());
        }

        $this->query_string = "SELECT newsflash.id, newsflash.title, newsflash.link, newsflash.description, newsflash.image, newsflash.datetime, news.channel
                               FROM newsflash
                               INNER JOIN news
                               ON newsflash.id = news.newsflash";
        $this->execute();

        while ($row = mysql_fetch_array($this->result)) {
            for ($i = 0; $i < count($this->feed); $i += 1) {
                if ($this->feed[$i]['id'] == $row['channel']) {
                    $this->feed[$i]['feed'][] = array(
                        'id' => $row['id'],
                        'title' => $row['title'],
                        'description' => $row['description'],
                        'link' => $row['link'],
                        'image' => $row['image'],
                        'datetime' => $row['datetime']
                    );
                }
            }
        }
    }

    private function execute()
    {
        if (!empty($this->query_string) && $this->query_string != "") {
            $this->result = mysql_query($this->query_string) or die(mysql_error());
        }
        $this->query_string = '';
    }

    public function getFeed()
    {
        if (!empty($this->feed))
            return $this->feed;
    }

}