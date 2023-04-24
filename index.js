require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const csvtojson = require('csvtojson')
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(multer().any());

//creating a upload dir using multer and save files there...
const upload = multer({ dest: 'uploads/' })


//connecting to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("connected to mongodb..."))
    .catch((err) => console.log(err));


// adding the multer destiantion middleware for single file upload..
// upload.single("fieldname").. fieldname of file sent from frontend

app.post('/convert', upload.single('csvfile'), async (req, res) => {      
    try {
        // console.log(req.file.filename)                     //tip: filename & fieldname are seperate.. filename is AUTO.
        const filepath = `uploads/${req.file.filename}`    //file is saved by filename not fieldname(given by us in FE)

        const jsonData = await csvtojson().fromFile(filepath)
        // console.log(jsonData)

        //deleting the file after conversion...
        fs.unlinkSync(filepath)
        // fs.unlink(filepath, (err)=>console.log(err))

        return res.send(jsonData)
    }
    catch (err) { res.status(500).send({ msg: err.message }) }

});


app.listen(process.env.PORT || 3001, () => console.log("running on PORT", process.env.PORT || "3001"));
