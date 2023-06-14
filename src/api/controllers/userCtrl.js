import User from "../models/userModel.js";

export default class userControl {
    //API : /user/createUser
    //Method : POST
    //Access : Public
    //Description :for creating account
    createUser = async (req, res) => {

        let { user_id,
            user_name,
            user_email,
            user_image } = req.body.payload;

        // @ts-ignore

        if (!user_id || !user_email) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid input!"
            });
        }

        try {
            let newUser = await User.create({
                user_id: user_id,
                user_name: user_name,
                user_email: user_email,
                user_image: user_image,
            });
            return res.json({
                "success": true,
                "message": "User Creates",
                "userId": newUser._id
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                "success": false,
                "message": "Server Error!"
            });
        }
    }
    //API : /user/get-all
    //Method : get
    //Access : Public
    //Description :for adding the product
    getAllUser = async (req, res) => {
        try {
            const allData = await User.find()
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
    //API : /user/get-all
    //Method : get
    //Access : Public
    //Description :for adding the product
    getSingUser = async (req, res) => {
        try {
            const userId = req.params.userId;
            // console.log(OrderId);
            if (!userId) {
                return res.json({
                    message: 'userId  not receive'
                })
            }
            let SingleUser = await User.findOne({ user_id: userId })
            return res.status(200).json({
                "success": true,
                "message": "get user data",
                data: SingleUser
            });


        } catch (error) {
            console.log(error?.message);
            return res.status(500).json({
                "success": false,
                "message": "internal server error  t!"
            });
        }
    }
}
