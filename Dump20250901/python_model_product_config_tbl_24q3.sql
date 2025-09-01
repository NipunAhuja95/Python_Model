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
-- Table structure for table `product_config_tbl_24q3`
--

DROP TABLE IF EXISTS `product_config_tbl_24q3`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_config_tbl_24q3` (
  `S. No` int DEFAULT NULL,
  `Product Config Variable` text,
  `BASE_TERM` double DEFAULT NULL,
  `GCL` double DEFAULT NULL,
  `RIDER_CI` double DEFAULT NULL,
  `RIDER_ADB` double DEFAULT NULL,
  `RIDER_ATPD` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_config_tbl_24q3`
--

LOCK TABLES `product_config_tbl_24q3` WRITE;
/*!40000 ALTER TABLE `product_config_tbl_24q3` DISABLE KEYS */;
INSERT INTO `product_config_tbl_24q3` VALUES (1,'Use Male Mortality for Female',1,1,1,1,1),(2,'Setback in years',3,3,3,3,3),(3,'Reserving Method',0,0,0,0,0),(4,'MAD_Mortality',0.1,2.75,-0.1,-0.1,-0.1),(5,'MAD_Lapse',-0.2,-0.2,-0.2,0.2,-0.2),(6,'MAD_Expense',0.1,0.1,0.1,0.1,0.1),(8,'Inflation',0.05,0.05,0.05,0.05,0.05),(9,'Tax Rate',0.1456,0.1456,0.1456,0.1456,0.1456),(10,'CSR',0.02,0.02,0.02,0.02,0.02),(11,'Part 1 SM',0.03,0.01,0.03,0.03,0.03),(12,'Part 2 SM',0.001,0.001,0,0.001,0),(13,'Part 1 net to gross factor',0.85,0.85,0.85,0.85,0.85),(14,'Part 2 net to gross factor',0.5,0.5,0,0.5,0.5),(15,'Solvency ratio',1.5,1.5,1.5,1.5,1.5),(16,'Operational Risk Charge - Earned Premium',0.04,0.04,0.04,0.04,0.04),(17,'Operational risk charge - Technical provisions',0.0045,0.0045,0.0045,0.0045,0.0045),(18,'Cost of Capital Charge',0.04,0.04,0.04,0.04,0.04),(19,'Interest Rate to calculate PV of expenses in CRNHR',0.075,0.075,0.075,0.075,0.075),(20,'Minimum SA Multiplier',7,7,7,7,7),(21,'Reinsurance Retention Limit abs',1500000,0,0,1500000,1500000),(22,'Reinsurance Retention Limit proportion',1,0.3,0.3,1,1),(26,'CRNHR Expense Sensitivity',1.1,1.1,1.1,1.1,1.1),(27,'CRNHR Expense Inflation Stress',0.01,0.01,0.01,0.01,0.01),(28,'IFRS17 Multiplier Initial Expenses',1.26,0.067415336,1.26,1.26,1.26),(29,'IFRS17 Multiplier Renewal Expenses',1,1,1,1,1),(30,'IFRS17 Addition Renewal Expenses',0,0,0,0,0),(31,'IFRS 17 RA Ratio',0.087280568,0.008,0.087280568,0.087280568,0.087280568),(32,'IFRS 17 RI RA Ratio',-0.058580649,-0.01,-0.06,-0.058580649,-0.058580649),(33,'IFRS 17 v',0.998041046,0.998041046,0.998041046,0.998041046,0.998041046),(34,'IFRS 17 stress v',0.998829706,0.998829706,0.998829706,0.998829706,0.998829706),(35,'IFRS 17 stress inflation',0.004867551,0.004867551,0.004867551,0.004867551,0.004867551),(36,'IFRS 17 stress expense',1.1,1.1,1.1,1.1,1.1),(37,'IFRS17 Multiplier Initial Commission',0,1.2,0,0,0);
/*!40000 ALTER TABLE `product_config_tbl_24q3` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-01 12:32:20
