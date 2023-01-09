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
            
            
router.post("/addWishList", async (req, res) => {
    try {
        const infor = req.body;
        console.log(infor);

        res.redirect("/")
    } catch (error) {
        
    }
    
})
  
router.get("/courseDetail",(req,res)=>{
    res.render('Student/courseDetail');
})

router.get("/viewlesson/:id",Student.detailCourseUI);



router.get("/Category", Student.categoryUI);

router.get("/courseDetailBought",(req,res)=>{
    res.render('Student/courseDetailBought');
})
router.get("/category",(req,res)=>{
    res.render('Student/Category');
})
router.get("/home",Student.topCourse);
router.get("/profile", Student.profile);
router.get("/shopping",Student.payCourse);

router.get('/viewlesson',(req,res)=>{
    res.render('Student/viewlesson')
})


export default router;  
