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
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_is_deleted` bit(1) DEFAULT NULL,
  `group_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `active_workbook_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `UK_fqlevvgjqa8qvylmaioi6cfeb` (`active_workbook_id`),
  KEY `FK4whyf3sgg830cdyn4mqbxdos9` (`teacher_id`),
  CONSTRAINT `FK4whyf3sgg830cdyn4mqbxdos9` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`),
  CONSTRAINT `FKsqr90mjrcaxircdrtqjv0mnyu` FOREIGN KEY (`active_workbook_id`) REFERENCES `active_workbook` (`active_workbook_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,_binary '\0','2022년도',1,NULL),(2,_binary '\0','a',5,NULL),(3,_binary '','11',7,NULL),(4,_binary '','1',7,NULL),(5,_binary '\0','111',10,NULL),(6,_binary '','123',7,NULL),(7,_binary '','111',7,NULL),(8,_binary '\0','클래스',11,NULL),(9,_binary '\0','클래스',11,NULL),(10,_binary '\0','3클래스',11,NULL),(11,_binary '\0','싸피 10기',7,NULL),(12,_binary '\0','1반 1학기',22,NULL),(13,_binary '\0','2023년 2학기 장덕초 5학년 2반',9,NULL),(14,_binary '\0','2023년 2학기 수완초 5학년 A반',9,NULL),(15,_binary '','test',7,NULL),(16,_binary '','test2',7,NULL),(17,_binary '','qwe123',7,NULL),(18,_binary '','abc',7,NULL),(19,_binary '','zxcv',7,NULL),(20,_binary '','awefdsavs',7,NULL),(21,_binary '','qwe',7,NULL),(22,_binary '','qwesadf',7,NULL),(23,_binary '','asdf2',7,NULL),(24,_binary '','qweradsf',7,NULL),(25,_binary '','zcxvasdf',7,NULL),(26,_binary '','asdfasdf',7,NULL),(27,_binary '','qwerqwe',7,NULL),(28,_binary '','werw',7,NULL),(29,_binary '','asdf',7,NULL),(30,_binary '','advasdf',7,NULL),(31,_binary '','adfa',7,NULL),(32,_binary '','asdf',7,NULL),(33,_binary '','wqer',7,NULL),(34,_binary '','advzxc',7,NULL),(35,_binary '','asd',7,NULL),(36,_binary '','asdf',7,NULL),(37,_binary '','asdf1',7,NULL),(38,_binary '','asdfas',7,NULL),(39,_binary '\0','adfqwr',7,NULL),(40,_binary '\0','3학년 5반',7,NULL),(41,_binary '','싸피초 5학년',9,NULL),(42,_binary '','광주 2반',9,NULL),(43,_binary '\0','광주 2반',9,NULL);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  8:52:34
