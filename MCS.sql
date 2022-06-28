-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para mcs
CREATE DATABASE IF NOT EXISTS `mcs` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mcs`;

-- Volcando estructura para tabla mcs.admin
CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mcs.citas
CREATE TABLE IF NOT EXISTS `citas` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `costo` float NOT NULL,
  `hora` time NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(20) NOT NULL DEFAULT 'Pendiente',
  `id_servicio` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_horario` int(11) NOT NULL,
  PRIMARY KEY (`id_cita`),
  KEY `FK_citas_servicios` (`id_servicio`),
  KEY `FK_citas_pacientes` (`id_paciente`),
  KEY `FK_citas_medicos` (`id_medico`),
  KEY `FK_citas_horarios` (`id_horario`),
  CONSTRAINT `FK_citas_horarios` FOREIGN KEY (`id_horario`) REFERENCES `horarios` (`id_horario`),
  CONSTRAINT `FK_citas_medicos` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  CONSTRAINT `FK_citas_pacientes` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  CONSTRAINT `FK_citas_servicios` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mcs.horarios
CREATE TABLE IF NOT EXISTS `horarios` (
  `id_horario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `id_servicio` int(11) NOT NULL,
  PRIMARY KEY (`id_horario`),
  KEY `FK_horarios_servicios` (`id_servicio`) USING BTREE,
  CONSTRAINT `FK_horarios_servicios` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mcs.medicos
CREATE TABLE IF NOT EXISTS `medicos` (
  `id_medico` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(50) NOT NULL DEFAULT '',
  `contrasena` varchar(50) NOT NULL DEFAULT '',
  `cedula` varchar(50) NOT NULL DEFAULT '',
  `nombre` varchar(50) NOT NULL DEFAULT '',
  `apellido` varchar(50) NOT NULL DEFAULT '',
  `id_servicio` int(11) NOT NULL,
  PRIMARY KEY (`id_medico`),
  KEY `FK_medicos_servicios` (`id_servicio`),
  CONSTRAINT `FK_medicos_servicios` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mcs.pacientes
CREATE TABLE IF NOT EXISTS `pacientes` (
  `id_paciente` int(11) NOT NULL AUTO_INCREMENT,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cedula` varchar(50) NOT NULL,
  `fechadenacimiento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `direccion` text NOT NULL,
  PRIMARY KEY (`id_paciente`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mcs.preguntasfrecuentes
CREATE TABLE IF NOT EXISTS `preguntasfrecuentes` (
  `id_pregunta` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(50) NOT NULL,
  `respuesta` text NOT NULL,
  PRIMARY KEY (`id_pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mcs.resultados
CREATE TABLE IF NOT EXISTS `resultados` (
  `id_resultado` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `id_cita` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  PRIMARY KEY (`id_resultado`),
  KEY `FKresultados_medico` (`id_medico`),
  KEY `FKresultados_paciente` (`id_paciente`),
  KEY `FK_resultados_citas` (`id_cita`),
  CONSTRAINT `FK_resultados_citas` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id_cita`),
  CONSTRAINT `FKresultados_medico` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  CONSTRAINT `FKresultados_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla mcs.servicios
CREATE TABLE IF NOT EXISTS `servicios` (
  `id_servicio` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` int(11) NOT NULL,
  `costo` float NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- La exportación de datos fue deseleccionada.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
