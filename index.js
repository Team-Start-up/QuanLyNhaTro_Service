const express = require('express')
const app = express()
// const server = require("http").Server(app);
// const io = require("socket.io").listen(server);
const parser = require('body-parser').json()
const cors = require('cors');

app.use(parser)
app.use(cors());

const {authenticate} = require('./libs/authenticte') 
require('./libs/dbconnect')

const authRouter = require('./router/auth.router')

app.use('/auth',authRouter)

const PORT = 8080
app.listen(PORT,()=> console.log(`Server star on port ${PORT}`))