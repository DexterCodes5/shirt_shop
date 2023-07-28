USE `shirt_shop`;

DROP TABLE IF EXISTS `cart_item`;
DROP TABLE IF EXISTS `customer_order`;
DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
	`id` bigint NOT NULL AUTO_INCREMENT,
    `user_email` varchar(45) NOT NULL,
    `first_name` varchar(45) NOT NULL,
    `last_name` varchar(45) NOT NULL,
    `gender` varchar(6) NOT NULL,
    `city` varchar(45) NOT NULL,
    `postcode` varchar(45) NOT NULL,
    `street` varchar(45) NOT NULL,
    `number` varchar(45) NOT NULL,
    `additional_information` varchar(300) NOT NULL,
    `date_of_birth` varchar(10) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `customer_order` (
	`id` bigint NOT NULL AUTO_INCREMENT,
    `address_id` bigint NOT NULL,
    `billing_address_id` bigint DEFAULT NULL,
    `payment` varchar(45) NOT NULL,
    `voucher` varchar(45) DEFAULT NULL,
    `phone_number` varchar(45) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_ADDRESS_idx` (`address_id`),
    CONSTRAINT `FK_ADDRESS` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
    KEY `FK_BILLING_ADDRESS_idx` (`billing_address_id`),
    CONSTRAINT `FK_BILLING_ADDRESS` FOREIGN KEY (`billing_address_id`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `cart_item` (
	`id` bigint NOT NULL AUTO_INCREMENT,
    `customer_order_id` bigint NOT NULL,
    `shirt_id` bigint NOT NULL,
    `quantity` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_CUSTOMER_ORDER_idx` (`customer_order_id`),
    CONSTRAINT `FK_CUSTOMER_ORDER` FOREIGN KEY (`customer_order_id`) REFERENCES `customer_order` (`id`),
    KEY `FK_SHIRT_idx` (`shirt_id`),
    CONSTRAINT `FK_SHIRT` FOREIGN KEY (`shirt_id`) REFERENCES `shirt` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;