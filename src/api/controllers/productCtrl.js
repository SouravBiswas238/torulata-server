import Product from "../models/productModels.js";


export default class ProductCtrl {
    //API : /api/v1/product/addProduct
    //Method : POST
    //Access : Public
    //Description :for adding the product
    addProduct = async (req, res) => {
        let { name, price, category } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid input!"
            });
        }

        try {
            let newProduct = await Product.create({ name: name, price: Number(price), category: category });
            return res.json({
                "success": true,
                "message": "Product Added",
                "productId": newProduct._id
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "success": false,
                "message": "Server Error!"
            });
        }
    }

}