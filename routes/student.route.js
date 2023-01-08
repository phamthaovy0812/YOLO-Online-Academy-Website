import  express from  'express';
import Student from "../controllers/student.controller.js";
import bodyParser from 'body-parser';
import CourseModel from '../models/Course.model.js';
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
      .get(Student.GetAllStudent);
router    
    .route('/:id')
      .patch(jsonParser, Student.UpdateStudent);

  
router.get("/courseDetail/:id",  async (req,res)=>{
 
    const course = await CourseModel.find().lean();
    const user = req.session.authAccount;


    CourseModel.findOne({ _id: req.params.id }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).exec(function (err, story) {
        if (err) return (err);
        res.render("Student/courseDetail", { course: story, chapter: story.chapter, user: user });});


})
router.get("/courseDetailBought",(req,res)=>{
    res.render('Student/courseDetailBought');
})
router.get("/DevelopmentCategory",(req,res)=>{
    res.render('Student/DevelopmentCategory');
})


router.get("/home", Student.topCourse);
export default router;  