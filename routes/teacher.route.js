import  express from  'express';
import  Teacher  from  '../controllers/teacher.controller.js';

const router = express.Router();

// router 
//     .route('/')
//     .get(Teacher.GetAllTeacher);
    
router.get("/homepage",(req,res)=>{
    res.render('Teacher/home');
})
router.get("/edit",(req,res)=>{
    res.render("Teacher/editCourse");
})
router.get("/myListCourses",(req,res)=>{
    res.render("Teacher/myListCourses");
})
export default  router ;  