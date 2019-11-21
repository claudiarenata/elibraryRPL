//framework
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const request = require('request')
const moment = require('moment')
const cors = require('cors')
const func = require('./function')

app.use(bodyparser.json());	
app.use(bodyparser.urlencoded({ extended: false }));

//database	
let mysql = require('mysql');	
let connection = mysql.createConnection({	
  host     : 'localhost',	
  user     : 'root',	
  password : 'adiera',	
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
		let data = req.body
		//data
		let ISBN = data.ISBN
		let IDJurnal = data.IDJurnal
		let NIM = data.NIM
		
		//Peminjaman Buku
		if ((ISBN!=null)&&(IDJurnal==null)){
			request('http://localhost:3000/book/'+ISBN,function(error,response,body){
				if (!error && response.statusCode == 200){
					// console.log(body)
					let bod = JSON.parse(body)
					let stock = bod[0].Stok_Buku
					if (checkstock(stock)){ //checkstock=true
						checkactive(NIM,function(err,ret){
							if (err) {
								console.log(err)
							} else { //not checkactive error
								if (ret==false){ //checkactive=false
									let dateToday = new Date()
									let dateA = moment(dateToday).format('YYYY-MM-DD')
									let dateB = moment(dateToday).add(7,'days').format('YYYY-MM-DD')
									var query = 'INSERT INTO peminjaman (Tanggal_Peminjaman, Tanggal_Pengembalian, ISBN, NIM) VALUES (?,?,?,?)'
									var instance = [dateA,dateB,ISBN,NIM]
									connection.query(query, instance, function(error, results, fields){
										if (error) throw error;
										//console.log(results);
										let stok = stock-1
										let url = 'http://localhost:3000/book?ISBN='+ISBN 
										request({
											method: "PUT",
											url: url,
											body:{
												Stok_Buku: stok
											},
											json:true
										},function(err,result,body){
											if (err) {
												console.log(err)
											}
											else {
												res.json({"response-code":200,"message":"Record successfully added"})
											}
										})
									})
								} else { //checkactive == true
									res.json({"response-code":200,"message":"tidak boleh pinjam karena lagi pinjam buku/jurnal lain"})
								}
							}
						})
					} else { //checkstock=false
						res.json({"response-code":200,"message":"stok habis"})
					}
                } else { 
					res.json({"response-code":500,"message":"Internal server error"})
				}
			})
		} else if ((ISBN==null)&&(IDJurnal!=null)){ //Peminjaman Jurnal
			request('http://localhost:3000/jurnal/'+IDJurnal,function(error,response,body){
				if (!error && response.statusCode == 200){
					// console.log(body)
					let bod = JSON.parse(body)
					let stock = bod[0].Stok_Jurnal
					if (checkstock(stock)){ //checkstock=true
						checkactive(NIM,function(err,ret){
							if (err) {
								console.log(err)
							} else { //not checkactive error
								if (ret==false){ //checkactive=false
									let dateToday = new Date()
									let dateA = moment(dateToday).format('YYYY-MM-DD')
									let dateB = moment(dateToday).add(7,'days').format('YYYY-MM-DD')
			
									var query = 'INSERT INTO peminjaman (Tanggal_Peminjaman, Tanggal_Pengembalian, IDJurnal, NIM) VALUES (?,?,?,?)'
									var instance = [dateA,dateB,IDJurnal,NIM]
									connection.query(query, instance, function(error, results, fields){
										if (error) throw error;
										//console.log(results);
										let stok = stock-1
										let url = 'http://localhost:3000/jurnal?IDJurnal='+IDJurnal
										request({
											method: "PUT",
											url: url,
											body:{
												Stok_Jurnal: stok
											},
											json:true
										},function(err,result,body){
											if (err) {
												console.log(err)
											}
											else {
												res.json({"response-code":200,"message":"Record successfully added"})
											}
										})
									})
								} else { //checkactive == true
									res.json({"response-code":200,"message":"tidak boleh pinjam karena lagi pinjam buku/jurnal lain"})
								}
							}
						})
					} else { //checkstock=false
						res.json({"response-code":200,"message":"stok habis"})
					}
                } else { 
					res.json({"response-code":500,"message":"Internal server error"})
				}
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

//notifikasi
app.get('/notifikasi',function(req,res){
	try{
		var NIM = req.query.nim
		
		checkactive(NIM,function(err,ret){
			if (err) {
				console.log(err)
				throw error;
			} else {
				if (ret==true){
					try{
						let query = "SELECT * From peminjaman WHERE NIM =? AND Status_Pengembalian =0"
						connection.query(query,NIM, function (error, results, fields) {
							if (error) throw error;
							let currentdate = moment(new Date())
							let Tanggal_Pengembalian = moment(results[0].Tanggal_Pengembalian)
							if (checktanggal(currentdate,Tanggal_Pengembalian)){
								let day = difftanggal(currentdate,Tanggal_Pengembalian);
								let denda = 1000*day;
								res.json({
									"statuspinjam":1,
									"day":day,
									"telat":true,
									"denda":denda,
									"message":"terlambat mengembalikan"
								})
							} else {
								let day = difftanggal(Tanggal_Pengembalian,currentdate);
								res.json({
									"statuspinjam":1,
									"day":day,
									"telat":false,
									"denda":0,
									"message":"masih belum telat"
								})
							}
						})
					} catch(err) {
						console.log(err)
						res.json({"response-code":500,"message":"Internal server error"})
					}
				} else { //ret==false
					res.json({"statuspinjam":0,"message":"belum meminjam"})
				} 
			}
		})
	}catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//Login admin
app.post('/login/admin',function(req,res){
	try{
		var data = req.body
		//data username dan password
		let username = data.username
		let password = data.password
		
		if ((data==null)||(username==null)){
		
		} else{
			var query = 'SELECT * FROM data_user WHERE Tipe_Akun="Pegawai" AND Username = ? AND Password=?'
			connection.query(query, [username,password], function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    let data = results
			    if (data == {}){
					res.json({"response-code":401,"message":"Unauthorized"});
				} else {
					res.json({"response-code":200,"message":"Authorized"});
				}
            })
		}
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//login user
app.post('/login/user',function(req,res){
	try{
		var data = req.body
		//data username dan password
		let username = data.username
		let password = data.password
		
		if ((data==null)||(username==null)){
		
		} else{
			var query = 'SELECT * FROM data_user WHERE Tipe_Akun="Mahasiswa" AND Username = ? AND Password=?'
			connection.query(query, [username,password], function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    let data = results
			    if (data == {}){
					res.json({"response-code":401,"message":"Unauthorized"});
				} else {
					res.json({"response-code":200,"message":"Authorized"});
				}
            })
		}
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//Login 
//BLOM JALAN
app.get('/login',function(req,res){
	try{
		var tipe = req.query.tipe
		
		if (tipe = 'admin'){
			req.get({url: 'http://localhost:3000/login/admin', headers: req.headers});

			processRequest(req);
			res.setHeader('Content-Type', 'application/json');
			res.send('Req OK');
		} if (tipe = 'user'){
			req.get({url: 'http://localhost:3000/login/user', headers: req.headers});

			processRequest(req);
			res.setHeader('Content-Type', 'application/json');
			res.send('Req OK');
		}
	} catch(err){
		console.log(err)
		res.json({"response-code":500,"message":"Internal server error"})
	}
});

//isEmpty
let isEmpty = (val) => {
    let typeOfVal = typeof val;
    switch(typeOfVal){
        case 'object':
            return (val.length == 0) || !Object.keys(val).length;
            break;
        case 'string':
            let str = val.trim();
            return str == '' || str == undefined;
            break;
        case 'number':
            return val == '';
            break;
        default:
            return val == '' || val == undefined;
    }
};

//pengecekan jumlah stok
function checkstock(stock){
    return (stock>0);
}

//mengecek apakah user sedang melakukan peminjaman
function checkactive(nim,callback){
    try{
		let query = 'SELECT * From peminjaman WHERE NIM = ? and Status_pengembalian = "0"'
		connection.query(query,nim, function (error, results, fields) {
			if (error) throw error;
            //console.log(results);
            let ret = !(isEmpty(results))
            callback(error,ret)
		})
	} catch(err) {
		console.log(err)
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

module.exports = app;
