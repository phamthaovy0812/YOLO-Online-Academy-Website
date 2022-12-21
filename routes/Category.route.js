import express from 'express';
import Category from '../controllers/Category.controller.js'
const CategoryRoute = express.Router();
CategoryRoute.get('/create', Category.createView);
CategoryRoute.get('/getCategory/:id', Category.getCategory);
CategoryRoute.delete('/delete/:id', Category.deleteCategory);
CategoryRoute.post('/create', Category.create);
CategoryRoute.post('/update/:id', Category.update);
CategoryRoute.get('/getAllCategory', Category.getAllCategory);


export default CategoryRoute;