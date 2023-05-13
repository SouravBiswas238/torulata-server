import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    product_title: {
        type: String,
        required: true
    },
    product_images: {
        type: String,
        required: true
    },

    product_price: {
        type: Number,
        required: true
    },

    product_info: {
        product_details: {
            type: String,
            required: true
        },
        product_care: {
            type: String,
            required: true
        },
        product_care_video: {
            type: String,
            required: false

        },

    },
    product_category: {
        type: [String], // update to accept an array of strings
        required: true
    },
    product_tags_english: {
        type: [Object],
        required: true
    },
    product_tags_bangla: {
        type: [Object],
        required: true
    },
    product_discount: {
        type: Number,
        required: false
    },

});

const Product = mongoose.model("Product", productSchema)


export default Product;