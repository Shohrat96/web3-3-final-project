-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: final_project
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Bullion coins','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/South%20Vietnamese%20Dong_1.png?alt=media&token=1d7ea630-13fd-4c76-83c3-09c9698b2125'),(2,'Exclusive coins','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/ISK_2.png?alt=media&token=ba907b6c-d28a-4270-bb09-c8692c183f8c'),(3,'Commemorative coins','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/Looney_1.png?alt=media&token=d5b499d1-14e8-48f9-97d5-efc06898f2d1');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coin_details`
--

DROP TABLE IF EXISTS `coin_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coin_id` int NOT NULL,
  `issuing_country` varchar(255) DEFAULT NULL,
  `composition` varchar(255) DEFAULT NULL,
  `quality` varchar(255) DEFAULT NULL,
  `denomination` varchar(255) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `back_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `coin_id` (`coin_id`),
  CONSTRAINT `coin_details_ibfk_1` FOREIGN KEY (`coin_id`) REFERENCES `coins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_details`
--

LOCK TABLES `coin_details` WRITE;
/*!40000 ALTER TABLE `coin_details` DISABLE KEYS */;
INSERT INTO `coin_details` VALUES (1,1,'Canada','nickel','BU','5  cents',1965,'4.54 g','40','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/Canadian%20Beaver_2.png?alt=media&token=cc04884b-c0cb-45a4-8ec8-8c61443429e9');
/*!40000 ALTER TABLE `coin_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coin_paragraphs`
--

DROP TABLE IF EXISTS `coin_paragraphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_paragraphs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coin_id` int NOT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `coin_id` (`coin_id`),
  CONSTRAINT `coin_paragraphs_ibfk_1` FOREIGN KEY (`coin_id`) REFERENCES `coins` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_paragraphs`
--

LOCK TABLES `coin_paragraphs` WRITE;
/*!40000 ALTER TABLE `coin_paragraphs` DISABLE KEYS */;
INSERT INTO `coin_paragraphs` VALUES (1,1,'In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.'),(2,1,'In the center of the coin reverse is a Canadian beaver on a rock sticking out of the water. At the top is a semicircle with the inscription \"5 cents\" between two maple leaves. At the bottom in two lines is the inscription CANADA (CANADA) and the year of minting.');
/*!40000 ALTER TABLE `coin_paragraphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coins`
--

DROP TABLE IF EXISTS `coins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `short_desc` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `coins_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coins`
--

LOCK TABLES `coins` WRITE;
/*!40000 ALTER TABLE `coins` DISABLE KEYS */;
INSERT INTO `coins` VALUES (1,'Canadian Beaver','\"Canadian beaver\". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/Canadian%20Beaver_1.png?alt=media&token=6c5c4625-6b22-48d5-b9b3-b4742475a426',3),(2,'Looney','\"Looney\". Unique coin with the image of a goat. Canadian dollar symbol.','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/Looney_1.png?alt=media&token=d5b499d1-14e8-48f9-97d5-efc06898f2d1',3),(3,'Jefferson','Unique coin featuring Thomas Jefferson, the 3rd American president. Face value - 5 cents.','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/Jefferson_1.png?alt=media&token=bad7856d-6242-4fa3-91ed-e9352e38d31c',3),(4,'South Vietnamese Dong','Currency of the Republic of Vietnam in 1955-1975 Coin with the image of wheat','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/South%20Vietnamese%20Dong_1.png?alt=media&token=1d7ea630-13fd-4c76-83c3-09c9698b2125',1),(5,'Lion sedge','Indian coin with the image of a lion Ashoka. Face value 1 one rupee. 1975 edition.','https://firebasestorage.googleapis.com/v0/b/project5-f1dd2.appspot.com/o/Lion%20sedge_1.png?alt=media&token=12a055fb-0172-4e4e-9eef-6d0309b9bdd0',2);
/*!40000 ALTER TABLE `coins` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-01 21:10:55
