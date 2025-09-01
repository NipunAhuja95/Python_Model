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
-- Table structure for table `initial_exp_tbl_gcl_ifrs17`
--

DROP TABLE IF EXISTS `initial_exp_tbl_gcl_ifrs17`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `initial_exp_tbl_gcl_ifrs17` (
  `S. No` int DEFAULT NULL,
  `Expense_Type` text,
  `SA` int DEFAULT NULL,
  `Expense_Category` text,
  `Value` double DEFAULT NULL,
  `Calendar Year` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `initial_exp_tbl_gcl_ifrs17`
--

LOCK TABLES `initial_exp_tbl_gcl_ifrs17` WRITE;
/*!40000 ALTER TABLE `initial_exp_tbl_gcl_ifrs17` DISABLE KEYS */;
INSERT INTO `initial_exp_tbl_gcl_ifrs17` VALUES (1,'Initial',2500000,'% of Prem',0.45,''),(2,'Initial',2500000,'Fixed',1100,''),(3,'Initial',2500000,'% of SA',0.0002,''),(4,'Initial',5000000,'% of Prem',0.45,''),(5,'Initial',5000000,'Fixed',1100,''),(6,'Initial',5000000,'% of SA',0.0002,''),(7,'Initial',7500000,'% of Prem',0.45,''),(8,'Initial',7500000,'Fixed',1100,''),(9,'Initial',7500000,'% of SA',0.0002,''),(10,'Initial',10000000,'% of Prem',0.45,''),(11,'Initial',10000000,'Fixed',1100,''),(12,'Initial',10000000,'% of SA',0.0002,''),(13,'Initial',15000000,'% of Prem',0.45,''),(14,'Initial',15000000,'Fixed',1100,''),(15,'Initial',15000000,'% of SA',0.0002,'');
/*!40000 ALTER TABLE `initial_exp_tbl_gcl_ifrs17` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 12:32:14
