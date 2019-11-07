-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2019 at 05:10 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpus_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `ISBN` varchar(255) NOT NULL,
  `Judul_Buku` varchar(255) NOT NULL DEFAULT 'Not Available',
  `Pengarang` varchar(255) NOT NULL DEFAULT 'Not Available',
  `Sinopsis` varchar(255) NOT NULL DEFAULT 'Not Available',
  `Penerbit` varchar(255) NOT NULL DEFAULT 'Not Available',
  `Tahun_Terbit` varchar(255) NOT NULL,
  `Kategori` varchar(255) NOT NULL DEFAULT 'Not Available',
  `Stok_Buku` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`ISBN`, `Judul_Buku`, `Pengarang`, `Sinopsis`, `Penerbit`, `Tahun_Terbit`, `Kategori`, `Stok_Buku`) VALUES
('ISBN tidak tersedia', 'A history of East Africa', 'MARS, Zoe', 'Not Available', 'Cambridge University Press', '1972', 'Not Available', 0),
('ISBN tidak tersedia ; ISBN is not available', 'The Story of the olympic games ', 'KIERAN, John', 'Not Available', 'J. B. Lippincott', '1961', 'Not Available', 0),
('ISBN-10 : 8120306023 [paperback]', 'Introduction to electrodynamics', 'GRIFFITHS, David J.', 'Not Available', 'Prentice Hall of India', '1995', 'Not Available', 0),
('ISBN-10: 0471926736', 'Ocean margin processes in global change', 'null', 'Not Available', 'Wiley', '1991', 'Not Available', 0),
('ISBN-10: 9054855983 [paperback]', 'Fluvial sequences of the Maas ', 'BERG, Meindert Wiebe van den', 'Not Available', 'Landbouwuniversiteit Wageningen', '1996', 'Not Available', 0),
('ISBN-10: 9061914086', 'Hurricanes, storms and tornadoes ', 'NALIVKIN, D. V.', 'Not Available', 'A. A. Balkema', '1983', 'Not Available', 0),
('ISBN-10: 979404265X [paperback]', 'Dasar-dasar atletik', 'MCMANE, Fred', 'Not Available', 'Angkasa', '1987', 'Not Available', 0),
('ISBN-10: 9795010646 [paperback]', 'Atletik ', 'BERNHARD, Gunter', 'Not Available', 'Dahara Prize', '1993', 'Not Available', 0),
('ISBN-10: 979859147X [paperback]', 'Kandungan organik tumbuhan tinggi', 'ROBINSON, Trevor', 'Not Available', 'Penerbit ITB', '1995', 'Not Available', 0),
('ISBN-13: 9772089529000 [paperback]', 'Statistik kriminal 2018', 'null', 'Not Available', 'Badan Pusat Statistik', '2018', 'Not Available', 0),
('ISBN-13: 9772303244009 [paperback]', 'Statistik politik 2018', 'null', 'Not Available', 'Badan Pusat Statistik', '2018', 'Not Available', 0),
('ISBN-13: 9772622801006 [paperback]', 'Indeks perilaku anti korupsi 2018', 'null', 'Not Available', 'Badan Pusat Statistik', '2018', 'Not Available', 0),
('ISBN-13: 9780415370424 [paperback]', 'HYDROLOGY in practice', 'SHAW, Elizabeth M.', 'Not Available', 'Spon Press', '2011', 'Not Available', 0),
('ISBN-13: 9780416334401 [paperback] ; ISBN-10: 0416334407 [paperback]', 'Climate, history and the modern world', 'LAMB, H. H.', 'Not Available', 'Methuen', '1985', 'Not Available', 0),
('ISBN-13: 9780874841497 ; ISBN-10: 0874841496', 'JUDGING and coaching women\'s gymnastics', 'null', 'Not Available', 'Mayfield', '1972', 'Not Available', 0),
('ISBN-13: 9781555818920', 'Molecular genetics of bacteria', 'null', 'Not Available', 'ASM Press', '2013', 'Not Available', 0),
('ISBN-13: 9783639315776 [paperback]', 'Rainfall thresholds and slope stability assessments ', 'ALLO, Emba Tampang', 'Not Available', 'VDM Verlag Dr. Muller', '2010', 'Not Available', 0),
('ISBN-13: 9786022911340 [paperback]', 'The Lean startup', 'RIES, Eric', 'Not Available', 'Bentang', '2015', 'Not Available', 0),
('ISBN-13: 9786024382353 [paperback]', 'Kajian lanjutan indeks ketimpangan gender 2017', 'null', 'Not Available', 'Badan Pusat Statistik', '2017', 'Not Available', 0),
('ISBN-13: 9789027716767 ; ISBN-10: 9027716765', 'PALAEOCLIMATIC research and models ', 'null', 'Not Available', 'D. Reidel', '1983', 'Not Available', 0),
('ISSN 0126.3668', 'Buletin statistik perdagangan luar negeri', 'null', 'Not Available', 'Biro Pusat Statistik', '1995', 'Not Available', 0),
('ISSN 0216-0714', 'Hasil inventarisasi dan eksplorasi sumberdaya mineral Indonesia', 'DJAELANI, Endang', 'Not Available', 'Direktorat Sumberdaya Mineral', '1999', 'Not Available', 0),
('ISSN 0216-0765', 'Eksplorasi endapan batubara', 'SUMAATMADJA, Eddy R.', 'Not Available', 'Direktorat Sumberdaya Mineral', '1996', 'Not Available', 0),
('ISSN 0216-5813', 'Laporan tahunan Direktorat Sumberdaya Mineral tahun anggaran 1987/1988 = Annual report of Directorate of Mineral Resources Indonesia', 'null', 'Not Available', 'Direktorat Sumberdaya Mineral', '1988', 'Not Available', 0),
('ISSN 1411-7355', 'Statistik ekonomi keuangan daerah Jawa Barat, Januari 2019 = regional economic financial statistic, January 2019', 'null', 'Not Available', 'Bank Indonesia', '2019', 'Not Available', 0),
('ISSN 2423-9992', 'JAEA R&D review 2018-19', 'null', 'Not Available', 'Japan Atomic Energy Agency', '2018', 'Not Available', 0),
('ISSN: 0126-4745', 'Buletin ringkas BPS, Januari 1987', 'null', 'Not Available', 'Biro Pusat Statistik', '1987', 'Not Available', 0),
('null', 'Buku materi pokok pengajaran remedial dan pengayaan bahasa Indonesia', 'SIAHAAN, Bistok A.', 'Not Available', 'Penerbit Karunika - Universitas Terbuka', '1986', 'Not Available', 0);

