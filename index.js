// framework	
const express = require('express')	
const bodyparser = require('body-parser')
const cors = require('cors')	
const app = express()
const path = require('path')	
const router=express.Router()

let userRoute = require('./routes/users')
let adminRoute = require('./routes/admin')
let func = require('./routes/function')

router.get('/buku', function (req,res){
    res.sendFile(path.join(__dirname+'/adminpage.html'))
})

app.get('/adminpage.css', function (req,res){
    res.sendFile(path.join(__dirname+'/adminpage.css'))
}); 

app.get('/logo-itb-512px.png', function (req,res){
    res.sendFile(path.join(__dirname+'/logo-itb-512px.png'))
}); 

app.get('/adminpage.js', function (req,res){
    res.sendFile(path.join(__dirname+'/adminpage.js'))
}); 

app.use('/',router)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });

app.use(bodyparser.json());	
app.use(userRoute)
app.use(adminRoute)
app.use(cors({origin:'*'}))

app.listen(3000)
