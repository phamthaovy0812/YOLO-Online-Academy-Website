import LessonModel from "../models/Lesson.model.js";
import fs from 'fs'

async function checkExitLesson(id) {
    try {
        const lesson = await LessonModel.findOne({ "_id": id });
        if (lesson) {
            return lesson;
        }
        else {
            return false;
        }
    } catch (error) {
        return false;
    }

}
export default {

    async updateInformation(id, name, preview, video) {
        const updateLesson = await LessonModel.findByIdAndUpdate(id, { name: name, preview: preview, video: video }, { new: true });
        if (updateLesson) {
            return updateLesson;
        }
        return false;

    },
    async deletebyID(id) {
        const lesson = await checkExitLesson(id);
        if (lesson) {
            const deletedStudent = await LessonModel.findByIdAndDelete({
                "_id": id
            })
            console.log("Delete" + deletedStudent);
            if (deletedStudent) {

                return true
            } else {
                return false;
            }
        }
        else {
            return false;
        }

    },
    deleteVideoByName(path) {
        // delete a file
        try {
            fs.unlinkSync(path)

            return true;
        } catch (error) {
            console.log(error)
        }
        return false;
    }
}