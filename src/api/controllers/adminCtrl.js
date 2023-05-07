// import createHash from "../../hooks/createHash.js";
import Admin from "../models/adminsModels.js";
import bcrypt from 'bcrypt'


let adminCtrl = {}

//API : /admin/register
//Method : POST
//Access : access with admin approval
//Description : reg admin api
adminCtrl.rgeAdmin = async (req, res) => {

    const bodyObject = Object.keys(req.body);
    bodyObject.forEach((singleKey) => {
        if (!req.body[singleKey]) {
            return res.status(400).json({
                "success": false,
                "message": "Invalid input!"
            });
        }
    })

    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(req?.body?.password, saltRounds)

        const rgeData = {
            email: req?.body?.email,
            password: hash
        }

        const newAdmin = await Admin.create(rgeData);
        return res.status(200).json({
            "success": true,
            "message": "registration successful",
            "adminId": newAdmin._id
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}


//API : /admin/login
//Method : Get
//Access : no access needed
//Description : login admin admin
adminCtrl.loginAdmin = async (req, res) => {
    const { email, password } = req?.body || {}

    if (!email || !password) {
        return res.status(400).json({
            "success": false,
            "message": "Invalid input!"
        });
    }


    try {
        //find email by admin
        const adminData = await Admin.findOne({ email })
        const { email: adminEmail, password: adminPasswordHash } = adminData || {}

        //check user password valid or not
        const checkPassword = await bcrypt.compare(password, adminPasswordHash)

        //admin login
        if (checkPassword) {
            //admin login successfully
            return res.status(200).json({
                "success": true,
                "message": "Login Successful",
                "accessToken": "4566223225332222"
            })
        } else {
            //admin login error
            return res.status(401).json({
                "success": false,
                "message": "Wrong password!"
            });
        }

    } catch (error) {
        console.log("find email by admin", error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}








export default adminCtrl