import mongoose from 'mongoose';


const adminsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const admin = mongoose.model("admin", adminsSchema)


export default admin;