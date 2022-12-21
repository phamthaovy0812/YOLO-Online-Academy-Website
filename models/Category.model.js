import mongoose from 'mongoose';
const { Schema } = mongoose;

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    sub_categories: [
        {
            type: Schema.Types.ObjectId,
            ref: "SubCategory",
        },
    ],
});
export default mongoose.model('Category', Category);