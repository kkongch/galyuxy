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
-- Table structure for table `active_workbook`
--

DROP TABLE IF EXISTS `active_workbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `active_workbook` (
  `active_workbook_id` int(11) NOT NULL AUTO_INCREMENT,
  `active_workbook_end` datetime(6) DEFAULT NULL,
  `active_workbook_start` datetime(6) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `workbook_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`active_workbook_id`),
  UNIQUE KEY `UK_m1j34h59q9rd8chpe11s4n1j5` (`group_id`),
  CONSTRAINT `FK5769wrw4gkoo92k79shgbcy8` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active_workbook`
--

LOCK TABLES `active_workbook` WRITE;
/*!40000 ALTER TABLE `active_workbook` DISABLE KEYS */;
INSERT INTO `active_workbook` VALUES (1,'2024-02-16 16:16:00.000000','2024-02-16 14:15:00.000000',13,7),(2,'2024-02-14 04:00:00.000000','2024-02-14 03:00:00.000000',1,7),(6,'2024-02-16 13:00:00.000000','2024-02-16 12:00:00.000000',NULL,7),(7,'2024-02-16 02:00:00.000000','2024-02-16 01:30:00.000000',14,7);
/*!40000 ALTER TABLE `active_workbook` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  8:52:39
