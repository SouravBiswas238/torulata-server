import Product from "../models/productModels.js";

export default class ProductCtrl {
    //API : /api/v1/product/addProduct
    //Method : POST
    //Access : Public
    //Description :for adding the product
    addProduct = async (req, res) => {



        let { product_title, product_price, product_category, product_images, product_info, product_tags_english, product_tags_bangla, } = req.body;
        // @ts-ignore



        if (!product_title || !product_price || !product_category || !product_images || !product_info, !product_tags_english, !product_tags_bangla) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid input!"
            });
        }

        try {
            let newProduct = await Product.create({
                product_title: product_title,
                product_price: product_price,
                product_category: product_category,
                product_images: product_images,
                product_info: product_info,
                product_tags_english: product_tags_english,
                product_tags_bangla: product_tags_bangla
            });
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


    //API : /api/v1/product/getProducts
    //Method : get
    //Access : Public
    //Description :for fetching the product

    getProducts = async (req, res) => {
        try {
            let products = await Product.find({})
            return res.json({
                "success": true,
                "message": "Product Retrived",
                "data": products
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "success": false,
                "message": "Server Error!"
            });

        }
    }
    deleteProducts = async (req, res) => {
        try {
            const productId = req.body.productId;
            console.log(productId)

            if (!productId) {
                return res.status(400).send({ error: 'productId is required' });
            }

            const deletedProduct = await Product.findOneAndDelete({ _id: productId });

            if (!deletedProduct) {
                return res.status(404).send({ error: 'Product not found' });
            }

            return res.send({ success: 'Product deleted successfully' });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "success": false,
                "message": "Server Error!"
            });

        }
    }
}
