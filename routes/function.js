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
		let query = 'SELECT * From peminjaman WHERE NIM = ? and Status_pengembalian = "1"'
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

//fungsi pinjam
function pinjam (tipe,nim,id,callback) {
    if (tipe=='book'){
        let hasil = request('http://localhost:3000/book/'+id,function(error,response,body){
            if (!error && response.statusCode == 200){
                // console.log(body)
                let bod = JSON.parse(body)
                stock = bod[0].Stok_Buku
                if (!(checkstock(stock))){ //checkstock=true
                    checkactive(nim,function(err,ret){
                        if (err) {
                            console.log(err)
                        } else {
                            if (ret==false){
                                let dateToday = new Date()
                                let dateA = moment(dateToday).format('YYYY-MM-DD')
                                let dateB = moment(dateToday).add(7,'days').format('YYYY-MM-DD')
                                let ret = {
                                    'idpeminjaman':123,
                                    'tanggal_peminjaman':dateA,
                                    'tanggal_pengembalian':dateB,
                                    'NIM':nim,
                                    'ISBN':id
                                }
                                callback(err,ret)
                            }
                            else {
                                callback(error,ret)
                            }
                        }
                    })
                }
                // if (checkstock(stock)){
                //     return 
                // } else {
                //     console.log('hihihihi')
                // }
            } else { 
                console.log(error)
            }
        })
        
        // let stock = hasil.stock_buku
        // if (checkstock(stock)) {
        //     if (checkactive(nim)){
        //         //set tanggal peminjaman pakai moment
        //         //set tanggal pengembalian pakai moment
        //         //http.post()
        //         //http.put() set stockbuku berkurang 1
        //         return (hasil)
        //         console.log('ini berhasil wak')
        //     } else {
        //         return (stock)
        //     }
    //     }
    // } else if (tipe=='jurnal'){
    //     let hasil = http.get('/jurnal/'+id)
    //     let stock = hasil[0].stock_jurnal
    //     if (checkstock(stock)) {
    //         if (checkactive(nim)){
    //             //set tanggal peminjamam pakai moment
    //             //set tanggal pengembalian pakai moment
    //             //http.post()
    //             //http.put() set stockjurnal berkurang 1
    //             return('ahahaha') 
    //         } else {
    //             return('hihihi')
    //         }
    //     }
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
        let day = difftanggal(currentdate,Tanggal_Pengembalian);
        let telat = true;
        let message = "";
    }
    else {
        let day = difftanggal(Tanggal_Pengembalian,currentdate);
        let telat = false;
        let message = "";
    }
    let ret = {
        'day':day,
        'telat':telat,
        'message':message
    }
    callback (ret);
}


//testing
function jangandihapus(){
    let dateToday = new Date()
    let dateA = moment(dateToday).format('YYYY-MM-DD')

    let c = moment(dateA)

    let dateB = moment(dateToday).add(7,'days').format('YYYY-MM-DD')

    let d = moment(dateB)
    console.log('hari ini '+ dateA)
    console.log('sekian hari ini '+ dateB)
    console.log('ini dia '+c)
    console.log('ini dia d '+d)
    console.log(d.isAfter(c))
    console.log(d.diff(c,'days'))
}

app.get('/',function(req,res){
    pinjam('book',18216308,1161092425913,function(error,ret){
        if (error){
            console.log('haha')
        } else {
            res.send(ret)
            console.log('ini lo result nya '+ret)
        }
    })


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
//get nya pake like
//function add tanggal today
//function add tanggal pengembalian