-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 10 2014 г., 11:36
-- Версия сервера: 5.5.27
-- Версия PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `rss_ar`
--

-- --------------------------------------------------------

--
-- Структура таблицы `channel`
--

CREATE TABLE IF NOT EXISTS `channel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `link` text NOT NULL,
  `datetime` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `channel`
--

INSERT INTO `channel` (`id`, `title`, `description`, `link`, `datetime`) VALUES
(6, 'AUTO.RIA', 'AUTO.RIA.com – продажа авто на лучшем автосайте: купить автомобиль (машину) можно за несколько часов, а продать авто можно за несколько дней.', 'http://auto.ria.com/news/', '08-11-2014 17:37:02'),
(8, 'АВТОБАЗАР', 'На Автобазаре Украины удобная форма поиска и большой выбор автомобилей. Ваше объявление о продаже авто увидят тысячи посетителей ...', 'http://avtobazar.ua/newcars/news/', '08-11-2014 16:54:12');

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `channel` int(10) unsigned NOT NULL,
  `newsflash` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `channel`, `newsflash`) VALUES
(16, 6, 30),
(17, 6, 31),
(19, 8, 33),
(29, 6, 43),
(30, 8, 44);

-- --------------------------------------------------------

--
-- Структура таблицы `newsflash`
--

CREATE TABLE IF NOT EXISTS `newsflash` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `link` text NOT NULL,
  `image` text NOT NULL,
  `datetime` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

--
-- Дамп данных таблицы `newsflash`
--

INSERT INTO `newsflash` (`id`, `title`, `description`, `link`, `image`, `datetime`) VALUES
(30, 'Стартовало производство нового Nissan Murano', 'Кроссовер Nissan Murano третьего поколения дебютировал на автосалоне в Нью-Йорке этой весной, но производство стартовало только сейчас.', 'http://auto.ria.com/news/events/217134/index.html', 'images/img1.jpg', '08-11-2014 18:02:16'),
(31, 'У AUTO.RIA в наличии: Купе BMW 2-Series', 'Среди автомобилистов существует прекрасное высказывание о машинах марки BMW. Говорят, что человек, который хоть раз попробовал баварскую продукцию, уже никогда не предпочтет машину другого бренда. Это, и прочие достоинства автопроизводителя, баварские инженеры постарались передать своему весьма молодому представителю BMW 2-Series.', 'http://auto.ria.com/news/interesting/217131/index.html', 'images/img2.jpg', '08-11-2014 18:04:06'),
(33, 'Встречайте Новинку на украинском рынке Benelli BN600i Mototek.com.ua', 'Итальянская компания Benelli запускает в продажу на Украине новейшую модель BN600Gt 2014 г. После дебюта нового четырехцилиндрового Бенелли BN600I время запустить последнюю версию Gran Turismo. Дизайн родился в городе Пезаро ...', 'http://avtobazar.ua/avtosalony/1115567/news/vstrechayte-novinku-na-ukrainskom-rynke-benelli-bn600i-mototekcomua.html', 'images/img3.jpg', '08-11-2014 18:07:56'),
(43, '"Бюджетный" McLaren P13 нарекут Sport Series', 'В компании McLaren Cars определились с названием самой доступной модели.', 'http://auto.ria.com/news/auto/217130/index.html', 'images/217130f.jpg', '08-11-2014 20:19:13'),
(44, 'Первые автомобили Scania для компании SOCAR', '3 ноября на территории дилерского центра «Киев-Скан» состоялась торжественная передача первых 6 бензовозов Scania P400 с цистернами Stokota для сети АЗС «SOCAR».', 'http://avtobazar.ua/avtosalony/skaniya-ukraina/news/pervye-avtomobili-scania-dlya-kompanii-socar.html', 'images/f64ddc3be3b1b3db7b1c8c801d492008.JPG', '08-11-2014 20:20:36');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
