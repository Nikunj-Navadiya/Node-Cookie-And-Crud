const express = require('express');
const path = require('path');

const port = 8000;

const app = express();

const db = require('./config/db')

const cookieParser = require('cookie-parser');

app.set('view engine','ejs');   

app.use(cookieParser());

app.use(express.urlencoded());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(express.static(path.join(__dirname, "public")));


app.use('/',require('./routes/indexRoute'));


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`); 
})