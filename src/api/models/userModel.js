import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
    },

    user_name: {
        type: String,
    },
    user_email: {
        type: String,
        required: true
    },


    user_password: {
        type: String,
    },

    user_photo: {
        type: String,
    },

});

const User = mongoose.model("User", userSchema)


export default User;