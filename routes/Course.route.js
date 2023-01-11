import express from 'express';
import Course from '../controllers/Course.controller.js'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/img")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage })

import multer from 'multer'
const CourseRoute = express.Router();
CourseRoute.post('/create', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'videoDemo', maxCount: 1 }])  , Course.create);
CourseRoute.post('/update/:id',upload.fields([{ name: 'image', maxCount: 1 }, { name: 'videoDemo', maxCount: 1 }]),Course.update);
CourseRoute.get('/getAllCourses', Course.getAllCourse);
CourseRoute.get('/getCourse/:id', Course.getCourse);
CourseRoute.delete('/delete/:id', Course.deleteCourse);
CourseRoute.get('/show', Course.show);
CourseRoute.get('/getCourseManyRating', Course.getCourseManyRating);
CourseRoute.get('/getCourseImpress', Course.getCourseImpress);
CourseRoute.get('/updateScoreAndRevire', Course.updateScoresandReview);
CourseRoute.get('/getNewCreate', Course.getNewCreate);
CourseRoute.get('/getCourseLastEnroll', Course.getCourseLastEnroll);
// CourseRoute.get('/getNumberStudentEnroll', Course.getNumberStudentEnroll);
CourseRoute.post('/addView', Course.addView);
CourseRoute.get('/getClickManyView', Course.getClickManyView);
CourseRoute.get('/getSubcategory', Course.getSubcategory);







export default CourseRoute;