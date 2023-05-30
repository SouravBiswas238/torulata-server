import mongoose from 'mongoose';


const bannerSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },

}, { timestamps: true })

const banner = mongoose.model("banner", bannerSchema)

export default banner;