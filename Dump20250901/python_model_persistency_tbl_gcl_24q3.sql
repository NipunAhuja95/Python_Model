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
-- Table structure for table `persistency_tbl_gcl_24q3`
--

DROP TABLE IF EXISTS `persistency_tbl_gcl_24q3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persistency_tbl_gcl_24q3` (
  `S. No` int DEFAULT NULL,
  `Policy Year` int DEFAULT NULL,
  `Channel` int DEFAULT NULL,
  `Lapse Rate` double DEFAULT NULL,
  `PUP Rate` int DEFAULT NULL,
  `SurrenderWithdrawal` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persistency_tbl_gcl_24q3`
--

LOCK TABLES `persistency_tbl_gcl_24q3` WRITE;
/*!40000 ALTER TABLE `persistency_tbl_gcl_24q3` DISABLE KEYS */;
INSERT INTO `persistency_tbl_gcl_24q3` VALUES (1,1,1,0.005,0,0),(2,2,1,0.005,0,0),(3,3,1,0.005,0,0),(4,4,1,0.005,0,0),(5,5,1,0.005,0,0),(6,6,1,0.005,0,0),(7,7,1,0.005,0,0),(8,8,1,0.005,0,0),(9,1,2,0.005,0,0),(10,2,2,0.005,0,0),(11,3,2,0.005,0,0),(12,4,2,0.005,0,0),(13,5,2,0.005,0,0),(14,6,2,0.005,0,0),(15,7,2,0.005,0,0),(16,8,2,0.005,0,0);
/*!40000 ALTER TABLE `persistency_tbl_gcl_24q3` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 12:32:19