-- --------------------------------------------------------

--
-- Table structure for table `jurnal`
--

CREATE TABLE `jurnal` (
  `IDJurnal` int(11) NOT NULL,
  `Judul_Jurnal` varchar(255) NOT NULL,
  `Pengarang_Jurnal` varchar(255) NOT NULL,
  `Abstraksi` varchar(255) NOT NULL,
  `Status_e-jurnal` varchar(255) NOT NULL,
  `Tahun_Terbit_Jurnal` date NOT NULL,
  `Kategori_Juenal` varchar(255) NOT NULL,
  `Stok_Jurnal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `NIM` int(11) UNSIGNED NOT NULL,
  `Nama_Mahasiswa` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman`
--

CREATE TABLE `peminjaman` (
  `IDPeminjaman` int(11) UNSIGNED NOT NULL,
  `Tanggal_Peminjaman` date NOT NULL,
  `Tanggal_Pengembalian` date DEFAULT NULL,
  `Status_Pengembalian` tinyint(1) NOT NULL DEFAULT '0',
  `Denda` int(11) DEFAULT NULL,
  `ISBN` varchar(255) NOT NULL,
  `NIM` int(11) UNSIGNED NOT NULL,
  `IDJurnal` int(11) NOT NULL,
  `Aktif` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`ISBN`);

--
-- Indexes for table `jurnal`
--
ALTER TABLE `jurnal`
  ADD PRIMARY KEY (`IDJurnal`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`NIM`);

--
-- Indexes for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD PRIMARY KEY (`IDPeminjaman`),
  ADD KEY `Buku` (`ISBN`),
  ADD KEY `Jurnal` (`IDJurnal`),
  ADD KEY `Mahasiswa` (`NIM`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `Buku` FOREIGN KEY (`ISBN`) REFERENCES `buku` (`ISBN`),
  ADD CONSTRAINT `Jurnal` FOREIGN KEY (`IDJurnal`) REFERENCES `jurnal` (`IDJurnal`),
  ADD CONSTRAINT `Mahasiswa` FOREIGN KEY (`NIM`) REFERENCES `mahasiswa` (`NIM`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
