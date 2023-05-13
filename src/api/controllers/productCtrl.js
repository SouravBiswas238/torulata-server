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


    //API : /api/v1/product/fetchProducts
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
    //API : /api/v1/product/singleProduct
    //Method : get 
    //Access : Public
    //Description :for fetching the product

    getSingleProducts = async (req, res) => {
        try {

            const productId = req.params.id;
            if (!productId) {
                res.json({ "status": false, "message": "User Id is not received!" });
            } else {
                let products = await Product.findOne({ _id: productId })
                if (products) {
                    res.json({ "success": true, "data": products });
                } else {
                    res.json({ "status": false, "message": "User Id doesn't exist!" });
                }
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "success": false,
                "message": "Server Error!"
            });

        }
    }


    // search product  get search result by query {sourav}
    //API : /api/v1/product/singleProduct
    //Method : get 
    //Access : Public
    //Description :for searching the product

    getSearchProduct = async (req, res) => {
        try {
            const keyword = req.query.search
                ? {
                    $or: [
                        {
                            product_category: {
                                $regex: req.query.search,
                                $ne: req?.decoded?.Product?.product_category,
                                $options: 'i',
                            },
                        },
                        {
                            product_tags_english: {
                                $regex: req.query.search,
                                $ne: req?.decoded?.Product?.product_tags_english,
                                $options: 'i',
                            },
                        },
                        {
                            product_tags_bangla: {
                                $regex: req.query.search,
                                $ne: req?.decoded?.singleProduct?.product_tags_bangla,
                                $options: 'i',
                            },
                        },
                        // { email: { $ne: req?.decoded?.userData?.email } },
                    ],
                }
                : {};
            console.log(req.query.search)
            console.log(keyword)
            const singleProduct = await Product.find(keyword);
            res.send(singleProduct);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "success": false,
                "message": "Server Error!"
            });

        }
    }


    // delete api takes product id by params
    deleteProducts = async (req, res) => {
        let productId = req.params.productId;
        console.log(productId)
        if (!productId) {
            res.json({ 'message': 'ProductId not recive' });

        }
        try {
            await Product.deleteOne({ _id: productId });
            res.json({ 'success': true, 'message': 'Product Deleted!' });
        } catch (error) {
            console.log(error)
            res.json({ 'success': false, 'message': 'Technical Issue in server!' });
        }

    }


}
