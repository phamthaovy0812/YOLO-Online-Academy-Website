const  express = require( 'express');
const  { GetAllTeacher }  = require( '../controllers/teacher.controller.js');

const router = express.Router();

router 
    .route('/')
    .get(GetAllTeacher);
    

module.exports =  router ; 