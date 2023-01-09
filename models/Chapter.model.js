import mongoose from 'mongoose';
const { Schema } = mongoose;
const Chapter = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    timeCreate: {
        type: String,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "Account"
    },
    deleteAt: {
        type: String
    },
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lesson"
        }
    ],
});
export default mongoose.model('Chapter', Chapter);