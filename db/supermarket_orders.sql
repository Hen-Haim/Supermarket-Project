-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_shopping_cart` int NOT NULL,
  `final_price` varchar(45) NOT NULL,
  `city_to_deliver` varchar(45) NOT NULL,
  `street_to_deliver` varchar(255) NOT NULL,
  `shipping_date` date NOT NULL,
  `card_last_digits` int NOT NULL,
  `ordering_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3,10,'200','Tel-Aviv','Even Gvirol','2021-11-02',1234,'2021-08-22 00:00:00'),(4,3,14,'155.00','Tel-Aviv','Even-Gvirol','2021-08-02',1234,'2021-07-26 03:23:40'),(5,-1,15,'155.00','Tel-Aviv','Even-Gvirol','2021-08-02',1234,'2021-07-26 03:49:10'),(6,2,2,'200','Tel-Aviv','Yarkon','2021-08-24',1234,'2021-08-22 00:00:00'),(7,-1,13,'47.68','Oxford','sssssss','2021-10-13',1234,'2021-10-07 01:17:43'),(8,-1,180,'47.68','Tel Aviv','sssssss','2021-10-26',1234,'2021-10-07 01:25:53'),(9,-1,180,'47.68','Tel Aviv','sssssss','2021-10-26',1234,'2021-10-07 01:26:00'),(10,-1,181,'16.29','Oxford','sssssss','2021-10-18',1234,'2021-10-07 01:27:58'),(11,-1,182,'28.80','London','sssssss','2021-10-26',1234,'2021-10-07 01:30:49'),(12,-1,183,'12.40','Tel Aviv','sssssss','2021-10-19',1234,'2021-10-07 01:32:44'),(13,-1,184,'61.00','Liverpool','sssssss','2021-10-21',1234,'2021-10-07 01:38:06'),(14,-1,185,'29.19','Tel Aviv','sssssss','2021-10-29',1243,'2021-10-07 01:39:43'),(15,-1,186,'42.35','San Francisco','sssssss','2021-10-25',2112,'2021-10-07 01:42:22');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-07 17:17:34
