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

//fungsi pinjam
function pinjam (tipe,nim,id,callback) {
    if (tipe=='book'){
        let hasil = request('http://localhost:3000/book/'+id,function(error,response,body){
            if (!error && response.statusCode == 200){
                // console.log(body)
                let bod = JSON.parse(body)
                let stock = bod[0].Stok_Buku
                if (checkstock(stock)){ //checkstock=true
                    checkactive(nim,function(err,ret){
                        if (err) {
                            console.log(err)
                        } else { //not checkactive error
                            if (ret==false){ //checkactive=false
                                let dateToday = new Date()
                                let dateA = moment(dateToday).format('YYYY-MM-DD')
                                let dateB = moment(dateToday).add(7,'days').format('YYYY-MM-DD')
                                let jsonobj = {
                                    'IDPeminjaman':126,
                                    'Tanggal_Peminjaman':dateA,
                                    'Tanggal_Pengembalian':dateB,
                                    'NIM':nim,
                                    'ISBN':id,
                                    'IDJurnal':null
                                }
                                request({
                                    url:"http://localhost:3000/peminjaman",
                                    method:"POST",
                                    json:true,
                                    body:jsonobj
                                }, function(error,response,body){
                                    if (!error && response.statusCode==200){
                                        let jsonobj = {
                                            'Stok_Buku':stock-1
                                        }
                                        request({
                                            url:"http://localhost:3000/book?ISBN="+id,
                                            method:"PUT",
                                            json:true,
                                            body:jsonobj
                                        },function(error,response,body){
                                            let ret=response
                                            callback(error,ret)
                                        })
                                    }
                                })
                            }
                            else { //checkactive == true
                                let ret = {
                                    "response-code":200,
                                    "message":"tidak boleh pinjam karena lagi pinjam buku/jurnal lain"
                                }
                                callback(error,ret)
                            }
                        }
                    })
                } else { //checkstock=false
                    let ret = {
                        "response-code":200,
                        "message":"stok habis"
                    }
                    callback(error,ret)
                }
            } else { 
                console.log(error)
                let ret = {
                    message:"error request book"
                }
                callback(error,ret)
            }
        })
        
    } else if (tipe=='jurnal'){
        let hasil = request('http://localhost:3000/jurnal/'+id,function(error,response,body){
            if (!error && response.statusCode == 200){
                // console.log(body)
                let bod = JSON.parse(body)
                let stock = bod[0].Stok_Jurnal
                if (checkstock(stock)){ //checkstock=true
                    checkactive(nim,function(err,ret){
                        if (err) {
                            console.log(err)
                        } else { //not checkactive error
                            if (ret==false){ //checkactive=false
                                let dateToday = new Date()
                                let dateA = moment(dateToday).format('YYYY-MM-DD')
                                let dateB = moment(dateToday).add(7,'days').format('YYYY-MM-DD')
                                let jsonobj = {
                                    'IDPeminjaman':126,
                                    'Tanggal_Peminjaman':dateA,
                                    'Tanggal_Pengembalian':dateB,
                                    'NIM':nim,
                                    'ISBN':null,
                                    'IDJurnal':id
                                }
                                request({
                                    url:"http://localhost:3000/peminjaman",
                                    method:"POST",
                                    json:true,
                                    body:jsonobj
                                }, function(error,response,body){
                                    if (!error && response.statusCode==200){
                                        let jsonobj = {
                                            'Stok_Jurnal':stock-1
                                        }
                                        request({
                                            url:"http://localhost:3000/jurnal?IDJurnal="+id,
                                            method:"PUT",
                                            json:true,
                                            body:jsonobj
                                        },function(error,response,body){
                                            let ret=response
                                            callback(error,ret)
                                        })
                                    }
                                })
                            }
                            else { //checkactive == true
                                let ret = {
                                    "response-code":200,
                                    "message":"tidak boleh pinjam karena lagi pinjam buku/jurnal lain"
                                }
                                callback(error,ret)
                            }
                        }
                    })
                } else { //checkstock=false
                    console.log(error)
                    let ret = {
                        message:"error request book"
                    }
                    callback(error,ret)
                }
            } else { 
                console.log(error)
                let ret = {
                    message:"error request jurnal"
                }
                callback(error,ret)
            }
        })
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
    pinjam('book',18217567,1161092425913,function(error,ret){
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