import mongoose from 'mongoose';
const { Schema } = mongoose;
const Lesson = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
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