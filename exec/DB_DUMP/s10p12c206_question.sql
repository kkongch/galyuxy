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
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_answer` int(11) DEFAULT NULL,
  `question_choice1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question_choice2` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question_choice3` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question_choice4` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question_instrction` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question_is_deleted` bit(1) DEFAULT NULL,
  `question_type` int(11) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `workbook_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `FKgnm83qijywvywwgsmi39x9wth` (`teacher_id`),
  KEY `FKmsq9mlgyu5e3atofalf49xxb` (`workbook_id`),
  CONSTRAINT `FKgnm83qijywvywwgsmi39x9wth` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`),
  CONSTRAINT `FKmsq9mlgyu5e3atofalf49xxb` FOREIGN KEY (`workbook_id`) REFERENCES `workbook` (`workbook_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,3,'예시 객관식 문제 선지 1번','예시 객관식 문제 선지 2번','예시 객관식 문제 선지 3번','예시 객관식 문제 선지 4번','예시 객관식 문제 질문',_binary '\0',2,NULL,1),(2,2,'','','','','예시 OX 문제 질문',_binary '\0',1,NULL,1),(3,2,NULL,NULL,NULL,NULL,'부처님의 힘으로 몽골군의 침입을 막기 위해 제작된 합천 해인사 장경판전에 보관된 목판은 무구정광대다라니경이다.',_binary '\0',1,9,6),(4,1,NULL,NULL,NULL,NULL,'백제의 영토를 북쪽으로는 한강, 남쪽으로는 탐라국까지 넓힌 왕은 근초고왕이다.',_binary '\0',1,9,6),(5,2,NULL,NULL,NULL,NULL,'신석기 시대 이후 거울, 검, 장신구 등을 만드는데 쓰였던 재료는 철기이다.',_binary '\0',1,9,6),(6,1,NULL,NULL,NULL,NULL,'고조선의 본래 이름은 조선이다.',_binary '\0',1,9,6),(7,2,NULL,NULL,NULL,NULL,'평양으로 도읍을 옮기고, 한반도 중부 지역까지 세력을 넓혀 고구려의 전성기를 이끌었던 왕의 이름은 광개토대왕이다.',_binary '\0',1,9,6),(8,1,NULL,NULL,NULL,NULL,'고려에 처음 쳐들어온 외적으로 만주 서북부 지방에 살았고 요라는 나라를 세운 민족은 거란족이다.',_binary '\0',1,9,6),(9,3,'구증구포','목민심서','거중기','유형거','조선의 실학자 정약용이 도르래와 물레의 원리를 이용해 만든 건설 기구는 무엇인가요?',_binary '\0',2,9,7),(10,4,'이성계','강감찬','서희','민영','고려 전기의 무신으로, 숙종, 예종의 여진 정벌 때 신기군으로 출전하여 공을 세운 인물은 누구인가요?',_binary '\0',2,9,7),(11,2,'국빈관','영빈관','외빈관','서민관','고려 현종 때 외국의 사신을 접대하기 위해 설치한 건물은 무엇인가요?',_binary '\0',2,9,7),(12,3,'정조','고종','순종','태조','대한민국 대한제국까지의 마지막 황제는 누구인가요?',_binary '\0',2,9,7),(13,3,'전우치전','한중록','금오신화','사씨남정기','우리나라 최초의 한문소설은 무엇인가?',_binary '\0',2,9,7);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  8:52:35
