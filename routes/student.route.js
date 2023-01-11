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

router.post("/remove/:id",Student.removeWishlist);

router.get("/mylearning",(req,res)=>{
    res.render('vwStudent/mylearning');
})
router.get("/home",Student.topCourse);
router.get("/profile", Student.profile);
// router.get("/shopping",Student.payCourse);

router.get('/viewlesson',(req,res)=>{
    res.render('Student/viewlesson')
})

router.get('/shopping',(req,res)=>{
    console.log(req.session.authAccount.detail.courses_enroll)
    res.render('vwStudent/shopping',{paycourse:req.session.authAccount.detail.courses_enroll, isLogin: req.session.auth,
        acc: req.session.authAccount,})
})

router.get('/wishlist',async (req,res)=>{
   
    const user = req.session.authAccount;
    const listCours=[];
    let empty=false;
    const userModel = await Students.findOne({ "id_account": user.detail.id_account }).lean();
    if(user){
        if (JSON.stringify(userModel.wishlist)=="[]"){
            empty=true;
        }
        res.render('vwStudent/wishlist', {
            userid: user.detail, paycourse: userModel.wishlist, empty: empty, isLogin: req.session.auth,
            acc: req.session.authAccount })
    }
    else 
    {
        res.render('Error/NoAuthen')
    }
  
})

router.get("*", (req, res) => {
    res.render("Error/404", { layout: false }); // layout false là để k hiển thị header và footer
  })


export default router;