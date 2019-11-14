// framework	
const express = require('express')	
const bodyparser = require('body-parser')	
const app = express()	

let userRoute = require('./routes/users')
let adminRoute = require('./routes/admin')
let func = require('./routes/function')


app.use(bodyparser.json());	
app.use(userRoute)
app.use(adminRoute)
app.use(func)

app.listen(3000)
