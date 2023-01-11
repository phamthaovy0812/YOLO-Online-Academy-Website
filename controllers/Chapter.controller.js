import { ExpressHandlebars } from "express-handlebars";
import ChapterModel from "../models/Chapter.model.js";
import CourseModel from "../models/Course.model.js";
export default {
    test(req, res) {
        res.send("Test api chapter ")
    },
    async create(req, res) {
        try {
            console.log("Creating");

            const user = req.session.authAccount;
            const chapterValue = req.body;
           
            const chapter = {
                name: chapterValue.name || "",
                lessons: chapterValue.lessons || [],
                timeCreate: chapterValue.timeCreate || "",
                author: user.account._id ,
            }
            const chapterModel = new ChapterModel(chapter);
            const chaptermain = await chapterModel.save();
            
            if (chapterValue.type=="postCourse"){
                return res.redirect("../teachers/postCourse");
            }
            else{
                return res.redirect("../teachers/edit");
            }

           

        } catch (error) {
            res.status(500).json(error);
        }

    },
    async createChapter(req, res) {
        try {
            console.log("here");
            console.log(req.params.id);

          
            const chapterValue = req.body;
           
            const chapter = {
                name: chapterValue.name || "",
                lessons: chapterValue.lessons || [],
                timeCreate: chapterValue.timeCreate || "",
                
            }
            const chapterModel = new ChapterModel(chapter);
            await chapterModel.save();
            const course = await CourseModel.findOne({ _id: req.params.id });
            const chap=course.chapter;
            chap.push(chapterModel._id);

            const courseupdate = await CourseModel.findOneAndUpdate({ "_id": req.params.id }, { chapter: chap }, {
                returnOriginal: false,
            });
            console.log(courseupdate);
            
            if (chapterValue.type == "postCourse") {
                return res.redirect("../../teachers/postCourse");
            }
            else {
                return res.redirect("../../teachers/edit/" + req.params.id);
            }



        } catch (error) {
            res.status(500).json(error);
        }

    },
    async update(req, res) {
        try {
            const id = req.params.id;
            const chapterUpdate = req.body;
            const updateChapter = await ChapterModel.findByIdAndUpdate(id, {
                name: chapterUpdate.name,
                lessons: chapterUpdate.lessons
            }, { new: true });
            res.status(200).json(updateChapter);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getAllChapter(req, res) {
        try {
            const chapterList = await ChapterModel.find();
            res.status(200).json(chapterList);

        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteChapter(req, res) {
        try {
            await ChapterModel.findByIdAndDelete(req.params.id);
            // res.status(200).json({ message: "Success" });
            res.redirect("../../teachers/postCourse");
        } catch (error) {
            res.status(500).json(error);    
        }
    },
    async getChapter(req,res){
        try {

            const  chapter = await ChapterModel.findById(req.params.id)
            if(chapter){
                res.status(200).json(chapter);
            }else{
                res.status(200).json({message:"Chapter not found"});

            }
            
        } catch (error) {
            res.status(500).json(error);

        }
    }


}