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

export default router;  