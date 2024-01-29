-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 05, 2023 at 06:47 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



--
-- Database: `masterd`
--

-- --------------------------------------------------------

--
-- Table structure for table `consultas`
--

CREATE TABLE `consultas` (
  `date` varchar(30) NOT NULL,
  `comment` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consultas`
--

INSERT INTO `consultas` (`date`, `comment`, `username`) VALUES
('2023-05-05T14:37', 'Meeting', 'user3'),
('2023-05-25T19:35', 'Consulta 3', 'user1'),
('2023-05-18T19:39', 'consulta 3', 'user1'),
('2023-05-31T19:57', 't', 'user2'),
('2023-06-02T19:58', 'consulta', 'user3'),
('2023-05-09T17:42', 'Consulta', 'user1'),
('2023-05-18T22:58', 'Consulta', 'user2'),
('2023-05-09T14:45', 'Nova consulta', 'user2');

-- --------------------------------------------------------

--
-- Table structure for table `noticias`
--

CREATE TABLE `noticias` (
  `title` varchar(100) NOT NULL,
  `body` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `noticias`
--

INSERT INTO `noticias` (`title`, `body`, `date`) VALUES
('40º website completo!', 'Começámos o ano com um marco importante, completando o nosso 40º website.\r\nVeja o resultado no nosso portfólio.', '2023-01-01 17:20:00'),
('O modo noturno', 'Eis como fixar mais visitantes ao seu website durante a noite (e o dia).\r\nA opção de colocar modificar o esquema de cores do seu website permite que este se adapte a diferentes preferências, assim como a alturas em que, não havendo luz natural, as cores fortes não cansem os olhos de quem visita o seu website. (...)', '2023-02-11 14:00:00'),
('Precisa de uma base de dados?', 'As bases de dados são importantes para guardar informação sobre o seu negócio e mantê-la atualizada, para além de muitas outras possibilidades do ponto de vista do utilizador.', '2023-04-30 20:59:00'),
('Prémio de melhor website', 'Orgulhamo-nos do que fazemos e a preferência dos clientes fala for si, mas ter o reconhecimento dos nossos pares reforça o prestígio que vimos a reunir.\r\nEste é um prémio importante, atribuído pelo BestWebsiteAwardSite.com (...)', '2023-04-18 17:15:00'),
('sétima notícia', 'sétima notícia modificada', '2023-05-03 19:43:00'),
('sexta notícia', 'corpo da sexta notícia', '2023-05-01 15:59:00'),
('Site para todos os navegadores', 'Sabe que navegador os seus consumidores usam? É provável que não, e isso não deve diminuir a fluidez do seu site.\r\nApesar de ser importante discernir o seu público-alvo, nem todos os pormenores podem ser tidos em conta de antemão. Como tal, para diferentes navegadores, tal como para diferentes tamanhos de ecrã, deixamos que o computador nos diga as suas características em cada caso, e preparamos o nosso site para qualquer eventualidade.', '2023-02-21 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `projetos`
--

CREATE TABLE `projetos` (
  `image` varchar(30) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `technology` varchar(255) DEFAULT NULL,
  `timeframe` int(11) DEFAULT NULL,
  `ID` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projetos`
--

INSERT INTO `projetos` (`image`, `info`, `technology`, `timeframe`, `ID`) VALUES
('images/image1.jpg', 'Página simples com produtos para consulta e contactos\r\nCinco separadores\r\nDesign moderno', 'HTML/CSS, javaScript simples.', 14, '1'),
('images/image2.jpg', 'Consulta de serviços\r\nCalendário para marcações online\r\nContacto através da página', 'HTML/CSS, javaScript, PHP', 14, '2'),
('images/image3.jpg', 'Apresentação da empresa\r\nNavegação por categorias de atividade\r\nContactos e redirecionamentos\r\nMudança dinâmica de fotografias', 'javaScript, jQuery, PHP, SQL', 10, '3'),
('images/image2.jpg', 'Compras à distância de um clique\r\nAtualização diária de sugestões de produtos\r\nNavegação intuitiva\r\nDesign attrativo', 'HTML, Bootstrap, PHP', 16, '4'),
('images/image4.jpg', 'Criação de contas de cliente\r\nPersonalização de cada conta\r\nConsulta do histórico de atividade\r\nPopup para upgrade premium', 'HTML/CSS, javaScript, PHP, SQL', 15, '5'),
('images/image5.jpg', 'Modo noturno\r\nTemas consoante o separador\r\nGaleria de fotos', 'HTML/CSS', 5, '6');

-- --------------------------------------------------------

--
-- Table structure for table `utilizadores`
--

CREATE TABLE `utilizadores` (
  `nome` varchar(255) NOT NULL,
  `apelido` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `usertype` varchar(255) DEFAULT 'cliente',
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilizadores`
--

INSERT INTO `utilizadores` (`nome`, `apelido`, `username`, `email`, `telefone`, `usertype`, `pass`) VALUES
('admin', 'admin', 'admin', 'admin@admin.com', '123456789', 'admin', '$2y$10$VL3FZqDndYLhfZv21Dg/Cu/J/wZWrN5WI8wlNYGCn4B4I0qenSwxy'),
('user1', 'user1', 'user1', 'user1@user1.com', '123456789', 'cliente', '$2y$10$J8d5bxN9LVletI0eQpBxzu0qcMEp181pfG0gUkXiih8ZLe0bwNBu2'),
('user2', 'user2', 'user2', 'user2@user2.com', '123456789', 'cliente', '$2y$10$GqMvOK5jrXwSVE0lduHTSOMpBnsbnz9V7QdnCHgZ7dtbsZKEiucq6'),
('user3', 'user3', 'user3', 'user3@user3.com', '123456789', 'cliente', '$2y$10$6Dk5A3jl067mKyKm2rWHWuoJNSmLJS5Pxe354D/L36tJi3P4Z8gxu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `noticias`
--
ALTER TABLE `noticias`
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `projetos`
--
ALTER TABLE `projetos`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `utilizadores`
--
ALTER TABLE `utilizadores`
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `username_5` (`username`);
COMMIT;
