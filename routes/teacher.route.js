import  express from  'express';
import  Teacher  from  '../controllers/teacher.controller.js';
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
    .get(Teacher.GetAllTeacher);
router    
    .route('/:id')
        .patch(jsonParser, Teacher.UpdateTeacher);    

export default  router ;  