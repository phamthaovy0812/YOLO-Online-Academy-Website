import  express from  'express';
import Student from "../controllers/student.controller.js";
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

// router 
//     .route('/')
//     .get(Student.GetAllStudent)
//   //  .post(jsonParser,Student.CreateStudent);
  
router.get("/courseDetail",(req,res)=>{
    res.render('Student/courseDetail');
})
router.get("/courseDetailBought",(req,res)=>{
    res.render('Student/courseDetailBought');
})
router.get("/DevelopmentCategory",(req,res)=>{
    res.render('Student/DevelopmentCategory');
})

export default router;  