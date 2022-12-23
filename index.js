import express from 'express';

import cookieParser from 'cookie-parser';
import rout from './routes/index.js';
import  cors  from 'cors';
import path from 'path'; 
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

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

// khai bao engine voi ten hbs
app.engine('hbs', engine({
    // defaultLayout: 'main.hbs'
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.use(express.static("public/img"));
app.set('view engine', 'hbs');
app.set('views', './views');
//app.set('views', path.join(__dirname,'views/layouts/Teacher'));

//console.log('Path:',path.join(__dirname,'views/Teacher'));
app.use(rout); // router root 

app.listen(port, () => {
    console.log( `Example app listening at http://localhost:${port}`)
})
// Run :npm start