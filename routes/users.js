
//framework
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const http = require('http')
const moment = require('moment')

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

//get book by id
app.get('/book/:id', function (req, res) {	
	try{
		var query = 'SELECT * From book WHERE ISBN = ?'
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

//get jurnal by id
app.get('/jurnal/:id', function (req, res) {	
	try{
		var query = 'SELECT * From jurnal WHERE IDJurnal = ?'
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

//Get Peminjaman by id
app.get('/peminjaman/:id', function (req, res) {	
	try{
		var query = 'SELECT * From peminjaman WHERE IDPeminjaman = ?'
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

app.put('/peminjaman',function(req,res){
	try{
		var id = req.query.id
		var query = 'UPDATE peminjaman SET Status_Pengembalian=? WHERE IDPeminjaman=?'
		var data = [req.body.Status_Pengembalian, id]
		connection.query(query, data, function (error, results, fields){
			if (error) throw error;
			//console.log(results);
			res.json({"response-code":200,"message":"Record successfully updated"});
		})
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//pengecekan jumlah stok
function checkstock(stock){
    return (stock>0);
}

//mengecek apakah user sedang melakukan peminjaman
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

//fungsi pinjam
function pinjam (tipe,nim,id) {
    if (tipe=='book'){
        var hasil = http.get('/book/'+id)
        var stock = hasil[0].stock_buku
        if (checkstock(stock)) {
            if (checkactive(nim)){
                //set tanggal peminjaman pakai moment
                //set tanggal pengembalian pakai moment
                //http.post()
            }
        }
    } else if (tipe=='jurnal'){
        var hasil = http.get('/jurnal/'+id)
        var stock = hasil[0].stock_jurnal
        if (checkstock(stock)) {
            if (checkactive(nim)){
                //set tanggal peminjamam pakai moment
                //set tanggal pengembalian pakai moment
                //http.post()
            }
        }
    }
}

//cek tanggal dengan tipe moment
function checktanggal(currentdate,Tanggal_Pengembalian){
    return (currentdate).isAfter(Tanggal_Pengembalian);
}

//perbedaan tanggal dengan tipe moment
function difftanggal(tanggalA,tanggalB){
    return (tanggalA.diff(tanggalB,'days'))
}

function notifikasi(currentdate,Tanggal_Pengembalian,callback){
    if (checktanggal(currentdate,Tanggal_Pengembalian)){
        var day = difftanggal(currentdate,Tanggal_Pengembalian);
        var telat = true;
        var message = "";
    }
    else {
        var day = difftanggal(Tanggal_Pengembalian,currentdate);
        var telat = false;
        var message = "";
    }
    let ret = {
        'day':day,
        'telat':telat,
        'message':message
    }
    callback (ret);
}

function jangandihapus(){
    var dateToday = new Date()
    var dateA = moment(dateToday).format('YYYY-MM-DD')

    var c = moment(dateA)

    var dateB = moment(dateToday).add(7,'days').format('YYYY-MM-DD')

    var d = moment(dateB)
    console.log('hari ini '+ dateA)
    console.log('sekian hari ini '+ dateB)
    console.log('ini dia '+c)
    console.log('ini dia d '+d)
    console.log(d.isAfter(c))
    console.log(d.diff(c,'days'))
}

//get nya pake like
//function add tanggal today
//function add tanggal pengembalian

module.exports = app;
