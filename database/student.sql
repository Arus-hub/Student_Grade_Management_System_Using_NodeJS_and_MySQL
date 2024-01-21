-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 21, 2024 at 01:30 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student`
--

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` varchar(8) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `DOB` date NOT NULL,
  `Module1_Grade` int(3) NOT NULL,
  `Module2_Grade` int(3) NOT NULL,
  `Module3_Grade` int(3) NOT NULL,
  `Module4_Grade` int(3) NOT NULL,
  `Module5_Grade` int(3) NOT NULL,
  `Module6_Grade` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `first_name`, `last_name`, `DOB`, `Module1_Grade`, `Module2_Grade`, `Module3_Grade`, `Module4_Grade`, `Module5_Grade`, `Module6_Grade`) VALUES
('101010S', 'Sophia', 'Davis', '1993-11-28', 55, 40, 40, 40, 40, 40),
('123123J', 'John', 'Doe', '1990-01-15', 95, 95, 95, 40, 40, 40),
('123321G', 'Zoe', 'Zob', '2024-01-02', 20, 20, 33, 40, 50, 10),
('123456C', 'Vinayak', 'Mohitkar', '2024-01-10', 30, 20, 20, 50, 50, 100),
('124421K', 'Abdullah', 'Akthar', '2023-09-12', 65, 70, 77, 51, 55, 61),
('167585O', 'Olivia', 'Jones', '1996-07-19', 72, 72, 72, 72, 72, 72),
('204684A', 'Aradhya', 'Talawar', '1999-09-21', 56, 69, 64, 59, 71, 66),
('211335J', 'Jane', 'Smith', '1995-04-20', 45, 45, 45, 45, 45, 45),
('211335M', 'Michael', 'Brown', '1997-03-25', 85, 85, 85, 85, 85, 85),
('222222W', 'William', 'Miller', '2002-02-12', 50, 50, 50, 50, 50, 50),
('254435E', 'Emily', 'Anderson', '1999-09-30', 32, 32, 32, 32, 32, 32),
('321321D', 'David', 'Johnson', '2000-08-10', 75, 75, 75, 75, 75, 75),
('456456S', 'Sarah', 'Wilson', '1998-12-05', 62, 62, 62, 62, 62, 62),
('555555A', 'Aradhya', 'Talawar', '2023-12-13', 40, 20, 20, 50, 50, 100),
('696969Y', 'Aniket ', 'Sarap', '2010-06-09', 61, 61, 61, 61, 62, 66);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', 'root');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
