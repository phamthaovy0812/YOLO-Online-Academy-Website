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
router    
    .route('/wishlist/delete')
        .post(jsonParser, Student.DeleteWishList);
router    
    .route('/wishlist/update')
        .post(jsonParser, Student.UpdateWishList);

router    
    .route('/rating')
        .post(jsonParser, Student.UpdateRating);
router    
.route('/enroll')
    .post(jsonParser, Student.UpdateEnrollCourse);
            
            

  
router.get("/courseDetail/:id",  async (req,res)=>{
 
    const course = await CourseModel.find().lean();
    const user = req.session.authAccount;


    CourseModel.findOne({ _id: req.params.id }).lean().populate({ path: 'chapter', populate: { path: 'lessons' } }).exec(function (err, story) {
        if (err) return (err);
        res.render("Student/courseDetail", { course: story, chapter: story.chapter, user: user });});

    })

    
router.get("/courseDetail",(req,res)=>{
    res.render('Student/courseDetail');
})


router.get("/Category", Student.categoryUI);

router.get("/courseDetailBought",(req,res)=>{
    res.render('Student/courseDetailBought');
})
router.get("/category",(req,res)=>{
    res.render('Student/Category');
})


router.get("/home", Student.topCourse);
export default router;  