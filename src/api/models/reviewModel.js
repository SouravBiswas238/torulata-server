import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    product_review: [{
        name: {
            type: String,
            required: true
        },

        review: {
            type: String,
            required: true
        },
        rating_star: {
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],


});

const Review = mongoose.model("Review", reviewSchema)


export default Review;