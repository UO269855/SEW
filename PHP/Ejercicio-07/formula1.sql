-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2022 at 10:54 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `formula1`
--

-- --------------------------------------------------------

--
-- Table structure for table `carrera`
--

CREATE TABLE `carrera` (
  `Posicion` int(11) NOT NULL,
  `Puntos` int(11) NOT NULL,
  `IdPiloto` int(2) NOT NULL,
  `IdCircuito` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carrera`
--

INSERT INTO `carrera` (`Posicion`, `Puntos`, `IdPiloto`, `IdCircuito`) VALUES
(1, 25, 1, 1),
(2, 18, 1, 2),
(2, 18, 1, 3),
(3, 15, 1, 4),
(2, 18, 2, 1),
(1, 25, 2, 2),
(1, 25, 2, 3),
(2, 18, 2, 4),
(3, 15, 3, 1),
(3, 15, 3, 2),
(3, 15, 3, 3),
(1, 25, 3, 4),
(4, 12, 4, 1),
(5, 10, 4, 2),
(6, 8, 4, 3),
(8, 4, 4, 4),
(5, 10, 5, 1),
(7, 6, 5, 2),
(7, 6, 5, 3),
(7, 6, 5, 4),
(6, 8, 6, 1),
(4, 12, 6, 2),
(4, 12, 6, 3),
(5, 10, 6, 4),
(7, 6, 7, 1),
(6, 8, 7, 2),
(5, 10, 7, 3),
(4, 12, 7, 4),
(8, 4, 8, 1),
(8, 4, 8, 2),
(8, 4, 8, 3),
(6, 8, 8, 4);

-- --------------------------------------------------------

--
-- Table structure for table `circuito`
--

CREATE TABLE `circuito` (
  `Id` int(2) NOT NULL,
  `Pista` varchar(255) NOT NULL,
  `IdPais` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `circuito`
--

INSERT INTO `circuito` (`Id`, `Pista`, `IdPais`) VALUES
(1, 'Jerez', 1),
(2, 'Montmelo', 1),
(3, 'Silverstone', 2),
(4, 'Shangai', 4);

-- --------------------------------------------------------

--
-- Table structure for table `equipo`
--

CREATE TABLE `equipo` (
  `Id` int(2) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Motor` varchar(255) NOT NULL,
  `IdPais` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `equipo`
--

INSERT INTO `equipo` (`Id`, `Nombre`, `Motor`, `IdPais`) VALUES
(1, 'Campos Racing', 'Ferrari', 1),
(2, 'Mclaren', 'Mercedes', 2),
(3, 'Chip Ganassi', 'Honda', 3),
(4, 'Virtuiosi', 'Mercedes', 4);

-- --------------------------------------------------------

--
-- Table structure for table `pais`
--

CREATE TABLE `pais` (
  `Id` int(2) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Continente` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pais`
--

INSERT INTO `pais` (`Id`, `Nombre`, `Continente`) VALUES
(1, 'Spain', 'Europe'),
(2, 'England', 'Europe'),
(3, 'Canada', 'America'),
(4, 'China', 'Asia'),
(5, 'Finland', 'Europe');

-- --------------------------------------------------------

--
-- Table structure for table `piloto`
--

CREATE TABLE `piloto` (
  `Id` int(2) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) NOT NULL,
  `IdPais` int(2) DEFAULT NULL,
  `IdEquipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `piloto`
--

INSERT INTO `piloto` (`Id`, `Nombre`, `Apellido`, `IdPais`, `IdEquipo`) VALUES
(1, 'Carlos', 'Sainz', 1, 1),
(2, 'Lando', 'Norris', 2, 1),
(3, 'Fernando', 'Alonso', 1, 2),
(4, 'George', 'Russell', 2, 2),
(5, 'Lance', 'Stroll', 3, 3),
(6, 'Zhou', 'Guanyu', 4, 3),
(7, 'Mika', 'Hakkinen', 5, 4),
(8, 'Nicholas', 'Latifi', 3, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`IdPiloto`,`IdCircuito`),
  ADD KEY `IdCircuito` (`IdCircuito`);

--
-- Indexes for table `circuito`
--
ALTER TABLE `circuito`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdPais` (`IdPais`);

--
-- Indexes for table `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdPais` (`IdPais`);

--
-- Indexes for table `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `piloto`
--
ALTER TABLE `piloto`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdPais` (`IdPais`),
  ADD KEY `IdEquipo` (`IdEquipo`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carrera`
--
ALTER TABLE `carrera`
  ADD CONSTRAINT `carrera_ibfk_1` FOREIGN KEY (`IdPiloto`) REFERENCES `piloto` (`Id`),
  ADD CONSTRAINT `carrera_ibfk_2` FOREIGN KEY (`IdCircuito`) REFERENCES `circuito` (`Id`);

--
-- Constraints for table `circuito`
--
ALTER TABLE `circuito`
  ADD CONSTRAINT `circuito_ibfk_1` FOREIGN KEY (`IdPais`) REFERENCES `pais` (`Id`);

--
-- Constraints for table `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`IdPais`) REFERENCES `pais` (`Id`);

--
-- Constraints for table `piloto`
--
ALTER TABLE `piloto`
  ADD CONSTRAINT `piloto_ibfk_1` FOREIGN KEY (`IdPais`) REFERENCES `pais` (`Id`),
  ADD CONSTRAINT `piloto_ibfk_2` FOREIGN KEY (`IdEquipo`) REFERENCES `equipo` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
