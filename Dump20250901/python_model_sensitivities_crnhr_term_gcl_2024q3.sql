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
-- Table structure for table `sensitivities_crnhr_term_gcl_2024q3`
--

DROP TABLE IF EXISTS `sensitivities_crnhr_term_gcl_2024q3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensitivities_crnhr_term_gcl_2024q3` (
  `S. No` int DEFAULT NULL,
  `Sensitivity Description` text,
  `Mortality_Additive_Factor` int DEFAULT NULL,
  `Mortality_Multiplicative_Factor` double DEFAULT NULL,
  `Interest_Rate_Additive_Factor` int DEFAULT NULL,
  `Interest_Rate_Multiplicative_Factor` int DEFAULT NULL,
  `Lapse_Additive_Factor` int DEFAULT NULL,
  `Lapse_Multiplicative_Factor` double DEFAULT NULL,
  `Expense_Additive_Factor` int DEFAULT NULL,
  `Expense_Multiplicative_Factor` int DEFAULT NULL,
  `Inflation_Additive_Factor` int DEFAULT NULL,
  `Inflation_Multiplicative_Factor` int DEFAULT NULL,
  `Cat_Additive_Factor` int DEFAULT NULL,
  `Cat_Multiplicative_Factor` int DEFAULT NULL,
  `Morbidity_Additive_Factor` int DEFAULT NULL,
  `Morbidity_Multiplicative_Factor` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensitivities_crnhr_term_gcl_2024q3`
--

LOCK TABLES `sensitivities_crnhr_term_gcl_2024q3` WRITE;
/*!40000 ALTER TABLE `sensitivities_crnhr_term_gcl_2024q3` DISABLE KEYS */;
INSERT INTO `sensitivities_crnhr_term_gcl_2024q3` VALUES (1,'Mortality',0,1.15,0,1,0,1,0,1,0,1,0,1,0,1),(2,'Lapse Up',0,1,0,1,0,1.5,0,1,0,1,0,1,0,1),(3,'Lapse Down',0,1,0,1,0,0.5,0,1,0,1,0,1,0,1),(4,'Morbidity',0,1,0,1,0,1,0,1,0,1,0,1,0,1.15);
/*!40000 ALTER TABLE `sensitivities_crnhr_term_gcl_2024q3` ENABLE KEYS */;
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
