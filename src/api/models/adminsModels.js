import mongoose from 'mongoose';


const adminsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please fill name field"]
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
        enum: [false]
    }
}, { timestamps: true })

const admin = mongoose.model("admin", adminsSchema)


export default admin;