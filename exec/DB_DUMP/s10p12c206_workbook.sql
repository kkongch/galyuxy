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
-- Table structure for table `workbook`
--

DROP TABLE IF EXISTS `workbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workbook` (
  `workbook_id` int(11) NOT NULL AUTO_INCREMENT,
  `workbook_create_date` datetime(6) DEFAULT NULL,
  `workbook_is_deleted` bit(1) DEFAULT NULL,
  `workbook_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `workbook_total_point` int(11) DEFAULT NULL,
  `workbook_update_date` datetime(6) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`workbook_id`),
  KEY `FKqh3w67keopew79i8a4lcj8hqf` (`teacher_id`),
  CONSTRAINT `FKqh3w67keopew79i8a4lcj8hqf` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workbook`
--

LOCK TABLES `workbook` WRITE;
/*!40000 ALTER TABLE `workbook` DISABLE KEYS */;
INSERT INTO `workbook` VALUES (2,'2024-02-14 12:33:31.000000',_binary '\0','1단원 복습퀴즈',10,'2024-02-14 12:33:31.000000',9,14),(5,'2024-02-14 12:50:00.000000',_binary '\0','2단원 복습퀴즈',10,'2024-02-14 12:50:00.000000',9,14),(6,'2024-02-14 12:50:10.000000',_binary '\0','종합 OX 퀴즈',6,'2024-02-14 12:50:10.000000',9,14),(7,'2024-02-14 12:50:11.000000',_binary '\0','종합 객관식 퀴즈',5,'2024-02-14 12:50:11.000000',9,14);
/*!40000 ALTER TABLE `workbook` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  8:52:32
