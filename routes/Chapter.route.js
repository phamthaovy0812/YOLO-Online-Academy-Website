import express from 'express';
import Chapter from '../controllers/Chapter.controller.js'


const ChapterRoute = express.Router();
ChapterRoute.post('/create', Chapter.create);
ChapterRoute.post('/update/:id', Chapter.update);
ChapterRoute.post('/delete/:id', Chapter.deleteChapter);
ChapterRoute.get('/getAllChapter', Chapter.getAllChapter);
ChapterRoute.get('/getChapter/:id', Chapter.getChapter);


export default ChapterRoute;    