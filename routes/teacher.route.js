import  express from  'express';
import  Teacher  from  '../controllers/teacher.controller.js';
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

// router 
//     .route('/')
//     .get(Teacher.GetAllTeacher);
    
router.get("/homepage",(req,res)=>{
    res.render('Teacher/home');
})
router.get("/editCourse",(req,res)=>{
    res.render("Teacher/editCourse");
})
router.get("/createCourse",(req,res)=>{
    res.render('Teacher/createCourse');
})
router.get("/myListCourses",(req,res)=>{
    res.render("Teacher/myListCourses");
})
export default router ;