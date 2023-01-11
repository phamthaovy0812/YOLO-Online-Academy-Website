import express from 'express';
import CourseRoute from './Course.route.js';
import UserRoute from './User.route.js';
import CategoryRoute from './Category.route.js';
import LessonRoute from './Lesson.route.js';
import ChapterRoute from './Chapter.route.js';
import SubcategoryRoute from './Subcategory.route.js';
import AccountRoute from './account.route.js';
import TeacherRoute from './teacher.route.js';
import StudentRoute from './student.route.js';
import AdminRoute from './admin.route.js';
import AuthenRoute from './authen.js';

const router = express.Router();
router.use('/api/user', UserRoute);
router.use('/api/courses', CourseRoute);
router.use('/api/categories', CategoryRoute);
router.use('/api/lesson', LessonRoute);
router.use('/api/chapter', ChapterRoute);
router.use('/api/subcategory', SubcategoryRoute);
router.use('/api/accounts', AccountRoute); 
router.use('/api/students', StudentRoute); 
router.use('/api/teachers', TeacherRoute); 
router.use('/api/admins', AdminRoute); 
router.use('/api/login', AuthenRoute);
//item tes
router.get("*", (req, res) => {
    res.render("Error/404", { layout: false }); // layout false là để k hiển thị header và footer
})


export default router;