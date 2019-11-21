# E-Library ITB - RPL

Sistem peminjaman online buku dan jurnal UPT Perpustakaan ITB (E-Library ITB) merupakan sebuah sistem yang dapat menyediakan layanan untuk peminjaman buku dan jurnal secara online. Mahasiswa dapat mencari buku sesuai keinginan dan sistem akan memberikan informasi mengenai ketersediaan stok yang dapat dipinjam. Sistem juga dapat memberikan notifikasi berupa lama waktu peminjaman dan jumlah denda apabila mahasiswa terlambat untuk mengembalikan buku/jurnal. Juga dapat dilakukan pencarian jurnal yang tersedia dalam bentuk fisik dan e-journal.

## Modul

### Admin :
* Login
* Logout
* Fungsi detail buku atau jurnal (sinopsis atau abstraksi)
* Daftar peminjaman
* Fungsi menambahkan buku atau jurnal

### User :
* Login
* Logout
* Fungsi pencarian buku atau jurnal
* Fungsi detail buku atau jurnal (sinopsis atau abstraksi)
* Fungsi melakukan peminjaman buku atau jurnal
* Notifikasi

## Penggunaan

Sebelum menggunakan aplikasi E-Library ITB, diharuskan untuk melakukan langkah-langkah berikut :

1. Install modul node.js express

```
npm install express
```

2. Dilanjutkan dengan menyalakan
MySQL dan Apache pada aplikasi xampp

3. Lakukan pengaturan terhadap database dengan mengakses localhost/phpmyadmin pada browser anda. File sql dapat diakses pada 

```
.../database/perpus_online.sql
```

4. Melakukan pengubahan konfigurasi database MYSQL anda di file yang berlokasi pada

* .../routes/*admin.js*
* .../routes/*user.js*
* .../routes/*function.js*

```
  host     : 'localhost',
  user     : '{username anda}', //default: root
  password : '{password anda}', //default: ''
  database : '{database anda}' //default: perpus_online
```

5. Untuk menjalankan aplikasi, dapat mengetik perintah dibawah ini pada command prompt atau terminal
```
npm run start
```

6. Apabila terdapat library npm yang belum tersedia, dapat melakukan perintah dibawah ini
```
npm install <nama_library>
```

7. Kemudian lakukan perintah dibawah ini untuk mengakses aplikasi pada web browser. Aplikasi akan dimulai melalui layar login.
```
http://localhost:3000/home
```

8. Untuk melakukan login, dapat memasukkan username atau nim serta password yang tersimpan pada database perpus_online (tabel data_user). Berikut merupakan contoh data untuk login yang telah terdaftar pada database :
```
NIM Mahasiswa: 18216308
Password Mahasiswa: 123456
---------------------------
Username Admin: Admin
Password Admin: admin

```
