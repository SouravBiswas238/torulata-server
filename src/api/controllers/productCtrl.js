import Product from "../models/productModels.js";
import Review from "../models/reviewModel.js";

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

    //API : /api/v1/product/addProduct
    //Method : PUT
    //Access : Public
    //Description :for adding a review
    addReviewSingleProduct = async (req, res) => {
        const { product_review, user_name, rating_star } = req.body || {};
        const productId = req.params.productId;
        // console.log(req.body, productId)


        if (!productId || !product_review || !user_name || !rating_star) {
            return res.status(400).json({
                success: false,
                message: "Invalid input!"
            });
        }

        try {
            const updatedProduct = await Review.findByIdAndUpdate(
                productId,
                {
                    $push: {
                        product_review: { name: user_name, review: product_review, rating_star: rating_star }
                    }
                },
                { upsert: true, new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            return res.json({
                success: true,
                message: "Review updated",
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



    updateProduct = async (req, res) => {
        let productId = req.params.productId;
        const { product_title, product_price, product_category, product_discount, product_images, product_info, product_tags_english, product_tags_bangla } = req.body;

        if (!product_title || !product_price || !product_category || !product_images || !product_info || !product_tags_english || !product_tags_bangla) {
            return res.status(400).json({
                success: false,
                message: "Invalid input!"
            });
        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId,
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


    //API : /api/v1/product/related-product
    //Method : get
    //Access : Public
    //Description :for fetching the product

    getRelatedProduct = async (req, res) => {
        const category = req.query.category.split(',');
        console.log(category);
        let relatedProduct = []
        try {
            let products = await Product.find({})
            products.map(p => {
                const includesResult = category.some((kw) => p.product_category.includes(kw))
                // console.log(includesResult);
                if (includesResult == false) {
                    return
                } if (includesResult) {
                    relatedProduct.push(p)
                }
            })

            return res.status(200).json({
                "success": true,
                "message": "Product Retrieved",
                "data": relatedProduct.slice(0, 4)
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "success": false,
                "message": "Server Error!"
            });

        }
    }


    //API : /api/v1/product/findManyById
    //Method : get
    //Access : Public
    //Description :for fetching Many product by id

    findManyById = async (req, res) => {
        const ids = req.params.productArr.split(',');
        console.log(ids);
        if (!ids) {
            return res.status(200).json({
                "success": true,
                "message": "Product Retrived",
                "data": [],
            })
        }
        try {
            let products = await Product.find({ _id: ids })
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


    //API : /api/v1/product/findByCategory || query accepted :  category => string, limit => number, skip => number 
    //Method : get
    //Access : Public
    //Description :for fetching Many product by id

    findProductBiCategory = async (req, res) => {
        const category = req?.query?.category || ""
        const limit = Number(req?.query?.limit) || 0
        const skip = Number(req?.query?.skip) || 0


        try {
            let products = await Product.find({ product_category: { $elemMatch: { $regex: category, $options: 'i' } } }).limit(limit)

            let productsLength = (await Product.find({})).length

            if (!skip === 0) {
                const skipEnd = Number(skip) + 15
                if (Number(skip) < products.length) {
                    const skipProducts = products.slice(Number(skip), skipEnd)
                    return res.json({
                        "success": true,
                        "message": "Product Retrieved",
                        "data": skipProducts,
                        "skip": `${skip} to ${skipEnd}`,
                        "totalProductLength": productsLength
                    })
                }

                return res.json({
                    "success": true,
                    "message": "Product Retrieved",
                    "data": products,
                    "totalProductLength": productsLength
                })

            }

            return res.json({
                "success": true,
                "message": "Product Retrieved",
                "data": products,
                "totalProductLength": productsLength
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
                    message: 'product Id not receive'
                })
            }
            let product = await Product.findOne({ _id: productId })
            let reviews = await Review.findOne({ _id: productId })
            return res.json({
                "success": true,
                "message": "Product Received",
                "data": product,
                "reviews": reviews || []

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

            // const searchProduct = await Product.find(keyword);
            // res.status(200).json({
            //     "success": true,
            //     "message": "successful",
            //     "data": searchProduct
            // });
            const products = await Product.find(keyword);

            // Extract tag names from the product tags
            const productsWithTags = products.map((product) => {
                const englishTagNames = product.product_tags_english.map((tag) => tag.tag);
                const banglaTagNames = product.product_tags_bangla.map((tag) => tag.tag);
                return {
                    ...product.toObject(),
                    product_tags_english: englishTagNames,
                    product_tags_bangla: banglaTagNames,
                };
            });
            res.status(200).json({
                "success": true,
                "message": "successful",
                "data": productsWithTags
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
