import express from 'express';
import Teacher from '../controllers/teacher.controller.js';
import bodyParser from 'body-parser';
import multer from 'multer'
var jsonParser = bodyParser.json();
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img/A&V")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage })
router 
    .route('/')
    .get(Teacher.GetAllTeacher);

router.get("/homepage",Teacher.homepage);
router.get("/edit", Teacher.editCourse);
router.get("/edit/:id", Teacher.editCourseDetail);
router.post("/edit/:id", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'videoDemo', maxCount: 1 }]), Teacher.handleUpdateCourse);
router.get("/myListCourses",Teacher.myListCourses );
router.get("/postCourse", Teacher.viewCreateCourse);
router.post("/postCourse", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'videoDemo', maxCount: 1 }]), Teacher.createCourse);

router.get("*", (req, res) => {
    res.render("Error/404", { layout: false }); // layout false là để k hiển thị header và footer
  })

export default router;  
