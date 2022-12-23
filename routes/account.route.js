import express from  'express';
import Account  from  '../controllers/account.controller.js';
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
        .get(Account.GetAllAccount)
        .post(jsonParser,Account.CreateAccount)
router
    .route('/:id')
        .delete(Account.DeleteAccount)
        .get( Account.GetOneAccount);
    

export default router ;  