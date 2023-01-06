import mongoose from 'mongoose';
const { Schema } = mongoose;
const Lesson = new mongoose.Schema({
    chapterID: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,

    },
    timeCreate: {
        type: String,
    },
    deleteAt: {
        type: String
    },
    preview: {
        type: Boolean,
        default: false,
    },
    video: {
        type: String,
    }
});

export default mongoose.model('Lesson', Lesson);