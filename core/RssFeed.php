<?php

namespace core;

require_once('DataBase.php');

class RssFeed
{
    private $_feed = '';

    public function __construct($channelId)
    {
        $db = new DataBase();
        $db->extract($channelId);
        $data = $db->getFeed();

        $feed = '<?xml version="1.0" encoding="UTF-8" ?>';
        $feed .= '<rss version="2.0">';

        for ($i = 0; $i < count($data); $i += 1) {
            $feed .= '<channel>';
            $feed .= '<title>' . $data[$i]['title'] . '</title>';
            $feed .= '<link>' . $data[$i]['link'] . '</link>';
            $feed .= '<description>' . $data[$i]['description'] . '</description>';
            $feed .= '<pubDate>' . $data[$i]['datetime'] . '</pubDate>';

            for ($j = 0; $j < count($data[$i]['feed']); $j += 1) {
                $tmp = $data[$i]['feed'][$j];
                $feed .= '<item>';
                $feed .= '<title>' . $tmp['title'] . '</title>';
                $feed .= '<link>' . $tmp['link'] . '</link>';
                $feed .= '<description>' . $tmp['description'] . '</description>';

                // localhost
                $feed .= '<image>' . 'localhost/rsslab/' . $tmp['image'] . '</image>';
                // remote server
                //$feed .= '<image>' . $_SERVER['DOCUMENT_ROOT'] . $tmp['image'] . '</image>';
                $feed .= '<pubDate>' . $tmp['datetime'] . '</pubDate>';
                $feed .= '</item>';
            }
            $feed .= '</channel>';
        }
        $feed .= '</rss>';

        $this->_feed = $feed;
    }

    public function getFeed()
    {
        if(!empty($this->_feed)) {
            echo $this->_feed;
        } else {
            echo '<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><nofeed>No Feed!</nofeed>';
        }
    }
} 