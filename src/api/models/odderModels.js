import mongoose from 'mongoose';

const odderSchema = new mongoose.Schema({

    address: {
        name: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        ipAddress: String,
        deviceName: String,
        location: String,
    },
    products: [
        {
            quantity: Number,
            totalPrice: Number,
            _id: String,
            product_title: String,
            product_images: String,
            product_price: Number
        }
    ]

});

const Odder = mongoose.model("odder", odderSchema)


export default Odder;