//framework
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const func = require('./function')
const cors = require('cors')
const moment = require('moment')
const request = require('request')

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

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
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
		let IDPeminjaman = req.query.IDPeminjaman
		
		let query = 'SELECT * From peminjaman WHERE IDPeminjaman=?'
		connection.query(query,IDPeminjaman, function (error, results, fields) {
			if (error) throw error;
			//console.log(results);
			let currentdate = moment(new Date())
			let Tanggal_Pengembalian = moment(results[0].Tanggal_Pengembalian)
			let Status_Pengembalian = results[0].Status_Pengembalian
			
			var ISBN = results[0].ISBN
			var IDJurnal = results[0].IDJurnal
			
			if ((ISBN!=null)&&(IDJurnal==null)){
				var tipe = 'buku'
			} else if ((ISBN==null)&&(IDJurnal!=null)){
				var tipe = 'jurnal'
			}
			
			if (Status_Pengembalian==0){
				if (func.checktanggal(currentdate,Tanggal_Pengembalian)){
					let day = func.difftanggal(currentdate,Tanggal_Pengembalian);
					let Denda = 1000*day;
					var query = 'UPDATE peminjaman SET Status_Pengembalian=?, Denda=? WHERE IDPeminjaman=?'
					let status_kembali = 1
					var data = [status_kembali, Denda, IDPeminjaman]
					connection.query(query, data, function (error, results, fields) {
						if (error) throw error;
						//console.log(results);
						if (tipe == 'buku'){
							tambahStok(tipe,ISBN,function(err,ret){
								if (err){
									console.log(err)
								} else {
									res.json(ret)
								}
							})
						} else if (tipe == 'jurnal'){
							tambahStok(tipe,IDJurnal,function(err,ret){
								if (err){
									console.log(err)
								} else {
									res.json(ret)
								}
							})
						}
					})
				} else {
					var query = 'UPDATE peminjaman SET Status_Pengembalian=? WHERE IDPeminjaman=?'
					let status_kembali = 1
					var data = [status_kembali,IDPeminjaman]
					connection.query(query, data, function (error, results, fields) {
			    		if (error) throw error;
			    		//console.log(results);
			    		if (tipe == 'buku'){
							tambahStok(tipe,ISBN,function(err,ret){
								if (err){
									console.log(err)
								} else {
									res.json(ret)
								}
							})
						} else if (tipe == 'jurnal'){
							tambahStok(tipe,IDJurnal,function(err,ret){
								if (err){
									console.log(err)
								} else {
									res.json(ret)
								}
							})
						}
					})
				} 
			} else {
				res.json({"response-code":200,"message":"Book/Journal already returned"})
			}

		})
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

function tambahStok(tipe, id, callback){
	if (tipe == 'buku'){
		request('http://localhost:3000/book/'+id,function(error,response,body){
			if (!error && response.statusCode == 200){
				// console.log(body)
				let bod = JSON.parse(body)
				let stock = bod[0].Stok_Buku
				stock++;
				
				let url = 'http://localhost:3000/book?ISBN='+id
				request({
					method: "PUT",
					url: url,
					body:{Stok_Buku: stock},
					json:true
				},function(err,result,body){
					if (err) {
						onsole.log(err)
					} else {
						let ret = ({"response-code":200,"message":"Record successfully updated"})
						callback(error,ret)
					}
				})
			} else {
				let ret = error
				callback(error,ret)
			}
		})
	} else if (tipe == 'jurnal'){
		request('http://localhost:3000/jurnal/'+id,function(error,response,body){
			if (!error && response.statusCode == 200){
				// console.log(body)
				let bod = JSON.parse(body)
				let stock = bod[0].Stok_Jurnal
				stock++;
				
				let url = 'http://localhost:3000/jurnal?IDJurnal='+id
				request({
					method: "PUT",
					url: url,
					body:{Stok_Jurnal: stock},
					json:true
				},function(err,result,body){
					if (err) {
						console.log(err)
					} else {
						let ret = ({"response-code":200,"message":"Record successfully updated"})
						callback(error,ret)
					}
				})
			} else {
				let ret = error
				callback(error,ret)
			}
		})
	} else {
		let ret = ({"response-code":500,"message":"Internal Server Error"})
		callback(error,ret)
	}
}
				
module.exports = app;
