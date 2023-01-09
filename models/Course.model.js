
import mongoose from 'mongoose';
const { Schema } = mongoose;
const Course = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug_category: {
        type: String,
    },
    sub_category: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
    },
    subtitle:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    author_id:{
        type: Schema.Types.ObjectId,
        ref: "Teacher",
    },
    number_review:{
        type: Number,
        defaultValue:0,
    },
    scores_review: {
        type: Number,
        defaultValue: 0,
    },
    list_reviews:{
        type:Array,

    },
    image :{
        type:String
    },
    price:{
        type:String,
        require:true,
    },
    lastUpdate:{
        type:String,
        require:true,
    },
    promotion:{
        type:String,
    },
    syllabus:{
        type:String,
        require:true,
    },
    videoDemo:{
        type: String,
        require: true,
    },
    chapter:{
        type: [Schema.Types.ObjectId],
        ref: "Chapter"
    },
    isBlock:{
        type: Boolean,
        default: false,
    }
    
},
    { timestamps: true });

export default mongoose.model('Course', Course);