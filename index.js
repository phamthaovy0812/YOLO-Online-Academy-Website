import express from 'express';
import cookieParser from 'cookie-parser';
import rout from './routes/index.js';
import  cors  from 'cors';
import path from 'path'; 
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import sendEmail from './middlewares/EmailVerification.js'


const app = express();


//const morgan=require("morgan");
//const handlebars= require("express-handlebars");
const port = 3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);


app.use('/public', express.static('public'));
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {  
    console.log('DB connection successful');
  });

app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser())
app.use(cors());


// sendEmail();


//
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.use(express.static("public/img"));
app.use(express.static("public"));

app.set('view engine', 'hbs');
app.set('views', './views');
//app.set('views', path.join(__dirname,'views/layouts/Teacher'));

//console.log('Path:',path.join(__dirname,'views/Teacher'));
app.use(rout); // router root 



/*
app.get("/",(req,res)=>{
    return res.send("haha đây là dòng test");
   
  })
*/

// Non Account

///// page 404
app.get("/404",(req,res)=>{
    res.render("Error/404",{ layout: false }); // layout false là để k hiển thị header và footer
})
//login

// Page SignUp

// Page Home
app.get("/",(req,res)=>{
    res.render("vwAccount/home");
  })

//Search
app.get('/search',(req, res)=> {
  res.render('vwAccount/search');
});

//item test
app.get('/item',(req, res)=> {
  res.render('cources/item');
});

app.get("/viewlesson", (req, res) => {
  res.render("Teacher/test");
})

//Student

// Edit Profile

app.get("/edit",(req,res)=>{
  res.render("vwStudent/editprofile");
})
//profile page
app.get("/profile",(req,res)=>{
  res.render("vwStudent/profile");
})
//my learning page
app.get("/mylearning",(req,res)=>{
  res.render("vwStudent/mylearning");
})


app.listen(port, () => {
    console.log( `Example app listening at http://localhost:${port}`)
})
// Run :npm start
