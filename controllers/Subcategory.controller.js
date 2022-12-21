import SubCategoryModel from "../models/SubCategory.model.js";
export default{
    async create(req,res){
        try {
            const subcategory = req.body;
            const ObjectSub = new SubCategoryModel(subcategory);
            await ObjectSub.save();
            res.status(200).json(subcategory);

        } catch (error) {
            res.status(500).json(error);
        }
       
    },
    async getAllSubCategories(req,res){
        try {
            const SubCategoryList = await SubCategoryModel.find();
            res.status(200).json(SubCategoryList);

            
        } catch (error) {
            res.status(500).json(error);

        }
    },
    async deleteSubCategory(req,res){
        try {
            const deleteSubcategory = await SubCategoryModel.findByIdAndDelete(req.params.id);
            if (deleteSubcategory) {
                res.status(200).json({ message: "Success" });
            }
            else {
                res.status(200).json({ message: "Failed" });
            }
        } catch (error) {
            res.status(500).json(error);
        }

    },
    async getSubCategory(req,res){
        try {
            const SubCategory = await SubCategoryModel.findById(req.params.id);
            if (SubCategory) {
                res.status(200).json(SubCategory);
            }
            else {
                res.status(200).json({ message: "Failed" });
            }
        } catch (error) {
            res.status(500).json(error);
        }

    }
}