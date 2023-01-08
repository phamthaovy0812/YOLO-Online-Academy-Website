import  express from  'express';
import Student from "../controllers/student.controller.js";
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
      .get(Student.GetAllStudent);
router    
    .route('/:id')
      .patch(jsonParser, Student.UpdateStudent);

  
router.get("/courseDetail",(req,res)=>{
    res.render('Student/courseDetail');
})
router.get("/courseDetailBought",(req,res)=>{
    res.render('Student/courseDetailBought');
})
router.get("/DevelopmentCategory",(req,res)=>{
    res.render('Student/DevelopmentCategory');
})
router.get("/home",Student.topCourse);
router.get("/shopping",Student.payCourse);

export default router;  