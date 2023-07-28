DROP DATABASE IF EXISTS `shirt_shop`;

CREATE DATABASE `shirt_shop`;

USE `shirt_shop`;

DROP TABLE IF EXISTS `shirt`;

CREATE TABLE `shirt` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `in_stock` int NOT NULL,
  `color` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `img` mediumblob  NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

