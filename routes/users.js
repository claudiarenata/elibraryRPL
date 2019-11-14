
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
            let query = 'SELECT * FROM buku WHERE Judul_Buku = ?'
		    connection.query(query, (judul), function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json(results);
            })
        }
        else if ((judul==null)&&(author!=null)){
            let query = 'SELECT * FROM buku WHERE Pengarang = ?'
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
            let query = 'SELECT * FROM jurnal WHERE Judul_Jurnal = ?'
		    connection.query(query, (judul), function (error, results, fields) {
			    if (error) throw error;
			    //console.log(results);
			    res.json(results);
            })
        }
        else if ((judul==null)&&(author!=null)){
            let query = 'SELECT * FROM jurnal WHERE Pengarang_Jurnal = ?'
		    connection.query(query, (author), function (error, results, fields) {
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



module.exports = app;
