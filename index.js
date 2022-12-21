import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import rout from './routes/index.js';
import db from './utils/db.js'
const app = express()
const port = 3000;

db.run();
app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser())
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
//