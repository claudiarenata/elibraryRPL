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
    res.sendFile(path.join(__dirname+'/public/html/adminpage.html'))
})

app.get('/adminpage.css', function (req,res){
    res.sendFile(path.join(__dirname+'/public/css/adminpage.css'))
}); 

app.get('/firstpage.css', function (req,res){
    res.sendFile(path.join(__dirname+'/public/css/firstpage.css'))
}); 

app.get('/login.css', function (req,res){
    res.sendFile(path.join(__dirname+'/public/css/login.css'))
}); 


app.get('/logo-itb-512px.png', function (req,res){
    res.sendFile(path.join(__dirname+'/public/image/logo-itb-512px.png'))
}); 

app.get('/adminpage.js', function (req,res){
    res.sendFile(path.join(__dirname+'/public/js/adminpage.js'))
}); 

app.get('/firstpage.js', function (req,res){
    res.sendFile(path.join(__dirname+'/public/js/firstpage.js'))
}); 

app.get('/login.js', function (req,res){
    res.sendFile(path.join(__dirname+'/public/js/login.js'))
}); 

app.get('/jquery.cookie.js', function (req,res){
    res.sendFile(path.join(__dirname+'/public/js/jquery.cookie.js'))
}); 

app.use('/',router)

// here you set that all templates are located in `/views` directory
app.set('views', __dirname + '/views');

// here you set that you're using `ejs` template engine, and the
// default extension is `ejs`
app.set('view engine', 'ejs');


app.get('/adminpage', function(req,res){
    res.sendFile(path.join(__dirname+'/public/html/adminpage.html'))
})

app.get('/userpage', function(req,res){
    res.sendFile(path.join(__dirname+'/public/html/firstpage.html'))
})

app.get('/home', function(req,res){
    res.sendFile(path.join(__dirname+'/public/html/login.html'))
})

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
