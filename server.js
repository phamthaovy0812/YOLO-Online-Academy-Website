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
import activate_session from './middlewares/session.js';
import activate_locals from './middlewares/localStorage.js';

const app = express();


//const morgan=require("morgan");
//const handlebars= require("express-handlebars");process
const port =  process.env.PORT || 3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);


// var handlebars = require('handlebars');
// var helpers = require('handlebars-helpers')({
//   handlebars: handlebars
// });

// // or for a specific collection
// var math = helpers.math({
//   handlebars: handlebars
// });

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

activate_session(app);
//
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
}));

app.use(express.static("public/img"));
app.use(express.static("public"));

app.set('view engine', 'hbs');
app.set('views', './views');
//app.set('views', path.join(__dirname,'views/layouts/Teacher'));

//console.log('Path:',path.join(__dirname,'views/Teacher'));
app.use(rout); // router root 

activate_locals(app);
// app.get("/",(req,res)=>{
//    // console.log("->>>>",req.session.authAccount)
//     res.render("vwAccount/home");
//   })



//item tes
app.get("*", (req, res) => {
  res.render("Error/404", { layout: false }); // layout false là để k hiển thị header và footer
})

app.listen(port, () => {
    console.log( `Example app listening at http://localhost:${port}/api/accounts/home`)
})
// Run :npm start
