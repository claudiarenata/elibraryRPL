
//framework
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const http = require('http')

app.use(bodyparser.json());	
app.use(bodyparser.urlencoded({ extended: false }));

//database	
var mysql = require('mysql');	
var connection = mysql.createConnection({	
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

//get buku
app.get('/book', function (req, res) {
	try{
        var judul = req.query.judul
        var author = req.query.pengarang
        if ((judul==null)&&(author==null)){
            connection.query('SELECT * From buku', function (error, results, fields) {
                if (error) throw error;
                //console.log(results);
                res.json(results);
            })
        }
        else if ((judul!=null)&&(author==null)) {
            var query = 'SELECT * FROM buku WHERE Judul_Buku = ?'
		    connection.query(query, (judul), function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json(results);
            })
        }
        else if ((judul==null)&&(author!=null)){
            var query = 'SELECT * FROM buku WHERE Pengarang = ?'
		    connection.query(query, (author), function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
                res.json(results);
            })
        }
        else {
            let ret = {
                
            }
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//get jurnal
app.get('/jurnal', function (req, res) {	
	try{
		var judul = req.query.judul
		var author = req.query.pengarang
		if ((judul==null)&&(author==null)){
            connection.query('SELECT * From jurnal', function (error, results, fields) {
                if (error) throw error;
                //console.log(results);
                res.json(results);
            })
        }
        else if ((judul!=null)&&(author==null)) {
            var query = 'SELECT * FROM jurnal WHERE Judul_Jurnal = ?'
		    connection.query(query, (judul), function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json(results);
            })
        }
        else if ((judul==null)&&(author!=null)){
            var query = 'SELECT * FROM jurnal WHERE Pengarang_Jurnal = ?'
		    connection.query(query, (author), function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
                res.json(results);
            })
        }
        else {
            let ret = {
                
            }
        }   
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
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
		var query = 'SELECT * From mahasiswa WHERE NIM = ?'
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

//Get Peminjaman
app.get('/peminjaman', function (req, res) {	
	try{
		var IDPeminjaman = req.query.IDPeminjaman
		var NIM = req.query.NIM
		if ((NIM!=null)&&(IDPeminjaman==null)){
			var query = 'SELECT * From peminjaman WHERE NIM = ?'
			connection.query(query, NIM, function (error, results, fields) {
				if (error) throw error;
				//console.log(results);
				res.json(results);
			})
		} else if ((NIM==null)&&(IDPeminjaman!=null)){
			var query = 'SELECT * From peminjaman WHERE IDPeminjaman = ?'
			connection.query(query, IDPeminjaman, function (error, results, fields) {
				if (error) throw error;
				//console.log(results);
				res.json(results);
			})
		}
	} catch(err) {
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//POST Data Buku Baru
app.post('/book',function(req,res){
	try{
		var query = 'INSERT INTO buku (ISBN, Judul_Buku, Pengarang, Sinopsis, Penerbit, Tahun_Terbit, Kategoti, Stok) VALUES (?,?,?,?,?,?,?,?)'
		var data = req.body
		var instance = [data.ISBN,data.Judul_Buku,data.Pengarang,data.Sinopsis, data.Penerbit, data.Tahun_Terbit, data.Kategori, data.Stok]
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
		var query = 'INSERT INTO jurnal (IDJurnal, Judul_Jurnal, Pengarang_Jurnal, Abstraksi, Status_e_jurnal, Tahun_Terbit_Jurnal, Kategori_Jurnal, Stok_Jurnal) VALUES (?,?,?,?,?,?,?,?)'
		var data = req.body
		var instance = [data.IDJurnal, data.Judul_Jurnal, data.Pengarang_Jurnal, data.Abstraksi, data.Status_e_jurnal, data.Tahun_Terbit_Jurnal, data.Kategori_Jurnal, data.Stok_Jurnal]
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

//POST data Peminjaman
app.post('/peminjaman',function(req,res){
	try{
		var data = req.body
		//data ISBN/IDJurnal
		var JudulBuku = req.body.JudulBuku
		var JudulJurnal = req.body.JudulJurnal
		
		//Peminjaman Buku
		if ((JudulBuku!=null)&&(JudulJurnal==null)){
			var query = 'INSERT INTO peminjaman (IDPeminjaman, Tanggal_Peminjaman, Tanggal_Pengembalian, ISBN, NIM) VALUES (?,?,?,(SELECT ISBN FROM buku WHERE Judul_Buku = ?),?)'
			var instance = [data.IDPeminjaman,data.Tanggal_Peminjaman,data.Tanggal_Pengembalian,[JudulBuku],data.NIM]
			connection.query(query, instance, function(error, results, fields){
				if (error) throw error;
				//console.log(results);
				res.json({"response-code":200,"message":"Record successfully added"})
			})
		} else if ((JudulBuku==null)&&(JudulJurnal!=null)){
			var query = 'INSERT INTO peminjaman (IDPeminjaman, Tanggal_Peminjaman, Tanggal_Pengembalian, IDJurnal, NIM) VALUES (?,?,?,(SELECT IDJurnal FROM jurnal WHERE Judul_Jurnal = ?),?)'
			var instance = [data.IDPeminjaman,data.Tanggal_Peminjaman,data.Tanggal_Pengembalian,[JudulJurnal],data.NIM]
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

//PUT data stok buku
app.put('/book',function(req,res){
	try{
		var judul = req.query.judul
        var ISBN = req.query.ISBN
		if ((judul!=null)&&(ISBN==null)) {
            var query = 'UPDATE buku SET Stok_Buku=? WHERE Judul_Buku=?'
            var data = [req.body.Stok_Buku, judul]
		    connection.query(query, data, function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json({"response-code":200,"message":"Record successfully updated"});
            })
        }
        else if ((judul==null)&&(ISBN!=null)){
            var query = 'UPDATE buku SET Stok_Buku=? WHERE ISBN=?'
            var data = [req.body.Stok_Buku, ISBN]
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

function checkstock(stock){
    return (stock>0);
}

function checkactive(nim){
    try{
		var query = 'SELECT * From peminjaman WHERE NIM = ? and Status_pengembalian = "1"'
		connection.query(query,nim, function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
            var res = results;
            return (res!=null)
		})
	} catch(err) {
		console.log(err)
    }
}

function pinjam (tipe,nim,id) {
    if (tipe=='book'){
        var hasil = http.get('/book/'+id)
        var stock = hasil[0].stock_buku
        if (checkstock(stock)) {
            if (checkactive(nim)){
                //ini buat post ke data peminjaman
            }
        }
    } else if (tipe=='jurnal'){
        var hasil = http.get('/jurnal/'+id)
        var stock = hasil[0].stock_jurnal
        if (checkstock(stock)) {
            if (checkactive(nim)){
                //ini buat post ke data peminjaman
            }
        }
    }
}

//function check tanggal

module.exports = app;
