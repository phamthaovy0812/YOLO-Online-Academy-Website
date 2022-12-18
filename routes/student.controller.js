const  express = require( 'express');
const  { GetAllStudent, CreateStudent }  = require( '../controllers/student.controller.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
    .get(GetAllStudent)
  //  .post(jsonParser,CreateStudent);

module.exports =  router ; 