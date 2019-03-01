-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2019 a las 05:30:38
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `upoflix`
--
DROP DATABASE IF EXISTS upoflix;
CREATE DATABASE upoflix;
use upoflix;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actores`
--

CREATE TABLE `actores` (
  `produccion` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `persona` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directores`
--

CREATE TABLE `directores` (
  `produccion` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `persona` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `directores`
--

INSERT INTO `directores` (`produccion`, `persona`) VALUES
('En busca del arca perdida', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `genero` varchar(15) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`genero`) VALUES
('Acción'),
('Aventuras'),
('Bélica'),
('Ciencia ficción'),
('Comedia'),
('Drama'),
('Infantil'),
('Musical'),
('Terror'),
('Thriller'),
('Western');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id` int(3) NOT NULL,
  `nombre` varchar(20) COLLATE latin1_spanish_ci NOT NULL,
  `apellidos` varchar(20) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`id`, `nombre`, `apellidos`) VALUES
(1, 'Steven', 'Spielberg'),
(2, 'Harrison', 'Ford'),
(3, 'Sean', 'Connery'),
(4, 'Jennifer', 'Aniston'),
(5, 'Courteney', 'Cox'),
(6, 'Lisa', 'Kudrow'),
(7, 'Matthew', 'Perry'),
(8, 'Quentin', 'Tarantino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producciones`
--

CREATE TABLE `producciones` (
  `cartel` varchar(300) COLLATE latin1_spanish_ci NOT NULL,
  `titulo` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `genero` varchar(20) COLLATE latin1_spanish_ci NOT NULL,
  `resumen` varchar(220) COLLATE latin1_spanish_ci NOT NULL,
  `estreno` date NOT NULL,
  `duracion` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `producciones`
--

INSERT INTO `producciones` (`cartel`, `titulo`, `genero`, `resumen`, `estreno`, `duracion`) VALUES
('https://www.ecartelera.com/carteles/2100/2198/001_p.jpg', 'En busca del arca perdida', 'Aventuras', 'El arqueólogo, Indiana Jones, compite contra los nazis en la búsqueda de una famosa reliquia religiosa.', '1981-10-14', 115);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuaciones`
--

CREATE TABLE `puntuaciones` (
  `nota` int(1) NOT NULL,
  `usuario` varchar(15) COLLATE latin1_spanish_ci NOT NULL,
  `produccion` varchar(50) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `user` varchar(15) COLLATE latin1_spanish_ci NOT NULL,
  `nombre` varchar(15) COLLATE latin1_spanish_ci NOT NULL,
  `apellidos` varchar(15) COLLATE latin1_spanish_ci NOT NULL,
  `email` varchar(50) COLLATE latin1_spanish_ci NOT NULL,
  `password` varchar(15) COLLATE latin1_spanish_ci NOT NULL,
  `rol` enum('user','admin') COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`user`, `nombre`, `apellidos`, `email`, `password`, `rol`) VALUES
('carlos', 'Carlos', 'Rodriguez', 'carlos@gmail.com', 'C4rl0s', 'user'),
('crisdaw', 'Cristina', 'Alonso', 'crisaloari@gmail.com', 'cr1St1na', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actores`
--
ALTER TABLE `actores`
  ADD PRIMARY KEY (`produccion`,`persona`);

--
-- Indices de la tabla `directores`
--
ALTER TABLE `directores`
  ADD PRIMARY KEY (`produccion`,`persona`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`genero`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producciones`
--
ALTER TABLE `producciones`
  ADD PRIMARY KEY (`titulo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
