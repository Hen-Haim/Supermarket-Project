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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `id_category` int NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `picture` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_category` (`id_category`),
  CONSTRAINT `fk_id_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Amul Cheese Spread',1,22.29,'amul-cheese-spread.jpg'),(2,'Bulgarian Cheese',1,25.39,'bulgarian-cheese.jpg'),(3,'Camembert Cheese',1,59.99,'camembert-cheese.jpg'),(4,'Chantilly Cream',1,78.25,'chantilly-cream.jpg'),(5,'Dlecta Cream Cheese',1,14.25,'cream-cheese-dlecta.jpg'),(6,'Eggs',1,8.55,'eggs.jpg'),(7,'Feta Cheese',1,18.27,'feta-cheese.jpg'),(8,'Gauda Cheese',1,25.80,'gauda-cheese.jpg'),(9,'Milk',1,2.55,'milk.png'),(10,'Mother Dairy Butter',1,5.49,'mother-dairy-butter.png'),(11,'Mozzarella Cheese',1,7.98,'mozzarella-cheese.jpg'),(12,'Nada Sour Cream',1,6.54,'nada-sour-cream.jpg'),(13,'Organic Valley Raw Cheddar Cheese',1,9.99,'organic-valley-raw-cheddar-cheese.jpg'),(15,'Ricotta Cheese',1,22.00,'ricotta-cheese.jpg'),(16,'Apple',2,6.90,'apple.jpg'),(17,'Apricot',2,5.50,'apricot.jpg'),(18,'Banana',2,3.89,'banana.jpg'),(19,'Broccoli',2,3.45,'broccoli.jpg'),(20,'Cabbage',2,5.55,'cabbage.jpg'),(21,'Carrots',2,6.69,'carrots.jpg'),(22,'Celery',2,8.89,'celery.jpg'),(23,'Cucamber',2,2.59,'cucamber.jpg'),(24,'Eggplant',2,8.85,'eggplant.jpg'),(25,'Green Bell Pepper',2,9.65,'green-bell-pepper.jpg'),(26,'Kiwi',2,10.15,'kiwi.jpg'),(27,'Lettuce',2,5.54,'lettuce.jpg'),(28,'Melon',2,7.89,'melon.jpg'),(29,'Orange',2,4.22,'orange.jpg'),(30,'Orange Bell Pepper',2,5.55,'orange-bell-pepper.jpg'),(31,'Peach',2,7.58,'peach.jpg'),(32,'Pear',2,4.56,'pear.jpg'),(33,'Potato',2,5.98,'potato.jpg'),(34,'Raspberries',2,6.65,'raspberries.jpg'),(35,'Red Bell Pepper',2,4.67,'red-bell-pepper.jpg'),(36,'Watermelon',2,7.99,'watermelon.jpg'),(37,'Yam',2,6.64,'yam.jpg'),(38,'Yellow Bell Pepper',2,4.22,'yellow-bell-pepper.jpg'),(39,'Beef Burgers',3,18.65,'Beef-Burgers.jpg'),(40,'Chicken Breast',3,10.15,'chicken-breast.jpeg'),(41,'Chiken Slices',3,15.65,'chiken-slices.jpg'),(42,'Fishcakes Melting Middle Cod',3,15.99,'Fishcakes-Melting-Middle-Cod.jpg'),(43,'Lincolnshire British Pork Sausages',3,12.32,'Lincolnshire-British-pork-Sausages.jpg'),(44,'Matured British Beef Sirloin Steak',3,22.13,'Matured-British-Beef-Sirloin-Steak.jpg'),(45,'Oak Smoked Dry Cure British Bacon',3,19.22,'Oak-Smoked-Dry-Cure-British-Bacon.jpg'),(46,'Sea Bass Fillets',3,11.35,'Sea-Bass-Fillets.jpg'),(47,'Captain Morgan Rum',4,35.45,'captain-morgan-rum.jpeg'),(48,'Champagne',4,8.98,'champagne.jpg'),(49,'Coca Cola',4,5.55,'cola.jpg'),(50,'Frontera-cabarnet',4,25.64,'frontera-cabarnet.jpg'),(51,'Gewurz White Wine',4,10.55,'gewurz-white-wine.png'),(52,'Gin',4,12.35,'gin.jpg'),(53,'Lemon Juice',4,4.32,'lemon-juice.jpg'),(54,'Orange Juice',4,4.56,'orange-juice.jpg'),(55,'Pink Champagne',4,10.11,'pink-champagne.jpg'),(56,'Sparkling Wine',4,9.55,'sparkling-wine.jpg'),(57,'Sprite',4,3.46,'sprite.jpg'),(58,'Tequila',4,28.65,'tequila.jpg'),(59,'Vodka Smirnof',4,17.65,'vodka-smirnof.jpeg'),(60,'Whiskey Jack Daniels',4,38.65,'whiskey-jack-daniels.jpg'),(61,'White Wine',4,22.35,'white-wine.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-07 17:17:33
