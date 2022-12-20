import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import rout from './routes/index.js';

import path from 'path'; // thu vien path de chuyen duong dan thu muc
import { fileURLToPath } from 'url';
//const morgan=require("morgan");
//const handlebars= require("express-handlebars");
const app = express();
const port = 3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);


app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser())

// khai bao engine voi ten hbs
app.engine('hbs', engine({
    // defaultLayout: 'main.hbs'
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
  
///// page 404
app.get("/404",(req,res)=>{
    res.render("Error/404",{ layout: false }); // layout false là để k hiển thị header và footer
})

app.get('/login',(req, res)=> {
    res.render('vwAccount/login', { layout: false });
  });
// Page SignUp
app.get("/signup",(req,res)=>{
    res.render("vwAccount/signup",{ layout: false });
  })
// Page Home
app.get("/",(req,res)=>{
    res.render("vwAccount/home");
  })



/*
//headerHome test
app.get("/home",(req,res)=>{
    res.render("layouts/partials/HeaderHome");
  })
//header test
app.get("/header",(req,res)=>{
    res.render("layouts/partials/Header");
  })
//footer test
app.get("/footer",(req,res)=>{
    res.render("layouts/partials/Footer");
  })
*/

app.listen(port, () => {
    console.log( `Example app listening at http://localhost:${port}`)
})
// Run :npm start