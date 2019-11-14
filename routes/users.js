
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

//get buku
app.get('/book', function (req, res) {
	try{
        let judul = req.query.judul
        let author = req.query.pengarang
        if ((judul==null)&&(author==null)){
            connection.query('SELECT * From buku', function (error, results, fields) {
                if (error) throw error;
                //console.log(results);
                res.json(results);
            })
        }
        else if ((judul!=null)&&(author==null)) {
            let query = 'SELECT * FROM buku WHERE Judul_Buku LIKE ?'
		    connection.query(query, ('%'+judul+'%'), function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json(results);
            })
        }
        else if ((judul==null)&&(author!=null)){
            let query = 'SELECT * FROM buku WHERE Pengarang LIKE ?'
		    connection.query(query, ('%'+author+'%'), function (error, results, fields) {
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

//get jurnal
app.get('/jurnal', function (req, res) {	
	try{
		let judul = req.query.judul
		let author = req.query.pengarang
		if ((judul==null)&&(author==null)){
            connection.query('SELECT * From jurnal', function (error, results, fields) {
                if (error) throw error;
                //console.log(results);
                res.json(results);
            })
        }
        else if ((judul!=null)&&(author==null)) {
            let query = 'SELECT * FROM jurnal WHERE Judul_Jurnal LIKE ?'
		    connection.query(query, ('%'+judul+'%'), function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json(results);
            })
        }
        else if ((judul==null)&&(author!=null)){
            let query = 'SELECT * FROM jurnal WHERE Pengarang_Jurnal LIKE ?'
		    connection.query(query, ('%'+author+'%'), function (error, results, fields) {
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

//get jurnal by id
app.get('/jurnal/:id', function (req, res) {	
	try{
		let query = 'SELECT * From jurnal WHERE IDJurnal = ?'
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

//get book by id
app.get('/book/:id', function (req, res) {	
	try{
		let query = 'SELECT * From buku WHERE ISBN = ?'
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

// //PUT data peminjaman
// app.put('/peminjaman',function(req,res){
// 	try{
// 		var IDPeminjaman = req.query.IDPeminjaman
// 		var Status_Pengembalian = req.query.Status_Pengembalian
// 		var Denda = req.query.Denda
		
// 		if (Denda==null){
// 			var query = 'UPDATE peminjaman SET Status_Pengembalian=? WHERE IDPeminjaman=?'
// 			var data = [Status_Pengembalian,IDPeminjaman]
// 			connection.query(query, data, function (error, results, fields) {
// 			    if (error) throw error;
// 			    //console.log(results);
// 			    res.json({"response-code":200,"message":"Record successfully updated"});
//             })
//         } else {
// 			var query = 'UPDATE peminjaman SET Status_Pengembalian=?, Denda=? WHERE IDPeminjaman=?'
// 			var data = [Status_Pengembalian, Denda, IDPeminjaman]
// 			connection.query(query, data, function (error, results, fields) {
// 			    if (error) throw error;
// 			    //console.log(results);
// 			    res.json({"response-code":200,"message":"Record successfully updated"});
//             })
// 		}
// 	} catch(err){
// 		console.log(err)
// 		res.json({"response-code":500,"message":"Internal server error"})
// 	}
// });



module.exports = app;
