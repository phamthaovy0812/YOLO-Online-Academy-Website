import  express from  'express';
import Admin from "../controllers/admin.controller.js";
import bodyParser from 'body-parser';
import Account  from  '../controllers/account.controller.js';
import AccountModel from '../models/account.model.js';
var jsonParser = bodyParser.json();
const router = express.Router();

// router 
//     .route('/')
//         .get(Admin.GetAllAdmin);
// router    
//     .route('/:id')
//         .patch(jsonParser, Admin.UpdateAdmin);

// router.get("/categoryCensor", Admin.categoryCensor);
router.get("/createTeacher", Admin.createAccountTeacher);
router.post("/createTeacher", async(req,res)=>{
  req.body.role=1;
  req.body.avatar="https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png";
  AccountModel.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).then(function (doc) {
    if (doc) {
        
      res.render("/api/admins/createTeacher");
      console.log("account or Email exist");
    } else {
        Account.CreateAccount(req.body)
        res.redirect("/api/admins/teacherCensor");
    }
  });
});

router.get("/teacherCensor", Admin.teacherCensor);
router.get("/studentCensor", Admin.studentCensor);
// router.get("/courseCensor", Adm);
router.post("/blockStudent/:id", Admin.BlockStudent);
router.post("/blockTeacher/:id", Admin.BlockTeacher);

// router.get("/courseCensor",(req,res)=>{
//     res.render('Admin/courseCensor');
// })

// router.get("/studentCensor",(req,res)=>{
//     res.render('Admin/studentCensor');
// })
// router.get("/teacherCensor",(req,res)=>{
//     res.render('Admin/teacherCensor');
// })

router.get("/+", Admin.createCategory);
router.post("/createCategory", Admin.postCategory);
router.get("/getAllCategory", Admin.getAllCategory);
router.post("/deleteCat/:id", Admin.deleteCat);
router.post("/editCat/:id", Admin.editCat);
router.get("/getAllCourse", Admin.getAllCourse);
router.post("/blockCourse/:id", Admin.blockCourse);
router.get("/getCourseBlock", Admin.getCourseBlock);
router.get("/getAllComment", Admin.getAllComment);


router.get("*", (req, res) => {
  res.render("Error/404", { layout: false }); // layout false là để k hiển thị header và footer
})
//adsd

export default  router ;