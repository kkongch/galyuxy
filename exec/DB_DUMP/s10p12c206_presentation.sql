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
-- Table structure for table `presentation`
--

DROP TABLE IF EXISTS `presentation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presentation` (
  `presentation_id` int(11) NOT NULL AUTO_INCREMENT,
  `presentation_create_date` datetime(6) DEFAULT NULL,
  `presentation_is_active` bit(1) DEFAULT NULL,
  `presentation_is_deleted` bit(1) DEFAULT NULL,
  `presentation_title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`presentation_id`),
  UNIQUE KEY `UK_n36bakmvxdcjo9ikua0eb3jjr` (`presentation_title`),
  KEY `FKag3twtenvhi3p5h92qgab08ab` (`group_id`),
  CONSTRAINT `FKag3twtenvhi3p5h92qgab08ab` FOREIGN KEY (`group_id`) REFERENCES `group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presentation`
--

LOCK TABLES `presentation` WRITE;
/*!40000 ALTER TABLE `presentation` DISABLE KEYS */;
INSERT INTO `presentation` VALUES (2,'2024-02-08 02:57:42.072748',_binary '\0',_binary '','고조선',1),(3,'2024-02-08 02:57:57.689883',_binary '\0',_binary '','고구려',1),(4,'2024-02-08 03:01:45.968418',_binary '\0',_binary '','조선',1),(5,'2024-02-08 03:02:25.510150',_binary '\0',_binary '','통일신라',1),(6,'2024-02-08 03:05:56.597611',_binary '\0',_binary '\0','백제',1),(7,'2024-02-08 03:06:36.658220',_binary '\0',_binary '\0','대한민국',1),(8,'2024-02-08 03:07:44.541969',_binary '\0',_binary '\0','일제',1),(9,'2024-02-08 03:10:46.572959',_binary '\0',_binary '\0','몽골',1),(14,'2024-02-10 09:15:31.917862',_binary '\0',_binary '\0','5학년 4반 연극',1),(17,'2024-02-10 09:16:36.645724',_binary '\0',_binary '\0','5학년 5반 연극',1),(25,'2024-02-10 09:49:26.287851',_binary '\0',_binary '\0','3학년 연극',1),(29,'2024-02-13 11:36:45.546005',_binary '\0',_binary '','11',3),(30,'2024-02-14 02:06:23.431732',_binary '\0',_binary '','123',3),(37,'2024-02-14 02:16:22.272339',_binary '\0',_binary '\0','1q',3),(38,'2024-02-14 02:29:40.117268',_binary '\0',_binary '','1qq',4),(39,'2024-02-14 02:35:01.482448',_binary '\0',_binary '','qwe123',4),(40,'2024-02-14 02:37:54.130687',_binary '\0',_binary '','zxcasd',4),(41,'2024-02-14 02:44:04.315833',_binary '\0',_binary '\0','123qwe',4),(42,'2024-02-14 02:48:54.548892',_binary '\0',_binary '\0','aaa111',5),(44,'2024-02-14 04:07:51.207939',_binary '\0',_binary '\0','1q1q1q',6),(45,'2024-02-14 04:13:03.940122',_binary '\0',_binary '\0','zxczxczxc',6),(46,'2024-02-14 04:17:45.502467',_binary '\0',_binary '','111',7),(47,'2024-02-14 04:38:29.001485',_binary '\0',_binary '\0','방만들기',9),(48,'2024-02-14 04:54:03.272259',_binary '\0',_binary '\0','2/22활동방',8),(49,'2024-02-14 07:51:22.450965',_binary '\0',_binary '','1학기 발표 활동',11),(50,'2024-02-14 08:48:26.020845',_binary '\0',_binary '\0','활동',12),(51,'2024-02-14 11:12:07.820676',_binary '\0',_binary '','활동활동',11),(52,'2024-02-14 11:49:31.164551',_binary '\0',_binary '\0','5학년 4반',7),(53,'2024-02-14 12:12:45.333200',_binary '\0',_binary '','이순신 인터뷰',11),(54,'2024-02-14 12:13:25.064870',_binary '\0',_binary '','서희의 외교담판',11),(55,'2024-02-14 12:13:42.074992',_binary '\0',_binary '','서희 외교담판',11),(58,'2024-02-14 12:18:49.277851',_binary '\0',_binary '','123123',11),(60,'2024-02-14 12:19:40.920708',_binary '\0',_binary '','장보고 인터뷰',11),(61,'2024-02-14 12:19:47.541768',_binary '\0',_binary '','서희외교담판',11),(62,'2024-02-14 12:22:18.846234',_binary '\0',_binary '','강감찬장군 인터뷰',11),(64,'2024-02-14 12:23:03.615189',_binary '\0',_binary '','세종대왕 인터뷰',11),(65,'2024-02-14 12:23:53.548869',_binary '\0',_binary '\0','장영실',11),(66,'2024-02-14 12:23:58.444147',_binary '\0',_binary '','장수왕',11),(67,'2024-02-14 12:27:43.997802',_binary '\0',_binary '\0','test',15),(68,'2024-02-14 12:37:15.021111',_binary '\0',_binary '','미역방',11),(70,'2024-02-14 15:08:56.733411',_binary '\0',_binary '\0','123231123',16),(71,'2024-02-14 15:28:21.905243',_binary '\0',_binary '','test3',16),(72,'2024-02-14 16:56:22.292055',_binary '\0',_binary '','test4',16),(74,'2024-02-14 17:01:44.040119',_binary '\0',_binary '','test5',16),(75,'2024-02-14 17:04:48.945379',_binary '',_binary '','테스트 발표활동 2:04',14),(76,'2024-02-14 17:05:10.208427',_binary '\0',_binary '','test6',16),(77,'2024-02-14 17:29:49.886625',_binary '\0',_binary '\0','test11',16),(79,'2024-02-14 17:32:05.723016',_binary '\0',_binary '\0','`123',17),(80,'2024-02-14 17:32:49.239631',_binary '\0',_binary '\0','`879iyumjf',17),(81,'2024-02-14 17:54:49.028221',_binary '\0',_binary '\0','abc123',18),(82,'2024-02-14 17:56:16.930065',_binary '\0',_binary '','zxcv',19),(83,'2024-02-14 17:59:07.340535',_binary '\0',_binary '','zxcvb',19),(84,'2024-02-14 18:01:13.300488',_binary '\0',_binary '\0','fdvfbsnreshfd',20),(85,'2024-02-14 18:47:29.992941',_binary '\0',_binary '\0','ffvdsadfa',21),(86,'2024-02-14 18:49:55.001608',_binary '\0',_binary '\0','dfbr3qhtwryntehdg',22),(87,'2024-02-14 18:51:37.679038',_binary '\0',_binary '\0','sdfbefsadf',23),(88,'2024-02-14 18:56:49.795068',_binary '\0',_binary '\0','ewfdsvasdf',24),(89,'2024-02-15 00:43:33.890824',_binary '\0',_binary '\0','방만들어보자잉',24),(90,'2024-02-15 01:04:45.956103',_binary '\0',_binary '\0','qwesad',25),(92,'2024-02-15 01:27:04.395258',_binary '\0',_binary '','testtesttest',13),(93,'2024-02-15 01:42:38.012465',_binary '\0',_binary '\0','asdfqwerjioqwuikasd',26),(94,'2024-02-15 01:55:26.635742',_binary '\0',_binary '\0','qwerqwerasdf',27),(96,'2024-02-15 02:30:23.754186',_binary '\0',_binary '','dsadfasdf',28),(97,'2024-02-15 02:43:53.947293',_binary '\0',_binary '','eqwasd',28),(98,'2024-02-15 02:46:31.520225',_binary '\0',_binary '','qwdasda',28),(99,'2024-02-15 02:47:57.451390',_binary '\0',_binary '\0','wqeasdasdsdf',28),(100,'2024-02-15 03:07:19.960766',_binary '\0',_binary '\0','qweasd',29),(101,'2024-02-15 04:41:41.192092',_binary '\0',_binary '\0','fadvdsaf',30),(102,'2024-02-15 04:46:20.051455',_binary '\0',_binary '\0','qeafsdasdf',31),(103,'2024-02-15 04:51:34.825065',_binary '\0',_binary '\0','qwerasdf',32),(104,'2024-02-15 05:41:37.219153',_binary '\0',_binary '\0','qwera',33),(105,'2024-02-15 05:46:30.861590',_binary '\0',_binary '\0','asdfasdf',34),(106,'2024-02-15 06:18:18.141295',_binary '\0',_binary '\0','sad',35),(107,'2024-02-15 06:30:00.743828',_binary '\0',_binary '\0','qweasdf',36),(108,'2024-02-15 06:47:10.293801',_binary '\0',_binary '','rweasdf',37),(109,'2024-02-15 07:22:54.485830',_binary '\0',_binary '\0','zxcvasdf',37),(110,'2024-02-15 07:47:26.258771',_binary '\0',_binary '\0','asdfsadfwer',38),(111,'2024-02-15 07:54:20.210517',_binary '',_binary '','qwrasda',39),(112,'2024-02-15 13:15:15.162751',_binary '\0',_binary '\0','qwe',13),(113,'2024-02-15 13:55:51.794260',_binary '\0',_binary '\0','2024년 2학기',11),(114,'2024-02-15 13:56:43.219238',_binary '\0',_binary '','2024년 1학기',11),(116,'2024-02-15 14:01:13.404672',_binary '\0',_binary '','2023년 2학기',11),(118,'2024-02-15 14:07:30.895751',_binary '\0',_binary '\0','2022년 1학기',11),(119,'2024-02-15 14:08:33.127445',_binary '\0',_binary '\0','2022년 2학기',11),(120,'2024-02-15 17:50:11.350260',_binary '\0',_binary '\0','5학년 2학기',14),(121,'2024-02-15 17:50:38.728702',_binary '',_binary '\0','5학년 1학기',14),(123,'2024-02-15 18:23:32.909477',_binary '\0',_binary '\0','6학년 2학기',39),(124,'2024-02-15 20:12:35.598329',_binary '\0',_binary '','임진왜란 체험기',14),(125,'2024-02-15 20:13:31.389131',_binary '\0',_binary '','임진왜란 활동',14),(126,'2024-02-15 20:14:08.603824',_binary '\0',_binary '','임진왜란 역할극',14),(127,'2024-02-15 20:15:10.827672',_binary '\0',_binary '','임진왜란 발표활동',14),(128,'2024-02-15 20:17:27.493719',_binary '',_binary '\0','임진왜란 연극 활동',14);
/*!40000 ALTER TABLE `presentation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  8:52:30
