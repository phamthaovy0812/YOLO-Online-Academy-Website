import  express from  'express';
import Student from "../controllers/student.controller.js";
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
    .get(Student.GetAllStudent)
  //  .post(jsonParser,Student.CreateStudent);
  
export default  router ;  