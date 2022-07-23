const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8000;
const connectDB = require('./db/connectDB');
connectDB(DB_URL);

const homeRoute = require('./routes/homeRoute');
const publicPath = path.join(__dirname,'public');
console.log(publicPath);
app.use(express.urlencoded({ extended: false }));
//used for sessions
app.use(session({
    name : 'session',
    secret : 'iamsecretkey',
    resave : false,
    saveUninitialized : true,
    cookie : {maxAge : 5 * 60 *1000 }
}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.set('view engine','ejs');

app.use(express.static(publicPath));
app.use(express.static('public'));
app.use('/post', express.static(path.join(__dirname, 'public')))
app.use('/',homeRoute);


// app.get('/',(req,res)=>{
//     console.log("get started")
//     res.send("hello anihs");
// });
app.listen(PORT,()=>{
    console.log(`server started at port: ${PORT}`);
});