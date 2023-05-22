import Product from "../models/productModels.js"
import Odder from "../models/odderModels.js"


let odderCtrl = {}


//API : /odder/add
//Method : POST
//Access : no access
//Description : add odder api

// Load the MaxMind database

odderCtrl.addNewOdder = async (req, res) => {


    try {





        console.log(req.ipAddress,
            req.deviceName,
            req.location);

        const odderData = req?.body
        const { product, address } = odderData
        const productIds = product.map(p => p._id)
        let odderProduct = await Product.find({ _id: productIds })

        // prepare product data 
        const newProductData = odderProduct.map(pro => {
            const { quantity } = product.find(p => {
                if (p._id == pro._id) {
                    return p
                }
            })

            return {
                quantity, totalPrice: Number(quantity) * Number(pro.product_price),
                _id: pro._id,
                product_title: pro.product_title,
                product_images: pro.product_images,
                product_price: pro.product_price,
            }
        })
        const moreAddress = {
            ipAddress: req.ipAddress,
            deviceName: req.deviceName,
            location: req.location
        }
        const newOdderData = {
            address: { ...address, ...moreAddress },
            products: newProductData
        }



        // save to database 
        const result = await Odder.create(newOdderData, { upsert: true })

        return res.status(200).json({
            "success": true,
            "message": "Odder successful!",
            "result": result
        });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error  t!"
        });
    }
}



export default odderCtrl