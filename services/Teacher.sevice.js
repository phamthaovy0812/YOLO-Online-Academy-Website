import User from "../models/User.model.js"
import Chapter from "../models/Chapter.model.js"
import SubCategoryModel from "../models/SubCategory.model.js";


export default {
   
    async getChapterByTime(time) {
       
        const timeChapter=JSON.parse(time);
        const chapter = await Chapter.find(); 
        console.log(chapter);
    let chapterList=[];
        timeChapter.forEach(item =>{
            for (let i = 0; i < chapter.length; i++) {
                if (chapter[i].timeCreate == item) {
                    if(!chapterList.includes(chapter[i]._id))
                        chapterList.push(chapter[i]._id.valueOf());
                }
            }
        })

        return chapterList;
        
    },
    async getSubCategory() {
        const subCategory = await SubCategoryModel.find().lean();
        if(subCategory)
        {   
            return subCategory;
        }
        else return false;
      
    },
    async getIDCategory(name) {
        const ID = await SubCategoryModel.findOne({name:name}).lean();
        console.log(ID._id);
        return ID._id.valueOf();
    }
}