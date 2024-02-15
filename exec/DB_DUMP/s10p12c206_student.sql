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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `student_is_deleted` bit(1) DEFAULT NULL,
  `student_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `student_no` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `FKd2slqqxxl5g1axj5th1nqukq7` (`group_id`),
  CONSTRAINT `FKd2slqqxxl5g1axj5th1nqukq7` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,_binary '\0','김나연',1,1),(2,_binary '\0','a',1,2),(3,_binary '','11',11,3),(4,_binary '','1',1,4),(5,_binary '\0','111',111,5),(6,_binary '','123',123,6),(7,_binary '','111',111,7),(8,_binary '\0','오기선',3,8),(9,_binary '\0','김덕배',5,9),(10,_binary '\0','4',4,10),(11,_binary '\0','오정민',1,11),(12,_binary '\0','김현영',2,11),(13,_binary '\0','조형찬',3,11),(14,_binary '\0','오기',3,12),(15,_binary '\0','김나연',1,13),(16,_binary '\0','최지웅',2,13),(17,_binary '\0','조형찬',3,13),(18,_binary '\0','김현영',4,13),(19,_binary '\0','오정민',5,13),(20,_binary '\0','오기선',6,13),(21,_binary '','test',1,15),(22,_binary '','test2',1,16),(23,_binary '','qwe',123,17),(24,_binary '','abc',123,18),(25,_binary '','zxcv',1234,19),(26,_binary '','asdfsdf',1,20),(27,_binary '','advasdf',123,21),(28,_binary '','adssa',1,23),(29,_binary '','da',12,24),(30,_binary '\0','김시우',1,14),(31,_binary '\0','김서현',2,14),(32,_binary '\0','김하준',3,14),(33,_binary '\0','김하은',4,14),(34,_binary '\0','김지호',5,14),(35,_binary '\0','박지유',6,14),(36,_binary '\0','박지후',7,14),(37,_binary '\0','박윤서',8,14),(38,_binary '\0','박도현',9,14),(39,_binary '\0','박수아',10,14),(40,_binary '\0','이건우',11,14),(41,_binary '\0','이선우',12,14),(42,_binary '\0','이연우',13,14),(43,_binary '\0','이은서',14,14),(44,_binary '\0','이소율',15,14),(45,_binary '\0','최하린',16,14),(46,_binary '\0','이윤우',17,14),(47,_binary '','덕배',3,24),(48,_binary '','영일',4,24),(49,_binary '','고기',5,24),(50,_binary '','qwewqe',123,25),(51,_binary '','asdfasdf',123,26),(52,_binary '','qwer',1,27),(53,_binary '','asdfsadf',1,28),(54,_binary '','awerd',1,29),(55,_binary '','asdf',123,30),(56,_binary '','asdfasfd',123,31),(57,_binary '','asdfasdf',123,32),(58,_binary '','qwer',1,33),(59,_binary '','asdfasdf',123,34),(60,_binary '','asd',2,35),(61,_binary '','asdf',2,37),(62,_binary '','adsfsadf',123,38),(63,_binary '\0','asdasdf',123,39),(64,_binary '\0','이은서',14,40),(65,_binary '\0','이은서',14,11),(66,_binary '\0','이은서',14,39),(67,_binary '','김나연',1,41),(68,_binary '','김현영',1,42),(69,_binary '\0','김현영',1,43);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  8:52:40
