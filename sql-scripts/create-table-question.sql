USE `shirt_shop`;

DROP TABLE IF EXISTS `question`;

CREATE TABLE `question` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_email` varchar(45) NOT NULL,
    `title` varchar(45) NOT NULL,
    `question` varchar(100) NOT NULL,
    `response` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;