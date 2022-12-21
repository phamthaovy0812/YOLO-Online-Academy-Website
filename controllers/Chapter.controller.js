import ChapterModel from "../models/Chapter.model.js";
export default {
    test(req, res) {
        res.send("Test api chapter ")
    },
    async create(req, res) {
        try {
            const chapter = req.body;
            const chapterModel = new ChapterModel(chapter);
            await chapterModel.save();
            res.status(200).json(chapter);
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
            res.status(200).json({ message: "Success" });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getChapter(req,res){
        try {

            const  chapter = await ChapterModel.findById(req.params.id);
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