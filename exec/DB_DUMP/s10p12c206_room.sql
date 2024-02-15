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
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `room_is_deleted` bit(1) DEFAULT NULL,
  `room_script` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `room_subject` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `presentation_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `FK1qrkpewrcdy1txjyeptl8p6x8` (`presentation_id`),
  CONSTRAINT `FK1qrkpewrcdy1txjyeptl8p6x8` FOREIGN KEY (`presentation_id`) REFERENCES `presentation` (`presentation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('ses_AhEf0LOviB',_binary '',NULL,'이순신 인터뷰',65),('ses_AqgMsXNSVa',_binary '',NULL,'장영실 인터뷰',113),('ses_AToWXvjs1v',_binary '\0',NULL,'test3',71),('ses_AUE4hfn9E7',_binary '',NULL,'이순신 인터뷰방4',53),('ses_AzIZqN0lN7',_binary '\0',NULL,'213123123123',6),('ses_BDEONqyx86',_binary '\0',NULL,'ㅁㄴㅇㅁㄴㅇ',48),('ses_BDFQbSJg4g',_binary '\0',NULL,'이순신 발표방3',111),('ses_BDUi42xENL',_binary '\0',NULL,'test5',74),('ses_BhVg9qVDcw',_binary '\0',NULL,'2',29),('ses_BQIWYKJH9B',_binary '\0',NULL,'계륵',65),('ses_BqT2R45lqu',_binary '',NULL,'녹화2',65),('ses_BsLET0J3Sy',_binary '',NULL,'이순신 인터뷰방2',53),('ses_BV6fZuxIu3',_binary '\0',NULL,'장영실 인터뷰',119),('ses_C44OydF5PM',_binary '',NULL,'이순신 인터뷰2',65),('ses_CHREGlrw82',_binary '\0',NULL,'qweasdsad',90),('ses_Cm9Nr1P4qY',_binary '\0',NULL,'이순신 인터뷰방',111),('ses_CVvtDN55gq',_binary '',NULL,'이순신 인터뷰2',124),('ses_DUji1ZcZMD',_binary '\0',NULL,'2:04',75),('ses_E60W87a7B7',_binary '\0',NULL,'두번째방',70),('ses_EEJfR5Bv20',_binary '\0',NULL,'test6',76),('ses_EMqnMTzrUw',_binary '',NULL,'오픈비두',68),('ses_ExZZTcWe4Y',_binary '',NULL,'장영실',65),('ses_F2EEgBvt64',_binary '',NULL,'이순신 인터뷰방',68),('ses_F5vDrlbb6E',_binary '',NULL,'채팅연습',68),('ses_FDVzCzFBra',_binary '',NULL,'이순신 인터뷰2',127),('ses_FkQ5xoBrBE',_binary '',NULL,'발표연습가자잉',68),('ses_G3fqZ9Fmcr',_binary '\0',NULL,'ㄴㅁㅇㄴㅁㅇ',65),('ses_GHmMCTce0n',_binary '',NULL,'방만들기',48),('ses_GRAkTHpINN',_binary '\0',NULL,'백제에 대해서 이야기하자',6),('ses_GRHxLacKtr',_binary '',NULL,'녹화',65),('ses_GudKCrK4FZ',_binary '\0',NULL,'aaa111',42),('ses_HjdnLS8cxY',_binary '',NULL,'adfasdfasdfasdf',92),('ses_HRzuh2tppV',_binary '',NULL,'녹음1',65),('ses_HXVIqkOUCb',_binary '',NULL,'이순신 인터뷰2',126),('ses_I4JfRach6H',_binary '',NULL,'ㄴㅇㄻㄴㅇㅁㄴㅇㄹ',65),('ses_IceD1w4YcZ',_binary '\0',NULL,'이순신이순신이순신이순신',47),('ses_Ih8TcB3P67',_binary '\0',NULL,'장영실 인터뷰',114),('ses_IhpLnKu8FD',_binary '',NULL,'이순신 인터뷰',126),('ses_InzpaFKYei',_binary '\0',NULL,'장보고',50),('ses_IoykEjUP5S',_binary '\0',NULL,'1',29),('ses_IT8gHSCoGE',_binary '',NULL,'이순신 장군 인터뷰방',60),('ses_J5NJ0ZSvUc',_binary '\0',NULL,'이순신 인터뷰',123),('ses_J98Qz2FhGt',_binary '',NULL,'장영실 인터뷰',116),('ses_JGHN4nVt6S',_binary '\0',NULL,'방만들었다잉',71),('ses_JnXtAb1RNm',_binary '\0',NULL,'1qq',37),('ses_JubZvAhfR5',_binary '',NULL,'녹화요',65),('ses_KAsi21qq2R',_binary '\0',NULL,'이순신 인터뷰 ',128),('ses_KcY0vpFvlQ',_binary '',NULL,'이순신 인터뷰',124),('ses_KGF0MWit8D',_binary '',NULL,'123123123123',70),('ses_L3XKatld35',_binary '',NULL,'SDFASDF',68),('ses_L9xS00JhVU',_binary '\0',NULL,'qqq111',39),('ses_LJBcbdJnKG',_binary '',NULL,'11111111',46),('ses_LrzQLAVAg0',_binary '\0',NULL,'ㅇㄹㄴㄹㄴㅇ',65),('ses_LuDHIl24ga',_binary '\0',NULL,'이순신 발표방3',123),('ses_Lxl9MnUtFU',_binary '',NULL,'이순신 인터뷰방3',53),('ses_MbGq3g0mcf',_binary '',NULL,'vidu11',6),('ses_NbP0MSFtNJ',_binary '',NULL,'이순신 장군 인터뷰',68),('ses_NvtyPtNNUg',_binary '\0',NULL,'zxcasd',40),('ses_OK7XqrDyb9',_binary '',NULL,'11',29),('ses_OwGjflFs7A',_binary '',NULL,'이순신장군',48),('ses_P9njLuieoe',_binary '\0',NULL,'10:36 인터뷰하기기기기',75),('ses_PAW27iWxNY',_binary '',NULL,'고구려 이야기',6),('ses_PBkRfoexFF',_binary '\0',NULL,'ㄴㅇㅁㅁㄴㅇ',48),('ses_PirYQOdqaK',_binary '',NULL,'방만들기2323232',48),('ses_PN2Hedf2CE',_binary '\0',NULL,'기선',123),('ses_PvQNJc2rmX',_binary '',NULL,'인터뷰하자',70),('ses_PxoL6ZJgfv',_binary '',NULL,'발표활동임',68),('ses_Q4USW4D1ke',_binary '',NULL,'sfsadfsda',112),('ses_Q88yhYPuT7',_binary '\0',NULL,'bdfs43gerfds',84),('ses_QagZ8eaWoC',_binary '\0',NULL,'이순신 발표방',123),('ses_QwMp7r7aXm',_binary '',NULL,'장영실 인터뷰',118),('ses_ReEwrTlBdU',_binary '',NULL,'장영실 인터뷰방',65),('ses_RgC2fbUxUa',_binary '',NULL,'정보가',48),('ses_RGspHF3Qb7',_binary '\0',NULL,'이순신',50),('ses_RyjRbEKeMt',_binary '\0',NULL,'이순신 발표방',111),('ses_RYw0IEcijh',_binary '',NULL,'123312',49),('ses_SJSrXqT35B',_binary '',NULL,'asd',112),('ses_SL9KPreBnr',_binary '',NULL,'방만들기',68),('ses_STkSMydb6q',_binary '\0',NULL,'test4',72),('ses_SVcNadgQhe',_binary '',NULL,'녹화4',65),('ses_SX7P45zpVF',_binary '',NULL,'장보고 인터뷰',68),('ses_Szl0CABZ0Q',_binary '\0',NULL,'test',67),('ses_T8MIParX6z',_binary '\0',NULL,'대한민국',7),('ses_THgbXP7Vjz',_binary '',NULL,'이순신 인터뷰',127),('ses_THi4n84AVM',_binary '',NULL,'이순신 인터뷰방1',53),('ses_TiM2RdoJaG',_binary '\0',NULL,'sdlfkjasdlkfj',92),('ses_Ub1Mz8AECJ',_binary '\0',NULL,'이순신 인터뷰방',121),('ses_UBW2jB9kp5',_binary '',NULL,'녹화기능',65),('ses_UcrOKvE6Ek',_binary '\0',NULL,'asdfasdfasdf',45),('ses_UJRF4TdBK0',_binary '',NULL,'녹화하고싶다',65),('ses_UQu7V148iy',_binary '',NULL,'213312312123',70),('ses_USvlRl0wA0',_binary '',NULL,'이순신 장군 인터뷰방',60),('ses_UYWtnB0kX1',_binary '\0',NULL,'이순신 인터뷰 2',128),('ses_V01ilBEjVM',_binary '\0',NULL,'123qwe',41),('ses_VrmTJYEnL5',_binary '',NULL,'이순신',68),('ses_VwrMZJ5p2x',_binary '',NULL,'달력',68),('ses_W3EykFHgrl',_binary '',NULL,'이순신 인터뷰',116),('ses_Wcv2q1qjim',_binary '',NULL,'장영실 인터뷰방',65),('ses_WpIg80aA0X',_binary '',NULL,'녹화',65),('ses_X4XcIXgIwm',_binary '',NULL,'녹화3',65),('ses_Xc32Cq7ANx',_binary '\0',NULL,'방이여기있네',70),('ses_XL0mccRtwc',_binary '',NULL,'이순신 인터뷰방',68),('ses_XPY5KOohNB',_binary '\0',NULL,'1qqq',38),('ses_XWRUS0Am4I',_binary '',NULL,'11',29),('ses_Y7b8LSFVeA',_binary '',NULL,'무슨발표를해보락',48),('ses_YdZC3HcMTh',_binary '',NULL,'필터연습',68),('ses_YMDjITl7rh',_binary '',NULL,'미',65),('ses_YU0QJ7KeCA',_binary '',NULL,'이순신이순신이순신이순신이순신이순신',48),('ses_YuAbxdt6SF',_binary '',NULL,'방만들기',49),('ses_YZh8lchGyF',_binary '',NULL,'dkdl',65),('ses_ZHE7M66R1P',_binary '',NULL,'패딩추가',68),('ses_ZsyO475J8q',_binary '\0',NULL,'2asd',112);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16  8:52:31
