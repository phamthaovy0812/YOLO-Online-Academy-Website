import  express from  'express';
import Admin from "../controllers/admin.controller.js";
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json();
const router = express.Router();

// router 
//     .route('/')
//         .get(Admin.GetAllAdmin);
// router    
//     .route('/:id')
//         .patch(jsonParser, Admin.UpdateAdmin);

// router.get("/categoryCensor", Admin.categoryCensor);
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

router.get("/createCategory", Admin.createCategory);
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


export default  router ;