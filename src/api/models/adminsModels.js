import mongoose from 'mongoose';


const adminsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const admin = mongoose.model("admin", adminsSchema)


export default admin;