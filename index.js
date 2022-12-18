const express = require( 'express');
const { engine }  = require( 'express-handlebars');
const cookieParser  = require( 'cookie-parser');
const rout  = require( './routes/index.js');
const AccountRoute  = require(  './routes/account.route.js');
const TeacherRoute = require('./routes/teacher.controller');
const StudentRoute = require('./routes/student.controller');
const  cors   = require( 'cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express()
const port = 4000;

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

app.use('/api/accounts', AccountRoute); 
app.use('/api/students', StudentRoute); 
app.use('/api/teachers', TeacherRoute); 

app.engine('hbs', engine({
    // defaultLayout: 'main.hbs'
    extname: 'hbs',
    defaultLayout: 'main'
}));


app.set('view engine', 'hbs');
app.set('views', './views');
app.use(rout); // router root 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
// Run :npm start 