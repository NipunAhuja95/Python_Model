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
-- Table structure for table `policy_data_gcl`
--

DROP TABLE IF EXISTS `policy_data_gcl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policy_data_gcl` (
  `Policy ID` text,
  `Product Code` text,
  `Partner Name` text,
  `S.no` int DEFAULT NULL,
  `Premium` int DEFAULT NULL,
  `Loan Amount` int DEFAULT NULL,
  `EMI amount` int DEFAULT NULL,
  `Interest Rate` double DEFAULT NULL,
  `Mode` int DEFAULT NULL,
  `Age at Policy Start` int DEFAULT NULL,
  `PPT` int DEFAULT NULL,
  `Policy Term (Years)` int DEFAULT NULL,
  `PT (Month)` int DEFAULT NULL,
  `Gender` text,
  `Smoker` text,
  `Moratorium Period (months)` int DEFAULT NULL,
  `Interest Accrue` int DEFAULT NULL,
  `Reducing SA` int DEFAULT NULL,
  `Sensitivity` int DEFAULT NULL,
  `Mortality - IALM loading vs flat dedn` int DEFAULT NULL,
  `Mortality Qx` double DEFAULT NULL,
  `RPM` double DEFAULT NULL,
  `Policy start month` int DEFAULT NULL,
  `Policy start date` text,
  `EMR (Extra mortality Rate)` text,
  `Policy Status` text,
  `Distribution Channel` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_data_gcl`
--

LOCK TABLES `policy_data_gcl` WRITE;
/*!40000 ALTER TABLE `policy_data_gcl` DISABLE KEYS */;
INSERT INTO `policy_data_gcl` VALUES ('LKART00000232431','GCL','LKART',1273,2207,217000,10215,0.12,1,22,1,2,0,'F','NS',0,1,1,1,1,1.2,10.16949171,13,'15-12-2023','','',1),('LKART00000134462','GCL','LKART',4096,4657,314000,10429,0.12,1,30,1,3,0,'F','NS',0,1,1,1,1,1.2,14.8305086,15,'15-10-2023','','',1),('LKART00000422552','GCL','LKART',473,1581,287000,25500,0.12,1,42,1,1,0,'F','NS',0,1,1,1,1,1.2,5.508474564,11,'15-02-2024','','',1),('LKART00000495702','GCL','LKART',1076,63825,2553000,56790,0.12,1,39,1,5,0,'M','NS',0,1,1,1,1,1.2,25,10,'15-03-2024','','',1),('LKART00000270403','GCL','LKART',2285,79850,3194000,71049,0.12,1,25,1,5,0,'M','NS',0,1,1,1,1,1.2,25,12,'15-01-2024','','',1);
/*!40000 ALTER TABLE `policy_data_gcl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 12:32:16
