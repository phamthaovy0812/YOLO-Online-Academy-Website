import express from 'express';
import CourseRoute from './Course.route.js';
import UserRoute from './User.route.js';
import CategoryRoute from './Category.route.js';
import LessonRoute from './Lesson.route.js';
import ChapterRoute from './Chapter.route.js';
import SubcategoryRoute from './Subcategory.route.js';

const router = express.Router();
router.use('/api/user', UserRoute);
router.use('/api/courses', CourseRoute);
router.use('/api/categories', CategoryRoute);
router.use('/api/lesson', LessonRoute);
router.use('/api/chapter', ChapterRoute);
router.use('/api/subcategory', SubcategoryRoute);

export default router;