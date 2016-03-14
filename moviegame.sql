-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2016 at 06:05 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `moviegame`
--

-- --------------------------------------------------------

--
-- Table structure for table `gamewords`
--

CREATE TABLE IF NOT EXISTS `gamewords` (
  `title` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gamewords`
--

INSERT INTO `gamewords` (`title`) VALUES
('anchorman'),
('a new hope'),
('angels and demons'),
('argo'),
('avatar'),
('braveheart'),
('bruce almighty'),
('dodgeball'),
('empire strikes back'),
('fellowship of the ring'),
('forrest gump'),
('indiana jones'),
('jurassic park'),
('my neighbor totoro'),
('return of the jedi'),
('rocknrolla'),
('rush hour'),
('shanghai knights'),
('stargate'),
('star trek'),
('step brothers'),
('the adjustment bureau'),
('the avengers'),
('the dark knight'),
('the davinci code'),
('the gladiator'),
('the internship'),
('the two towers'),
('x-men: first class'),
('robinhood'),
('inception'),
('pulp fiction');

-- --------------------------------------------------------

--
-- Table structure for table `highscores`
--

CREATE TABLE IF NOT EXISTS `highscores` (
  `score` int(10) DEFAULT '100',
  `username` varchar(16) NOT NULL,
  `id` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `highscores`
--

INSERT INTO `highscores` (`score`, `username`, `id`) VALUES
(1500, 'wrdana', 1),
(3000, 'JoshuaSL', 2),
(200, 'TalTal', 3),
(1000, 'AriKarate', 4),
(500, 'ShyGuy', 6),
(100, 'harry potter', 9),
(100, 'harry potter', 10),
(80, 'ofir', 11);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
