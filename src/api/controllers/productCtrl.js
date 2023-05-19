import Product from "../models/productModels.js";

export default class ProductCtrl {
    //API : /api/v1/product/addProduct
    //Method : POST
    //Access : Public
    //Description :for adding the product
    addProduct = async (req, res) => {

        let { product_title, product_price, product_care, product_category, product_discount, product_images, product_info, product_tags_english, product_tags_bangla, } = req.body;
        // @ts-ignore

        if (!product_title || !product_price || !product_care || !product_category || !product_images || !product_info, !product_tags_english, !product_tags_bangla) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid input!"
            });
        }

        try {
            let newProduct = await Product.create({
                product_care: product_care,
                product_discount: product_discount,
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


    updateProduct = async (req, res) => {
        console.log(req.body)
        const productId = req.params.productId;
        const { product_title, product_price, product_category, product_discount, product_images, product_info, product_tags_english, product_tags_bangla } = req.body;

        if (!product_title || !product_price || !product_category || !product_images || !product_info || !product_tags_english || !product_tags_bangla) {
            return res.status(400).json({
                success: false,
                message: "Invalid input!"
            });
        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                {
                    product_title: product_title,

                    product_discount: product_discount,
                    product_price: product_price,
                    product_category: product_category,
                    product_images: product_images,
                    product_info: product_info,
                    product_tags_english: product_tags_english,
                    product_tags_bangla: product_tags_bangla
                },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            return res.json({
                success: true,
                message: "Product updated",
                product: updatedProduct
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Server Error!"
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
            return res.status(200).json({
                "success": true,
                "message": "Product Retrieved",
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
            const productId = req.params.productId;
            if (!productId) {
                return res.json({
                    message: 'product Id not recive'
                })
            }
            let product = await Product.findOne({ _id: productId })
            return res.json({
                "success": true,
                "message": "Product Retrived",
                "data": product
            })
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
        console.log(req.query);
        try {
            const keyword = req.query.search
                ? {
                    $or: [
                        {
                            product_category: {
                                $regex: req.query.search,
                                $ne: req?.decoded?.Product.product_category,
                                $options: 'i',
                            },
                        },
                        {
                            product_title: {
                                $regex: req.query.search,
                                $ne: req?.decoded?.Product.product_title,
                                $options: 'i',
                            },
                        },
                        {
                            'product_tags_english.tag': {
                                $regex: req.query.search,
                                $ne: req?.decoded?.Product.product_tags_english,
                                $options: 'i',
                            },
                        },
                        {
                            'product_tags_bangla.tag': {
                                $regex: req.query.search,
                                $ne: req?.decoded?.singleProduct.product_tags_bangla,
                                $options: 'i',
                            },
                        },
                    ],
                }
                : {};

            const searchProduct = await Product.find(keyword);
            res.status(200).json({
                "success": true,
                "message": "successful",
                "data": searchProduct
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Server Error!',
            });
        }
    };



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
