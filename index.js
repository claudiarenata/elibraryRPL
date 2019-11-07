const express = require('express')
const app = express()

//database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'perpus_online'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
 
app.get('/', function (req, res) {
  res.send('Hello World')
  connection.query('SELECT * From buku', function (error, results, fields) {
	  if (error) throw error;
	  console.log(results);
	// error will be an Error if one occurred during the query
	// results will contain the results of the query
	// fields will contain information about the returned results fields (if any)
  });
})
 
app.listen(3000)
