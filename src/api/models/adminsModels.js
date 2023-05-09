import mongoose from 'mongoose';


const adminsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerify: {
        type: Boolean,
        default: false,
    },
    mailVerifyHash: {
        type: String,
        default: null
    },
    resetPasswordOTP: {
        type: Number,
        default: null
    }

}, { timestamps: true })

const admin = mongoose.model("admin", adminsSchema)

export default admin;