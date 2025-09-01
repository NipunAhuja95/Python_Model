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
-- Table structure for table `sensitivities_2024q3`
--

DROP TABLE IF EXISTS `sensitivities_2024q3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensitivities_2024q3` (
  `S. No` int DEFAULT NULL,
  `Sensitivity Description` text,
  `Mortality Additive Factor` int DEFAULT NULL,
  `Mortality Multiplicative Factor` double DEFAULT NULL,
  `Interest Rate Additive Factor` double DEFAULT NULL,
  `Interest Rate Multiplicative Factor` int DEFAULT NULL,
  `Lapse Additive Factor` int DEFAULT NULL,
  `Lapse Multiplicative Factor` double DEFAULT NULL,
  `Expense Additive Factor` int DEFAULT NULL,
  `Expense Multiplicative Factor` int DEFAULT NULL,
  `Inflation Additive Factor` int DEFAULT NULL,
  `Inflation Multiplicative Factor` int DEFAULT NULL,
  `Cat Additive Factor` int DEFAULT NULL,
  `Cat Multiplicative Factor` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensitivities_2024q3`
--

LOCK TABLES `sensitivities_2024q3` WRITE;
/*!40000 ALTER TABLE `sensitivities_2024q3` DISABLE KEYS */;
INSERT INTO `sensitivities_2024q3` VALUES (1,'Mortality',0,1.2,0,1,0,1,0,1,0,1,0,1),(2,'Interest Rate',0,1,0.01,1,0,1,0,1,0,1,0,1),(3,'Lapse Up',0,1,0,1,0,1.5,0,1,0,1,0,1),(4,'Lapse Down',0,1,0,1,0,0.5,0,1,0,1,0,1),(5,'Expense',0,1,0,1,0,1,0,2,0,1,0,1),(6,'Inflation',0,1,0,1,0,1,0,1,0,1,0,1),(7,'Catastrophe',0,1,0,1,0,1,0,1,0,1,0,1),(8,'All shocks',0,1.15,0.01,1,0,1.5,0,2,0,1,0,1);
/*!40000 ALTER TABLE `sensitivities_2024q3` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 12:32:21
