import mongoose from 'mongoose';
const { Schema } = mongoose;
const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    parent_category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
});
export default mongoose.model('SubCategory', SubCategorySchema);
