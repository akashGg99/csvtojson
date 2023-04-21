require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const csvtojson = require('csvtojson')


app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use(multer().any);


//connecting to mongodb
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(()=>console.log("connected to mongodb..."))
.catch((err)=> console.log(err));



app.put('/upload', (req,res)=>{
    csvtojson()
    .fromFile()
    .then((json)=>console.log(json));


});



app.listen(process.env.PORT || 3000, ()=>console.log("running on PORT",process.env.PORT || "3000"));