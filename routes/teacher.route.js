import  express from  'express';
import  Teacher  from  '../controllers/teacher.controller.js';

const router = express.Router();

router 
    .route('/')
    .get(Teacher.GetAllTeacher);
    

export default  router ;  