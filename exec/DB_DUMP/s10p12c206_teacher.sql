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
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teacher_is_deleted` bit(1) DEFAULT NULL,
  `teacher_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teacher_password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teacher_role` enum('TEACHER') COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,'ssafy@ssafy.com',_binary '\0','김싸피','$2a$10$TrHwZX7o/0LP7YhxEYeenuvLC1zdUD2p2B0f5wukbrOnvr07wSYlC','TEACHER'),(2,'ssafy@ssafy.com',_binary '\0','김싸피','$2a$10$BltAhuqo1/2OJq/Xw6X3POI7ZvCAGbcNc6hu1nz2JGpfC4vl04IfK','TEACHER'),(3,'ssafy@ssafy.com',_binary '\0','김싸피','$2a$10$1objPu4I9hdX1X0kyT5GEeoPYaMlWUGgKiuR8mgC28ZOp9wUpYPoS','TEACHER'),(4,'ssafy@ssafy.com',_binary '\0','김싸피','$2a$10$Iv8nzWr7w1IKI/X4vmsize4D/94b33KpWa9pzFkhuxLZg/jnfuby.','TEACHER'),(5,'tenr4y@gmail.com2',_binary '\0','최지웅','$2a$10$e4tMAVLAadEGDhRsyjkpj.WrjxxRklvO3R3CBujO5mQ4Zg1/C7tJK','TEACHER'),(6,'kim@ssafy.com',_binary '\0','김싸피','$2a$10$TdRhcV92egwU7rKVi3CmzO4dzmBNZTtPqpwB57opvF5rMA1wuREyG','TEACHER'),(7,'tenr4y@gmail.com',_binary '\0','최지웅','$2a$10$3g2ymxLLY0pdKRapm9r5sOaeGI/DeJ2b8XAMOwKPBwZ1uK7V.ZWUe','TEACHER'),(9,'hggew@naver.com',_binary '\0','김선생','$2a$10$EG6updHNTuNiPQaFjLnHUuX9YAaFf7GFxVYEeKulpnHyaFYfmVThC','TEACHER'),(10,'jwchoi42@naver.com',_binary '\0','최지웅2','$2a$10$lhSTIHLAf5/2IpKE.leVruzGP1WZjMOL8y.I9k/LN9L4yJVzLH5Da','TEACHER'),(11,'pakox123@gmail.com',_binary '\0','오기선','$2a$10$gReWkCdXQILi/XtayTs9m.Qp040gjYEAXtX.hV3NPDrHFoK1b4OtS','TEACHER'),(12,'pakox123@gmail.com',_binary '\0','오기선','$2a$10$YiDCTjnzzqeDXUODh2R7GOUDNG7LSKz.PbVWp.CTgrQRWcO2wO.hG','TEACHER'),(13,'pakox123@gmail.com',_binary '\0','오기선','$2a$10$D/bOUeg8Y6YobXxiogmRs.EjBt.iykaVUaAnMeFUKjIxRaBFWEWGO','TEACHER'),(14,'pakox123@gmail.com',_binary '\0','오기선','$2a$10$BIhf.v90GSq8qHrYjzXpiezLJj8A5RVHwL28rD/vNGA0mmvznFYdm','TEACHER'),(15,'pakox123@gmail.com',_binary '\0','오기선','$2a$10$CofeEfa72eQWMIjjvdz9vevDnkotGUH74a5Ang8ItJ.piIzVglMyu','TEACHER'),(16,'pakox123@gmail.com',_binary '\0','김덕배','$2a$10$5dPlTyPJhlgdzgv0gwZFneoBGt8VcdAXFz9spRl4ICmt0xj7KQhHG','TEACHER'),(17,'pakox123@gmail.com',_binary '\0','오기선','$2a$10$KdaWzveCyB5Niiwk8O3PK.Iwg/F25reqa/jeaL97ynXxhlv5tMi8q','TEACHER'),(18,'pakox123@gmail.com',_binary '\0','오기선','$2a$10$I5Mobr5wFS02eyO5DvV46u/ERLiZyqi1Iht5xw07hoRV4Bb.4dphW','TEACHER'),(19,'pakox123@gmail.com',_binary '\0','오기선','$2a$10$GA9ucbmNGvNdrnYP3j11BOTGHr9T2B4N.Wd6CmV6z75Ci9Pn.IIpu','TEACHER'),(20,'pakox123@gmail.com',_binary '\0','육시','$2a$10$IbbONPDt7SObQA8VasWH.OCBmYY6Hhc4WD9jjcSm2aCAdp/fdmxtG','TEACHER'),(22,'51263@naver.com',_binary '\0','오기선','$2a$10$PD4N7aFZJgj6St3TcAix7e6ha9PgxSjeh217FypIuvggzRPWz90ce','TEACHER');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
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
