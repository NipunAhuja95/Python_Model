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
-- Table structure for table `policy_data_adb_rider`
--

DROP TABLE IF EXISTS `policy_data_adb_rider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy_data_adb_rider` (
  `Policy Number` text,
  `Product Code` text,
  `Policy Start Date` text,
  `Policy Term (Years)` int DEFAULT NULL,
  `Premium Payment Term` int DEFAULT NULL,
  `Sum Assured` int DEFAULT NULL,
  `Rider Premium` int DEFAULT NULL,
  `Base Premium` int DEFAULT NULL,
  `Rider Option` int DEFAULT NULL,
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
-- Dumping data for table `policy_data_adb_rider`
--

LOCK TABLES `policy_data_adb_rider` WRITE;
/*!40000 ALTER TABLE `policy_data_adb_rider` DISABLE KEYS */;
INSERT INTO `policy_data_adb_rider` VALUES ('ALFTP20240000012','Accidental Death','10-01-2024',18,18,10000000,4800,0,1,1,1,'',42,'M','NS','','',''),('ALFTP20240000158','Accidental Death','15-03-2024',26,26,2500000,1200,0,1,1,1,'',34,'F','NS','','',''),('ALFTP20240000006','Accidental Death','11-01-2024',27,27,1500000,720,0,1,12,1,'',33,'M','NS','','',''),('ALFTP20240000142','Accidental Death','13-03-2024',36,36,2500000,1200,0,1,1,1,'',34,'M','S','','',''),('ALFTP20240000027','Accidental Death','15-02-2024',30,30,1000000,480,0,1,1,1,'',35,'F','NS','','','');
/*!40000 ALTER TABLE `policy_data_adb_rider` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 12:32:10
