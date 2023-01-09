import  express from  'express';
import Student from "../controllers/student.controller.js";
import bodyParser from 'body-parser';
import CourseModel from '../models/Course.model.js';
import Students from '../models/student.model.js';
var jsonParser = bodyParser.json();
const router = express.Router();

router 
    .route('/')
      .get(Student.GetAllStudent);
router    
    .route('/:id')
      .patch(jsonParser, Student.UpdateStudent);
// router    
//     .route('/wishlist/delete')
//         .post(jsonParser, Student.DeleteWishList);
// router    
//     .route('/wishlist/update')
//         .post(jsonParser, Student.UpdateWishList);

router    
    .route('/rating')
        .post(jsonParser, Student.UpdateRating);
router    
.route('/enroll')
    .post(jsonParser, Student.UpdateEnrollCourse);
            
            
router.post("/addWishLists/:id", Student.addWishList);
  
router.get("/viewlesson/:id",Student.detailCourseUI);
router.post("/gocourse",async (req, res)=>{
    console.log(req.body._id)
    res.redirect(`/api/students/viewlesson/${req.body._id}`)
})


router.get("/Category", Student.categoryUI);

router.get("/courseDetailBought",(req,res)=>{
    res.render('Student/courseDetailBought');
})
router.get("/category",(req,res)=>{
    res.render('Student/Category');
})

router.get("/mylearning",(req,res)=>{
    res.render('vwStudent/mylearning');
})
router.get("/home",Student.topCourse);
router.get("/profile", Student.profile);
router.get("/shopping",Student.payCourse);

router.get('/viewlesson',(req,res)=>{
    res.render('Student/viewlesson')
})

router.get('/shopping',(req,res)=>{
    res.render('vwStudent/shopping')
})


export default router;  
