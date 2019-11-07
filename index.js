//framework
const express = require('express')
const app = express()

//random
const random = require('random')
var randomname = require('random-name')

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
 
  console.log('connected as id ' + connection.threadId);
});

//Insert mahasiswa
function insertMahasiswa(){
	//variable
	var nim = random.int(min = 18216001, max = 18218045)
	var name = randomname.first().concat(randomname.middle())
	var email = name.concat('@gmail.com')
	
	//looping
	var i;
	for (i = 0; i < 10; i++) {
		connection.query("INSERT INTO mahasiswa (NIM,Nama_Mahasiswa,Email) Values (?,?,?)",[nim,name,email], function (error, results, fields) {
			if (error) throw error;
			console.log(results);
			// error will be an Error if one occurred during the query
			// results will contain the results of the query
			// fields will contain information about the returned results fields (if any)
		});
		nim = random.int(min = 18216001, max = 18218045)
		name = randomname.first().concat(randomname.middle())
		email = name.concat('@gmail.com')
	}
} 
 
app.get('/', function (req, res) {
  res.send('Hello World')
  insertMahasiswa()
  connection.query('SELECT * From buku', function (error, results, fields) {
	  if (error) throw error;
	  console.log(results);
	// error will be an Error if one occurred during the query
	// results will contain the results of the query
	// fields will contain information about the returned results fields (if any)
  });
})
 
app.listen(3000)
