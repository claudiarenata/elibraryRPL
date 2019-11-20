//framework
const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json());	
app.use(bodyparser.urlencoded({ extended: false }));

//database	
let mysql = require('mysql');	
let connection = mysql.createConnection({	
  host     : 'localhost',	
  user     : 'root',	
  password : '',	
  database : 'perpus_online'	
});	
	
//Database connection	
connection.connect(function(err) {	
  if (err) {	
    console.error('error connecting: ' + err.stack);	
    return;	
  }	
	
  console.log('connected as id ' + connection.threadId)	
});	

//get mahasiswa
app.get('/mahasiswa', function (req, res) {	
	try{
		connection.query('SELECT * From mahasiswa', function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//get mahasiswa by nim
app.get('/mahasiswa/:nim', function (req, res) {	
	try{
		let query = 'SELECT * From mahasiswa WHERE NIM = ?'
		connection.query(query, (req.params.nim), function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//get peminjaman
app.get('/peminjaman', function (req, res) {	
	try{
		connection.query('SELECT * From peminjaman', function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//Get Peminjaman by id
app.get('/peminjaman/:id', function (req, res) {	
	try{
		let query = 'SELECT * From peminjaman WHERE IDPeminjaman = ?'
		connection.query(query, (req.params.id), function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json(results);
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//POST Data Buku Baru
app.post('/book',function(req,res){
	try{
		let query = 'INSERT INTO buku (ISBN, Judul_Buku, Pengarang, Sinopsis, Penerbit, Tahun_Terbit, Kategori, Stok_Buku) VALUES (?,?,?,?,?,?,?,?)'
		let data = req.body
		let instance = [data.ISBN, data.Judul_Buku,data.Pengarang,data.Sinopsis, data.Penerbit, data.Tahun_Terbit, data.Kategori, data.Stok_Buku]
		connection.query(query, instance, function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json({"response-code":200,"message":"Record successfully added"})
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//POST data Jurnal Baru
app.post('/jurnal',function(req,res){
	try{
		let query = 'INSERT INTO jurnal (IDJurnal, Judul_Jurnal, Pengarang_Jurnal, Abstraksi, Status_e_jurnal, Tahun_Terbit_Jurnal, Kategori_Jurnal, Stok_Jurnal) VALUES (?,?,?,?,?,?,?,?)'
		let data = req.body
		let instance = [data.IDJurnal, data.Judul_Jurnal, data.Pengarang_Jurnal, data.Abstraksi, data.Status_e_jurnal, data.Tahun_Terbit_Jurnal, data.Kategori_Jurnal, data.Stok_Jurnal]
		connection.query(query, instance, function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			res.json({"response-code":200,"message":"Record successfully added"})
		})
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//PUT data stok buku
app.put('/book',function(req,res){
	try{
		let judul = req.query.judul
        let ISBN = req.query.ISBN
		if ((judul!=null)&&(ISBN==null)) {
            let query = 'UPDATE buku SET Stok_Buku=? WHERE Judul_Buku=?'
            let data = [req.body.Stok_Buku, judul]
		    connection.query(query, data, function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json({"response-code":200,"message":"Record successfully updated"});
            })
        }
        else if ((judul==null)&&(ISBN!=null)){
            let query = 'UPDATE buku SET Stok_Buku=? WHERE ISBN=?'
            let data = [req.body.Stok_Buku, ISBN]
		    connection.query(query, data, function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json({"response-code":200,"message":"Record successfully updated"});
            })
		}
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//PUT data stok jurnal
app.put('/jurnal',function(req,res){
	try{
		let judul = req.query.judul
        let IDJurnal = req.query.IDJurnal
		if ((judul!=null)&&(IDJurnal==null)) {
            let query = 'UPDATE jurnal SET Stok_Jurnal=? WHERE Judul_Jurnal=?'
            let data = [req.body.Stok_Jurnal, judul]
		    connection.query(query, data, function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json({"response-code":200,"message":"Record successfully updated"});
            })
        }
        else if ((judul==null)&&(IDJurnal!=null)){
            let query = 'UPDATE jurnal SET Stok_Jurnal=? WHERE IDJurnal=?'
            let data = [req.body.Stok_Jurnal, IDJurnal]
		    connection.query(query, data, function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json({"response-code":200,"message":"Record successfully updated"});
            })
		}
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//PUT data peminjaman
app.put('/peminjaman',function(req,res){
	try{
		var IDPeminjaman = req.query.IDPeminjaman
		var Status_Pengembalian = req.query.Status_Pengembalian
		var Denda = req.query.Denda
		
		if (Denda==null){
			var query = 'UPDATE peminjaman SET Status_Pengembalian=? WHERE IDPeminjaman=?'
			var data = [Status_Pengembalian,IDPeminjaman]
			connection.query(query, data, function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json({"response-code":200,"message":"Record successfully updated"});
            })
        } else {
			var query = 'UPDATE peminjaman SET Status_Pengembalian=?, Denda=? WHERE IDPeminjaman=?'
			var data = [Status_Pengembalian, Denda, IDPeminjaman]
			connection.query(query, data, function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json({"response-code":200,"message":"Record successfully updated"});
            })
		}
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//POST data Peminjaman
app.post('/peminjaman',function(req,res){
	try{
		var data = req.body
		//data ISBN/IDJurnal
		var JudulBuku = req.body.ISBN
		var JudulJurnal = req.body.IDJurnal
		
		//Peminjaman Buku
		if ((JudulBuku!=null)&&(JudulJurnal==null)){
			var query = 'INSERT INTO peminjaman (IDPeminjaman, Tanggal_Peminjaman, Tanggal_Pengembalian, ISBN, NIM) VALUES (?,?,?,?,?)'
			var instance = [data.IDPeminjaman,data.Tanggal_Peminjaman,data.Tanggal_Pengembalian,JudulBuku,data.NIM]
            connection.query('SET FOREIGN_KEY_CHECKS=0')
            connection.query(query, instance, function(error, results, fields){
				if (error) throw error;
				//console.log(results);
				res.json({"response-code":200,"message":"Record successfully added"})
			})
		} else if ((JudulBuku==null)&&(JudulJurnal!=null)){
			var query = 'INSERT INTO peminjaman (IDPeminjaman, Tanggal_Peminjaman, Tanggal_Pengembalian, IDJurnal, NIM) VALUES (?,?,?,(SELECT IDJurnal FROM jurnal WHERE Judul_Jurnal = ?),?)'
            var instance = [data.IDPeminjaman,data.Tanggal_Peminjaman,data.Tanggal_Pengembalian,[JudulJurnal],data.NIM]
            connection.query('SET FOREIGN_KEY_CHECKS=0')
			connection.query(query, instance, function(error, results, fields){
				if (error) throw error;
				//console.log(results);
				res.json({"response-code":200,"message":"Record successfully added"})
			})
		}
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

module.exports = app;