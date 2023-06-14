import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,

    },
    user_email: {
        type: String,
        required: true
    },
    user_image: {
        type: String,
    },

});

const User = mongoose.model("User", userSchema)


export default User;