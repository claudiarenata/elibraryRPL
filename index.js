//framework	
const express = require('express')	
const bodyparser = require('body-parser')	
const app = express()	

var userRoute = require('./routes/users')

app.use(bodyparser.json());	
app.use(userRoute)
 
app.listen(3000)
