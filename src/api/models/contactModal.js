import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({

    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_phone: {
        type: Number,

    },
    message: {
        type: String,
    },

});

const Contact = mongoose.model("Contact", contactSchema)


export default Contact;