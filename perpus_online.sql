-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2019 at 04:33 PM
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
  `ISBN` varchar(13) NOT NULL,
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
('1161092425913', 'Teruslah cintai negeri ini ', 'null', 'Not Available', 'Biro Komunikasi dan Layanan Informasi Kemenkeu RI', '2017', 'Not Available', 0),
('1266144105303', 'Laporan tengah tahun Institut teknologi Bandung tahun anggaran 1983/1984', 'null', 'Not Available', 'Sekretariat Bidang Pengembangan ITB', '1984', 'Not Available', 0),
('1793336797544', 'Laporan pelaksanaan Kuliah Kerja Nyata (KKN) Universitas Jenderal Soedirman tahun 1982/1983', 'null', 'Not Available', 'Pusat Pengabdian pada Masyarakat Universitas Jenderal Soedirman', '1983', 'Not Available', 0),
('2092493127297', 'Introduction to electrodynamics', 'GRIFFITHS, David J.', 'Not Available', 'Prentice Hall of India', '1995', 'Not Available', 0),
('2147483647', 'The Story of the olympic games ', 'KIERAN, John', 'Not Available', 'J. B. Lippincott', '1961', 'Not Available', 0),
('2324121476198', 'Laporan pelaksanaan Kuliah Kerja Nyata IKIP Semarang 1987/1988', 'null', 'Not Available', 'Pusat Pengabdian Pada Masyarakat IKIP Semarang', '1988', 'Not Available', 0),
('2761238342203', 'Laporan pelaksanaan Kuliah Kerja Nyata IKIP Ujung Pandang angkatan XV 1987/1988', 'null', 'Not Available', 'Pusat Pengabdian Masyarakat IKIP Ujung Pandang', '1987', 'Not Available', 0),
('2920502260535', 'Laporan pelaksaan Kuliah Kerja Nyata (KKN) tahun 1987/1988', 'null', 'Not Available', 'Balai Pengabdian Pada Masyarakat Universitas Tanjungpura', '1988', 'Not Available', 0),
('2928619691392', 'Laporan pelaksanaan program Kuliah Kerja Nyata (K.K.N.)', 'null', 'Not Available', 'Pusat Pengabdian Pada Masyarakat Universitas Brawijaya', '1984', 'Not Available', 0),
('3099697951314', 'Wai tan kung', 'CHANG, Chih-Tung', 'Not Available', 'Tata Media', '1986', 'Not Available', 0),
('3196335189547', 'PANDUAN dan promosi PON XIII.', 'null', 'Not Available', 'Departemen Penerangan RI', '1993', 'Not Available', 0),
('3200951003165', 'Laporan pelaksanaan Kuliah Kerja Nyata Universitas Udayana tahun 1983/1984', 'null', 'Not Available', 'Panitia Pelaksana KKN UNUD', '1984', 'Not Available', 0),
('3248351596863', 'Menggerakkan ekonomi berkeadilan = driving an equitable economy ', 'null', 'Not Available', 'Kementerian Keuangan RI', '2017', 'Not Available', 0),
('3464709925143', 'LAPORAN seminar nasional teknologi tinggi dalam era tinggal landas pembangunan, 14-15 Juni 1988', 'null', 'Not Available', 'Universitas Kristen Indonesia Paulus', '1988', 'Not Available', 0),
('3500232895474', 'Laporan pelaksanan Kuliah Kerja Nyata (KKN) Universitas Riau tahun 1984/1985', 'null', 'Not Available', 'Badan Pelaksana Kuliah Kerja Nyata Universitas Riau', '1985', 'Not Available', 0),
('379240410608', 'Petunjuk lengkap softball dan baseball', 'BETHEL, Dell', 'Not Available', 'Dahara Prize', '1993', 'Not Available', 0),
('4328277930259', 'Wanita di dalam Islam', 'Mernissi, Fatima', 'Not Available', 'Penerbit Pustaka', '1994', 'Not Available', 0),
('4384918328180', 'Laporan studi keberhasilan kuliah kerja nyata Universitas Jenderal Soedirman tahun 1980/1981', 'null', 'Not Available', 'Tim Evaluasi KKN UNSOED', '1981', 'Not Available', 0),
('4387626667845', 'Laporan Kuliah Kerja Nyata Universitas Gadjah Mada 1984/1985', 'null', 'Not Available', 'Lembaga Pengabdian Pada Masyarakat UGM', '1985', 'Not Available', 0),
('4413184990160', 'Statistik kriminal 2018', 'null', 'Not Available', 'Badan Pusat Statistik', '2018', 'Not Available', 0),
('4495211134021', 'The Story of the olympic games ', 'KIERAN, John', 'Not Available', 'J. B. Lippincott', '1961', 'Not Available', 0),
('4505665510643', 'Athletic training and conditioning', 'DAYTON, O. William', 'Not Available', 'Ronald Press', '1965', 'Not Available', 0),
('4639190464612', 'Teruslah cintai negeri ini ', 'null', 'Not Available', 'Biro Komunikasi dan Layanan Informasi Kemenkeu RI', '2017', 'Not Available', 0),
('5204897754455', 'A history of East Africa', 'MARS, Zoe', 'Not Available', 'Cambridge University Press', '1972', 'Not Available', 0),
('5385109530266', 'JUDGING and coaching women\'s gymnastics', 'null', 'Not Available', 'Mayfield', '1972', 'Not Available', 0),
('5515980564317', 'Laporan pelaksanaan Kuliah Kerja Nyata Universitas Mataram tahun 1983/1984', 'null', 'Not Available', 'Badan Pelaksana KKN Universitas Mataram', '1984', 'Not Available', 0),
('5837140328192', 'Teruslah cintai negeri ini ', 'null', 'Not Available', 'Biro Komunikasi dan Layanan Informasi Kemenkeu RI', '2017', 'Not Available', 0),
('6250508674855', 'JAEA R&D review 2018-19', 'null', 'Not Available', 'Japan Atomic Energy Agency', '2018', 'Not Available', 0),
('6291052466433', 'Atletik ', 'BERNHARD, Gunter', 'Not Available', 'Dahara Prize', '1993', 'Not Available', 0),
('6308197941401', 'Buku materi pokok pengajaran remedial dan pengayaan bahasa Indonesia', 'SIAHAAN, Bistok A.', 'Not Available', 'Penerbit Karunika - Universitas Terbuka', '1986', 'Not Available', 0),
('6463054875697', 'Statistik politik 2018', 'null', 'Not Available', 'Badan Pusat Statistik', '2018', 'Not Available', 0),
('6537426440438', 'Laporan Kuliah Kerja Nyata mahasiswa Institut Pertanian Bogor 1981/9182', 'null', 'Not Available', 'Pusat Pengelolaan dan Pengembangan Kuliah Kerja Nyata LPM- IPB', '1983', 'Not Available', 0),
('6620117353481', 'Spectral well logging ', 'KUDYMOV, B. Y.', 'Not Available', 'Elsevier', '1962', 'Not Available', 0),
('6696913036712', 'Olah-raga lari berprestasi', 'YAYA Tasmaya', 'Not Available', 'Pradnya Paramita', '1984', 'Not Available', 0),
('6742642278706', 'Nationaal sport gedenkboek', 'TERWOGT, H. A. Meerum', 'Not Available', 'Koloniale Boek Centrale', '1928', 'Not Available', 0),
('6853761602885', 'Alumni Universitas Sumatera Utara 1957-1978 ini berdasarkan laporan-laporan dari fakultas-fakultas dilingkungan USU Medan.', 'null', 'Not Available', 'Biro Rektor USU', '2019', 'Not Available', 0),
('7111799610682', 'Modern bridge construction ', 'TAYLOR, F. Johnstone', 'Not Available', 'The Technical Press', '1930', 'Not Available', 0),
('7177821199010', 'Laporan pelaksanaan Kuliah Kerja Nyata Universitas Udayana tahun 1982/1983', 'null', 'Not Available', 'Panitia Pelaksana KKN UNUD', '1983', 'Not Available', 0),
('7298700734858', 'Dasar-dasar atletik', 'MCMANE, Fred', 'Not Available', 'Angkasa', '1987', 'Not Available', 0),
('7369252222886', 'Text book of petrology, volume two ', 'HATCH, F. H.', 'Not Available', 'Thomas Murby', '1957', 'Not Available', 0),
('7828082351691', 'Buletin statistik perdagangan luar negeri', 'null', 'Not Available', 'Biro Pusat Statistik', '1995', 'Not Available', 0),
('7962908358165', 'Fluvial sequences of the Maas ', 'BERG, Meindert Wiebe van den', 'Not Available', 'Landbouwuniversiteit Wageningen', '1996', 'Not Available', 0),
('8134419138758', 'Kajian ekonomi dan keuangan regional Provinsi Jawa Barat, Februari 2019', 'null', 'Not Available', 'Bank Indonesia', '2019', 'Not Available', 0),
('8142294215517', 'Indeks perilaku anti korupsi 2018', 'null', 'Not Available', 'Badan Pusat Statistik', '2018', 'Not Available', 0),
('8312828535007', 'Statistik ekonomi keuangan daerah Jawa Barat, Januari 2019 = regional economic financial statistic, January 2019', 'null', 'Not Available', 'Bank Indonesia', '2019', 'Not Available', 0),
('9016615462936', 'Kajian lanjutan indeks ketimpangan gender 2017', 'null', 'Not Available', 'Badan Pusat Statistik', '2017', 'Not Available', 0),
('913320391253', 'Laporan pelaksanaan Kuliah Kerja Nyata IKIP Ujung Pandang 1986/1987', 'null', 'Not Available', 'Pusat Pengabdian Masyarakat IKIP Ujung Pandang', '1987', 'Not Available', 0),
('9328335355296', 'MATEMATIKA pendahuluan', 'Koesmartono, Rawuh', 'Not Available', 'Penerbit ITB', '1983', 'Not Available', 0),
('93936968106', 'Laporan Pelaksanaan Kuliah Kerja Nyata Universitas Mataram 1986/1987', 'null', 'Not Available', 'Badan Pelaksanan KKN Universitas Mataram', '1986', 'Not Available', 0),
('9655164080872', 'The Lean startup', 'RIES, Eric', 'Not Available', 'Bentang', '2015', 'Not Available', 0);

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

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`NIM`, `Nama_Mahasiswa`, `Email`) VALUES
(18216308, 'TracieKris', 'TracieKris@gmail.com'),
(18216473, 'AnnadianeDarcy', 'AnnadianeDarcy@gmail.com'),
(18216692, 'RoseanneSollie', 'RoseanneSollie@gmail.com'),
(18216853, 'PhillisOnfre', 'PhillisOnfre@gmail.com'),
(18217034, 'AnaliseSkipper', 'AnaliseSkipper@gmail.com'),
(18217170, 'MaraDorian', 'MaraDorian@gmail.com'),
(18217204, 'MoyraDaven', 'MoyraDaven@gmail.com'),
(18217517, 'KissieDuff', 'KissieDuff@gmail.com'),
(18217567, 'BibbyeCary', 'BibbyeCary@gmail.com'),
(18217870, 'AgnolaDallis', 'AgnolaDallis@gmail.com');

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
  `ISBN` varchar(13) NOT NULL,
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
  ADD KEY `Jurnal` (`IDJurnal`),
  ADD KEY `Mahasiswa` (`NIM`),
  ADD KEY `ISBN` (`ISBN`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `peminjaman`
--
ALTER TABLE `peminjaman`
  ADD CONSTRAINT `ISBN` FOREIGN KEY (`ISBN`) REFERENCES `buku` (`ISBN`),
  ADD CONSTRAINT `Jurnal` FOREIGN KEY (`IDJurnal`) REFERENCES `jurnal` (`IDJurnal`),
  ADD CONSTRAINT `Mahasiswa` FOREIGN KEY (`NIM`) REFERENCES `mahasiswa` (`NIM`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
