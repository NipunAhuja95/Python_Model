CREATE DATABASE  IF NOT EXISTS `python_model` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `python_model`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: python_model
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `policy_data_term`
--

DROP TABLE IF EXISTS `policy_data_term`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy_data_term` (
  `Policy Number` text,
  `Product Code` text,
  `Policy Start Date` text,
  `Policy Term (Years)` int DEFAULT NULL,
  `Premium Payment Term` int DEFAULT NULL,
  `Sum Assured` int DEFAULT NULL,
  `Premium Amount` double DEFAULT NULL,
  `Premium Frequency` int DEFAULT NULL,
  `Distribution Channel` int DEFAULT NULL,
  `Date of Birth` text,
  `Age at Policy Start` int DEFAULT NULL,
  `Gender` text,
  `Smoking Status` text,
  `Underwriting category/ Medical status` text,
  `EMR (Extra mortality Rate)` text,
  `Policy Status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_data_term`
--

LOCK TABLES `policy_data_term` WRITE;
/*!40000 ALTER TABLE `policy_data_term` DISABLE KEYS */;
INSERT INTO `policy_data_term` VALUES ('ALFTP20240000043','BASE_TERM','15-02-2024',17,17,25000000,27450,1,1,'',38,'M','NS','MNS','',''),('ALFTP20240000132','BASE_TERM','09-03-2024',41,41,5000000,7105,1,1,'',29,'F','S','TM','',''),('ALFTP20240000036','BASE_TERM','11-02-2024',33,33,2500000,6992.5,1,1,'',37,'F','NS','NM','',''),('ALFTP20240000009','BASE_TERM','10-01-2024',20,20,100000000,341200,12,1,'',50,'M','NS','MNS','',''),('ALFTP20240000001','BASE_TERM','13-12-2023',22,22,50000000,10805,12,1,'',38,'M','S','TM','','');
/*!40000 ALTER TABLE `policy_data_term` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 12:32:08
