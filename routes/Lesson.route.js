import express from 'express';
import Lesson from '../controllers/Lesson.controller.js'
import multer from 'multer'
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./public/video")
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const upload = multer({ storage: storage })

const LessonRoute = express.Router();
LessonRoute.post('/create', upload.single('video'),Lesson.create); // render view here
LessonRoute.post('/update/:id', upload.single('video'),Lesson.update);
LessonRoute.post('/delete/:id', Lesson.delete); //);x
LessonRoute.get('/getAllLesson', Lesson.getAllLesson); //);
LessonRoute.get('/getLesson/:id', Lesson.getLesson);  

export default LessonRoute;