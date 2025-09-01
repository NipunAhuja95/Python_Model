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
-- Table structure for table `commrt_tbl_gcl_24q3`
--

DROP TABLE IF EXISTS `commrt_tbl_gcl_24q3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commrt_tbl_gcl_24q3` (
  `S. No` int DEFAULT NULL,
  `Policy Year` int DEFAULT NULL,
  `Channel` int DEFAULT NULL,
  `Commission Rates` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commrt_tbl_gcl_24q3`
--

LOCK TABLES `commrt_tbl_gcl_24q3` WRITE;
/*!40000 ALTER TABLE `commrt_tbl_gcl_24q3` DISABLE KEYS */;
INSERT INTO `commrt_tbl_gcl_24q3` VALUES (1,1,1,0.05),(2,2,1,0),(3,3,1,0),(4,4,1,0),(5,5,1,0),(6,6,1,0),(7,7,1,0),(8,8,1,0),(9,9,1,0),(10,10,1,0),(11,11,1,0),(12,12,1,0),(13,13,1,0),(14,14,1,0),(15,15,1,0),(16,16,1,0),(17,17,1,0),(18,18,1,0),(19,19,1,0),(20,20,1,0),(21,21,1,0),(22,22,1,0),(23,23,1,0),(24,24,1,0),(25,25,1,0),(26,26,1,0),(27,27,1,0),(28,28,1,0),(29,29,1,0),(30,30,1,0),(1,1,2,0.4),(2,2,2,0.05),(3,3,2,0.05),(4,4,2,0.05),(5,5,2,0.05),(6,6,2,0.05),(7,7,2,0.05),(8,8,2,0.05),(9,9,2,0.05),(10,10,2,0.05),(11,11,2,0.05),(12,12,2,0.05),(13,13,2,0.05),(14,14,2,0.05),(15,15,2,0.05),(16,16,2,0.05),(17,17,2,0.05),(18,18,2,0.05),(19,19,2,0.05),(20,20,2,0.05),(21,21,2,0.05),(22,22,2,0.05),(23,23,2,0.05),(24,24,2,0.05),(25,25,2,0.05),(26,26,2,0.05),(27,27,2,0.05),(28,28,2,0.05),(29,29,2,0.05),(30,30,2,0.05);
/*!40000 ALTER TABLE `commrt_tbl_gcl_24q3` ENABLE KEYS */;
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
