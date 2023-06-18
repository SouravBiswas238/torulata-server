import Product from "../models/productModels.js"
import Odder from "../models/odderModels.js"


export default class odderCtrl {
    //API : /odder/add
    //Method : POST
    //Access : no access
    //Description : add odder api
    addNewOdder = async (req, res) => {

        try {
            const odderData = req?.body
            const { product, address } = odderData
            const productIds = product.map(p => p._id)

            let odderProduct = await Product.find({ _id: { $in: productIds } })
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

            const newOdderData = {
                address: { ...address },
                products: newProductData
            }



            // save to database 
            if (newOdderData?.products.length > 0) {


                const result = await Odder.create(newOdderData)
                    .then(createdProduct => {
                        console.log('Product created:', createdProduct);
                    })
                    .catch(error => {
                        console.error('Error creating product:', error);
                    });


                return res.status(200).json({
                    "success": true,
                    "message": "Odder successful!",
                    "result": result
                });
            }


        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                "success": false,
                "message": "internal server error  t!"
            });
        }
    }




    //API : /odder/
    //Method : POST
    //Access : no access
    //Description : add odder api
    getAllOdder = async (req, res) => {

        try {
            const allData = await Odder.find()
            return res.status(200).json({
                "success": true,
                "message": "get all odder data",
                data: allData
            });


        } catch (error) {
            console.log(error?.message);
            return res.status(500).json({
                "success": false,
                "message": "internal server error  t!"
            });
        }


    }
    //API : /singleOdder/
    //Method : get
    //Access : no access
    //Description : get single order
    getSingleOdder = async (req, res) => {

        try {
            const OrderId = req.params.orderId;
            // console.log(OrderId);
            if (!OrderId) {
                return res.json({
                    message: 'product Id not receive'
                })
            }
            let SingleData = await Odder.findOne({ _id: OrderId })
            return res.status(200).json({
                "success": true,
                "message": "get single odder data",
                data: SingleData
            });


        } catch (error) {
            console.log(error?.message);
            return res.status(500).json({
                "success": false,
                "message": "internal server error  t!"
            });
        }


    }



    //API :update-order/:orderId/:status
    //Method : put


    updateOrder = async (req, res) => {
        const { orderId, status } = req.params;

        console.log(orderId)
        try {

            // Find the order by ID
            const order = await Odder.findOne({ _id: orderId })
            console.log(order)
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            // Update the order status
            order.order_status = status;

            // Save the updated order
            await order.save();

            return res.status(200).json({
                "success": true,
                "message": "Order status updated successfully",

            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
}







