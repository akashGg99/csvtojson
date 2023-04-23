require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const csvtojson = require('csvtojson')


app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use(multer().any);


//connecting to mongodb
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(()=>console.log("connected to mongodb..."))
.catch((err)=> console.log(err));

app.get("/home",(req,res)=>{
    console.log("recieved req")
    return res.send("hey")
})

app.post('/upload', async (req,res)=>{
    console.log(req.file)

    const jsonData= await csvtojson().fromFile(req.file)
    console.log(jsonData)
     return res.end()

});



app.listen(process.env.PORT || 3001, ()=>console.log("running on PORT",process.env.PORT || "3001"));