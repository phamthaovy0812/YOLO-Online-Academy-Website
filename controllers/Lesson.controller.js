import LessonModel from "../models/Lesson.model.js";
import Lesson from "../models/Lesson.model.js";
import LessonServices from "../services/Lesson.services.js";
export default {
    async create(req, res) {
        try {
            const lessonParam = req.body;
            const file = req.file;
            const lessonObject = {
                name: lessonParam.name,
                preview: lessonParam.preview,
                video: file.path,
            }
            const LessonSchema = new Lesson(lessonObject);
            await LessonSchema.save();
            res.status(200).json(lessonObject);
        } catch (error) {
            res.status(500).json(error);
        }

    },
    async update(req, res) {
        try {
            const id = req.params.id;
            const lessonParam = req.body;
            const file = req.file;
            const lessonObject = {
                name: lessonParam.name,
                preview: lessonParam.preview,
                video: file.path,
            }
            console.log(lessonParam);
            const updateLesson = await Lesson.findByIdAndUpdate(id, {name:lessonObject.name, preview:lessonObject.preview, video:lessonObject.video},{new:true});
            if(updateLesson)
            {
                res.status(200).send({ message: "Success" });
            }
            else{
                res.status(200).send({ message: "Failed"});

            }
     
        } catch (error) {
            res.status(500).json(error)
        }
        
    },
    async delete(req,res){
        try {
            const deleteLesson = await LessonServices.deletebyID(req.params.id);
            if (deleteLesson) {
                res.status(200).json({ message: "Success" });
            }
            else{
                res.status(200).json({ message: "Failed" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
       
       
    },
    async getAllLesson(req,res){
        try {
            const lessonList = await Lesson.find();
            console.log(lessonList);
            if (JSON.stringify(lessonList) === '[]') {
                res.status(200).json({message: "Empy list"});
            }
            else{
                res.status(200).json(lessonList);
            }
        } catch (error) {
            res.status(500).json(error);

        }

    },
    async getLesson(req,res){
        try {
            const id=req.params.id;
            const lesson=await Lesson.findById(id);
            if (lesson){
                res.status(200).json(lesson);
            }
            else{
                res.status(200).json({message: "Lesson not found"});
            }

        } catch (error) {
            res.status(500).json(error);
        }
    }


}