import e from "express";
import Category from "../models/Category.model.js";

export default {
    test(req,res){
       console.log(req.body);
    },
    createView(req,res){
        res.render('./category/create');
    },
    async create(req,res){
        try {
            const category = req.body;
            const categoryObject=new Category(category);
            const value=await categoryObject.save();
            if(value){
                res.status(200).json({message:"Success"});

            }else{
                res.status(200).json({ message: "Failed" });

            }
        } catch (error) {
            res.status(500).json(error);
        }
       

    },
    async getAllCategory(req,res){
        try {
            const categoryList = await Category.find();
            res.status(200).json(categoryList);

        } catch (error) {
            res.status(500).json(error);

        }
    },
    async deleteCategory(req,res){
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Success" });
        } catch (error) {
            
            res.status(500).json(error);
        }
    },
    async update(req,res){
        try {
            const cate=req.body;
            const updateCate=await Category.findByIdAndUpdate(req.params.id, { name: cate.name, sub_categories:cate.sub_categories },{new:true});
            if (updateCate)
            {
                res.status(200).json(updateCate);

            }
            else{
                res.status(200).json({message: "Failed"});

            }
        } catch (error) {

            res.status(500).json(error);
        }
    },
    async getCategory(req,res){
        try {
            
            const category = await Category.findById(req.params.id);
            if (category) {
                res.status(200).json(category);

            }
            else {
                res.status(200).json({ message: "Category not found" });

            }
        } catch (error) {

            res.status(500).json(error);
        }
    }
        
}