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
        $feed .= '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">';


        for ($i = 0; $i < count($data); $i += 1) {
            $feed .= '<channel>';

            // localhost
            $feed .= '<atom:link href="http://localhost/index/rsslab/core/getRssFeed.php?channelId=' . $channelId . '" rel="self" type="application/rss+xml" />';

            // remote server
//            $feed .= '<atom:link href="http://rsslab.esy.es/core/getRssFeed.php?channelId=' . $channelId . '" rel="self" type="application/rss+xml" />';

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

                // remote server
//                $feed .= '<media:content type="image/*" url="' . 'http://rsslab.esy.es/' . $tmp['image'] . '" />';

                // localhost
                $feed .= '<media:content type="image/*" url="' . 'localhost/rsslab/' . $tmp['image'] . '" />';

                $feed .= '<pubDate>' . $tmp['datetime'] . '</pubDate>';
                $feed .= '<guid>' . $tmp['link'] . '</guid>';
                $feed .= '</item>';
            }


            $feed .= '</channel>';
        }
        $feed .= '</rss>';

        $this->_feed = $feed;
    }

    public function getFeed()
    {
        if (!empty($this->_feed)) {
            echo $this->_feed;
        } else {
            echo '<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><nofeed>No Feed!</nofeed>';
        }
    }
} 