<?php

namespace Core;

/**
 * Description of DataBase
 *
 * @author kgt
 */
class DataBase
{

    private $host = 'localhost';
    private $user = 'root';
    private $password = '';
    private $db = 'rss_ar';
    private $queryString = '';
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

    public function insertNewsflash($params)
    {
        $this->queryString = "INSERT INTO newsflash (title, description, link)"
                . "VALUES ('{$params->title}', '{$params->description}', '{$params->link}')";
        $this->execute();

        $this->queryString = "@max := SELECT MAX(id) FROM newsflash;"
                . "INSERT INTO news (channel, newsflash)"
                . "VALUES ('{$params->channel}', '@max')";
        $this->execute();
    }

    public function insertChannel($params)
    {
        $this->queryString = "INSERT INTO channel (title, description, link)"
                . "VALUES ('{$params->title}', '{$params->description}', '{$params->link}')";
        $this->execute();
    }

    public function extract($param)
    {
        $tmpChannels = array();
        $this->queryString = "SELECT id, channel, newsflash FROM news";
        $this->execute();

        while ($row = mysql_fetch_array($this->result)) {
            $tmpFeed[] = array('id' => $row['id'],
                'channel' => $row['channel'],
                'newsflash' => $row['newsflash']);
        }

        $this->queryString = "SELECT id, title, description, link FROM channel";
        $this->execute();

        while ($row = mysql_fetch_array($this->result)) {
            $tmpChannels[] = array('id' => $row['id'],
                'title' => $row['title'],
                'desription' => $row['desription'],
                'link' => $row['link']);
        }

        for ($i = 0; $i <= count($tmpFeed); $i += 1) {
            $tmpNewsflash = array();

            $this->queryString = "SELECT id, title, description, link FROM newsflash WHERE id={$tmpFeed[$i]->newsflash}";
            $this->execute();

            while ($row = mysql_fetch_array($this->result)) {
                $tmpChannels[] = array('id' => $row['id'],
                    'title' => $row['title'],
                    'desription' => $row['desription'],
                    'link' => $row['link']);
            }
        }
    }

    private function execute()
    {
        if (!empty($this->query_string) && $this->query_string != "") {
            $this->result = mysql_query($this->query_string) or die(mysql_error());
        }
        $this->queryString = '';
    }

    public function getFeed()
    {
        if (!empty($this->feed))
            return $this->feed;
    }

}