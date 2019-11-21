//framework
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const request = require('request')
const moment = require('moment')


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


module.exports.isEmpty = isEmpty;
module.exports.checkactive = checkactive;
module.exports.checkstock = checkstock;
module.exports.checktanggal = checktanggal;
module.exports.difftanggal = difftanggal;
