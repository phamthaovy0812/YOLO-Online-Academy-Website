import express from  'express';
import Login  from  '../middlewares/Authen.js';
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
        .post(jsonParser,Login)

    

export default router ;  