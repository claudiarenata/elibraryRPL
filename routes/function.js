//framework
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const request = require('request')
const moment = require('moment')


app.use(bodyparser.json());	
app.use(bodyparser.urlencoded({ extended: false }));

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

function notifikasi(nim,callback){
    checkactive(nim,function(err,ret){
        if (err) {
            console.log(err)
        } else {
            if (ret==true){
                try{
                    let query = 'SELECT * From peminjaman WHERE NIM = ? and Status_pengembalian = "0"'
                    connection.query(query,nim, function (error, results, fields) {
                        if (error) throw error;
                        //console.log(results);
                        let currentdate = moment(new Date())
                        let Tanggal_Pengembalian = moment(results[0].Tanggal_Pengembalian)
                        if (checktanggal(currentdate,Tanggal_Pengembalian)){
                            let statuspinjam = 1;
                            let day = difftanggal(currentdate,Tanggal_Pengembalian);
                            let telat = true;
                            let denda = 1000*day;
                            let message = "terlambat mengembalikan";
                            let ret = {
                                'statuspinjam':statuspinjam,
                                'day':day,
                                'telat':telat,
                                'denda':denda,
                                'message':message
                            }
                            callback (error,ret);
                        }
                        else {
                            let statuspinjam = 1;
                            let day = difftanggal(Tanggal_Pengembalian,currentdate);
                            let telat = false;
                            let denda = 0;
                            let message = "masih belum telat";
                            let ret = {
                                'statuspinjam':statuspinjam,
                                'day':day,
                                'telat':telat,
                                'denda':denda,
                                'message':message
                            }
                            callback (error,ret);
                        }
                    })
                } catch(err) {
                    console.log(err)
                    res.json({"response-code":500,"message":"Internal server error"})
                }
            } else { //ret==false
                let statuspinjam = 0
                let message = 'belum meminjam'
                let ret = {
                    'statuspinjam':statuspinjam,
                    'message':message
                }
                callback(error,ret)
            } 
        }
    })

}


app.get('/',function(req,res){
    // pinjam('book',18217204,1161092425913,function(error,ret){
    //     if (error){
    //         console.log('haha')
    //     } else {
    //         res.send(ret)
    //         console.log('ini lo result nya '+ret)
    //     }
    // })

    notifikasi(18217204,function(error,ret){
        if (error){
            console.log('haha')
        } else {
            res.send(ret)
            console.log('ini lo result nya '+ret)
        }
    })
    // let nim=18217204
    // let query = 'SELECT * From peminjaman WHERE NIM = ? and Status_pengembalian = "0"'
    //                 connection.query(query,nim, function (error, results, fields) {
    //                     if (error) throw error;
    //                     //console.log(results);
    //                     let retr = results[0].Tanggal_Pengembalian
    //                     console.log(retr)
    //                 })
                        

    // checkactive(18216308,function(err,ret){
    //     if (err) {
    //         console.log('ha')
    //     }
    //     else {
    //         if (ret==false){
    //             res.json({"response-code":200,"message":"berhasilberhasilhore"})
    //         }
    //         else {
    //             res.json({"response-code":200,"message":"hihihihih"})
    //         }
    //     }
    // })
})

module.exports = app;
