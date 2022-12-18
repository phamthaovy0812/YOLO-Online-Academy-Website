const  express = require( 'express');
const  { GetAllAccount,CreateAccount, DeleteAccount, GetOneAccount }  = require( '../controllers/account.controller.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
        .get(GetAllAccount)
        .post(jsonParser,CreateAccount)
router
    .route('/:id')
        .delete(DeleteAccount)
        .get( GetOneAccount);
    

module.exports =  router ; 