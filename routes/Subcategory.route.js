import express from 'express';
import SubCategory from '../controllers/Subcategory.controller.js'
const SubcategoryRoute = express.Router();
SubcategoryRoute.post('/create', SubCategory.create); // render view here
SubcategoryRoute.delete('/delete/:id', SubCategory.deleteSubCategory); //);
SubcategoryRoute.get('/getAllSubcategory', SubCategory.getAllSubCategories); //);
SubcategoryRoute.get('/getSubCategory/:id', SubCategory.getSubCategory); //);



export default SubcategoryRoute;