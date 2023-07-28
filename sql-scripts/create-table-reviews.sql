USE `shirt_shop`;

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `rating` decimal (3,2) DEFAULT NULL,
  `shirt_id` BIGINT DEFAULT NULL,
  `description` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;