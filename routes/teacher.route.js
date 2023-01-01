import  express from  'express';
import  Teacher  from  '../controllers/teacher.controller.js';
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

<<<<<<< HEAD
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
=======
router 
    .route('/')
    .get(Teacher.GetAllTeacher);
router    
    .route('/:id')
        .patch(jsonParser, Teacher.UpdateTeacher);    

>>>>>>> 4bb4409023d94eb73285c31b791a53bc3fcd3c5e
export default  router ;  