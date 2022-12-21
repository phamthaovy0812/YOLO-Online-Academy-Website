import mongoose from 'mongoose';
const { Schema } = mongoose;

const EnrollSchema = new mongoose.Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    courseID: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
})

export default mongoose.model('SubCategory', SubCategorySchema);
