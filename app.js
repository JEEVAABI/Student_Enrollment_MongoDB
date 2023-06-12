require('dotenv').config()

const express = require("express");
const app = express();
const PORT = 3400;

const student_router = require('./routes/students')

const mongoose = require('mongoose');
const multer = require('multer');
app.use('./uploads', express.static('uploads'));

app.use(express.json())
//mongoose.connect('mongodb://127.0.0.1/students')
mongoose.connect(process.env.DB_URL)


const db =mongoose.connection
db.on('error',(errorMessage) => console.log(errorMessage))
db.once('open',()=>console.log('Connection established'))

app.get('/',(request,response) =>{
    response.send('app.js')
})

app.use('/api/v1/students',student_router)
app.listen(PORT)