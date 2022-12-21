
import mongoose from 'mongoose';
const { Schema } = mongoose;
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    phone: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        require: true,
    }
},
    { timestamps: true });

export default mongoose.model('User', User);