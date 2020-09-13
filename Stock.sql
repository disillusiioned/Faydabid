-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 13, 2020 at 07:03 PM
-- Server version: 5.7.31-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Stock`
--

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `SKU_CODE` char(8) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `PRICE` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`SKU_CODE`, `NAME`, `PRICE`) VALUES
('PROD1234', 'PRODUCT1', 123),
('PROD1235', 'Pencil', 8),
('PROD1236', 'PencilBox', 20),
('PROD1237', 'Box', 40),
('PROD1238', 'Rubber', 2),
('PROD1239', 'Sharpner', 5),
('PROD1240', 'Blanket', 200),
('PROD1241', 'Pillow', 200),
('PROD1242', 'Suitcase', 1000),
('PROD1243', 'Bedsheets', 500),
('PROD1244', 'Jumpsuit', 2000),
('PROD1245', 'Leggings', 300),
('PROD1246', 'Bottle', 50),
('PROD1247', 'Milk powder', 110),
('PROD1248', 'Laptop', 50000),
('PROD1249', 'Pendrive', 1800);

-- --------------------------------------------------------

--
-- Table structure for table `ProductStock`
--

CREATE TABLE `ProductStock` (
  `ID` int(11) NOT NULL,
  `SKU_CODE` varchar(8) NOT NULL,
  `WH_CODE` varchar(16) NOT NULL,
  `ITEM_COUNT` int(11) NOT NULL,
  `LOW_ITEM_THRESHOLD` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ProductStock`
--

INSERT INTO `ProductStock` (`ID`, `SKU_CODE`, `WH_CODE`, `ITEM_COUNT`, `LOW_ITEM_THRESHOLD`) VALUES
(1, 'PROD1234', 'WH1234', 20, 12),
(2, 'PROD1234', 'WH1235', 20, 12),
(3, 'PROD1234', 'WH1236', 20, 12),
(4, 'PROD1234', 'WH1236', 20, 12),
(5, 'PROD1235', 'WH1236', 20, 100),
(6, 'PROD1236', 'WH1236', 10, 7),
(7, 'PROD1237', 'WH1236', 10, 8),
(8, 'PROD1238', 'WH1236', 10, 9),
(9, 'PROD1239', 'WH1236', 99, 99),
(26, 'PROD1234', 'BtHgwvJb', 20, 12),
(27, 'PROD1235', 'BtHgwvJb', 0, 10),
(28, 'PROD1236', 'BtHgwvJb', 0, 10),
(29, 'PROD1237', 'BtHgwvJb', 0, 10),
(30, 'PROD1238', 'BtHgwvJb', 0, 10),
(31, 'PROD1239', 'BtHgwvJb', 0, 10),
(32, 'PROD1240', 'BtHgwvJb', 0, 10),
(33, 'PROD1241', 'BtHgwvJb', 0, 10),
(34, 'PROD1242', 'BtHgwvJb', 0, 10),
(35, 'PROD1243', 'BtHgwvJb', 0, 10),
(36, 'PROD1244', 'BtHgwvJb', 0, 10),
(37, 'PROD1245', 'BtHgwvJb', 0, 10),
(38, 'PROD1246', 'BtHgwvJb', 0, 10),
(39, 'PROD1247', 'BtHgwvJb', 0, 10),
(40, 'PROD1248', 'BtHgwvJb', 0, 10),
(41, 'PROD1249', 'BtHgwvJb', 0, 10),
(42, 'PROD1234', 'B377rQWq', 20, 12),
(43, 'PROD1235', 'B377rQWq', 0, 10),
(44, 'PROD1236', 'B377rQWq', 0, 10),
(45, 'PROD1237', 'B377rQWq', 0, 10),
(46, 'PROD1238', 'B377rQWq', 0, 10),
(47, 'PROD1239', 'B377rQWq', 0, 10),
(48, 'PROD1240', 'B377rQWq', 0, 10),
(49, 'PROD1241', 'B377rQWq', 0, 10),
(50, 'PROD1242', 'B377rQWq', 0, 10),
(51, 'PROD1243', 'B377rQWq', 0, 10),
(52, 'PROD1244', 'B377rQWq', 0, 10),
(53, 'PROD1245', 'B377rQWq', 0, 10),
(54, 'PROD1246', 'B377rQWq', 0, 10),
(55, 'PROD1247', 'B377rQWq', 0, 10),
(56, 'PROD1248', 'B377rQWq', 0, 10),
(57, 'PROD1249', 'B377rQWq', 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Warehouse`
--

CREATE TABLE `Warehouse` (
  `WH_CODE` varchar(16) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `PINCODE` varchar(10) NOT NULL,
  `MAX_CAPACITY` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Warehouse`
--

INSERT INTO `Warehouse` (`WH_CODE`, `NAME`, `PINCODE`, `MAX_CAPACITY`) VALUES
('B377rQWq', 'Udaipur', '560034', 1234),
('BtHgwvJb', 'Jaipur', '0140', 1234),
('WH1234', 'New Delhi', '110016', 500),
('WH1235', 'Bangalore', '560047', 1500),
('WH1236', 'Mumbai', '400004', 2000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`SKU_CODE`);

--
-- Indexes for table `ProductStock`
--
ALTER TABLE `ProductStock`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `SKU_CODE` (`SKU_CODE`),
  ADD KEY `WH_CODE` (`WH_CODE`);

--
-- Indexes for table `Warehouse`
--
ALTER TABLE `Warehouse`
  ADD PRIMARY KEY (`WH_CODE`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ProductStock`
--
ALTER TABLE `ProductStock`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `ProductStock`
--
ALTER TABLE `ProductStock`
  ADD CONSTRAINT `SKU_CODE` FOREIGN KEY (`SKU_CODE`) REFERENCES `Product` (`SKU_CODE`),
  ADD CONSTRAINT `WH_CODE` FOREIGN KEY (`WH_CODE`) REFERENCES `Warehouse` (`WH_CODE`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
