-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: stg-yswa-kr-practice-db-master.mariadb.database.azure.com    Database: s10p12c206
-- ------------------------------------------------------
-- Server version	5.6.47.0

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
-- Table structure for table `artwork`
--

DROP TABLE IF EXISTS `artwork`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artwork` (
  `artwork_id` int(11) NOT NULL AUTO_INCREMENT,
  `artwork_image_url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `artwork_type` int(11) DEFAULT NULL,
  `era_id` int(11) NOT NULL,
  `heritage_id` int(11) NOT NULL,
  PRIMARY KEY (`artwork_id`),
  KEY `FKodm7ejegbjk3aj272d5k20hqk` (`era_id`),
  KEY `FKfoswdnent7om1o8hhbkkrduw8` (`heritage_id`),
  CONSTRAINT `FKfoswdnent7om1o8hhbkkrduw8` FOREIGN KEY (`heritage_id`) REFERENCES `heritage` (`heritage_id`),
  CONSTRAINT `FKodm7ejegbjk3aj272d5k20hqk` FOREIGN KEY (`era_id`) REFERENCES `era` (`era_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artwork`
--

LOCK TABLES `artwork` WRITE;
/*!40000 ALTER TABLE `artwork` DISABLE KEYS */;
INSERT INTO `artwork` VALUES (1,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EA%B3%A0%EC%A1%B0%EC%84%A0/dolmen22.png',0,1,2),(2,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EC%8B%A0%EB%9D%BC/Cheomseongdae.png',0,4,15),(3,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%ED%86%B5%EC%9D%BC%EC%8B%A0%EB%9D%BC/ThreestoryStonePagoda.PNG',0,5,19),(4,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%A1%B0%EC%84%A0/Geobukseon.PNG',0,7,61),(5,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%A1%B0%EC%84%A0/Sungnyemun.PNG',0,7,62),(6,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%ED%86%B5%EC%9D%BC%EC%8B%A0%EB%9D%BC/Seokguram.png',0,5,18),(7,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%ED%86%B5%EC%9D%BC%EC%8B%A0%EB%9D%BC/Dabotap.png',0,5,20),(12,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EB%B0%B1%EC%A0%9C/GiltBronzeincenseBurner.png',0,3,11),(13,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EB%B0%B1%EC%A0%9C/StonePagodaatJeongnimsaTempleSite.png',0,3,66),(14,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EB%B0%B1%EC%A0%9C/StonePagodaofMireuksaTempleSite.png',0,3,13),(15,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EB%B0%B1%EC%A0%9C/TruthSevenBranchedSword.png',0,3,10),(16,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EA%B3%A0%EA%B5%AC%EB%A0%A4/cheonmado.png',0,2,64),(17,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EA%B3%A0%EA%B5%AC%EB%A0%A4/GiltBronzeStandingBuddha.png',0,2,65),(18,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EA%B3%A0%EC%A1%B0%EC%84%A0/bronzemirror.png',0,1,63),(19,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EA%B3%A0%EC%A1%B0%EC%84%A0/LuteshapedBronzeDagger.png',0,1,3),(20,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EA%B3%A0%EC%A1%B0%EC%84%A0/MisongriTogi.png',0,1,1),(21,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EA%B3%A0%EA%B5%AC%EB%A0%A4/muyongchong.png',0,2,7),(22,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EA%B3%A0%EA%B5%AC%EB%A0%A4/Howoomyeongbowl.png',0,2,5),(23,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EC%8B%A0%EB%9D%BC/goldcrown.png',0,4,16),(24,'https://galyuxy.s3.ap-northeast-2.amazonaws.com/coloring/%EC%82%BC%EA%B5%AD%EC%8B%9C%EB%8C%80/%EC%8B%A0%EB%9D%BC/StoneMaitreyaStatue.png',0,4,68);
/*!40000 ALTER TABLE `artwork` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  8:52:33
