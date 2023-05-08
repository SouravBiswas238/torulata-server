// import createHash from "../../hooks/createHash.js";
import Admin from "../models/adminsModels.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import jwtVerify from "../../uttils/jwtVerify.js";
import sentVerifyEmail from "../../uttils/sentVerifyEmail.js";


let adminCtrl = {}

//API : /admin/register
//Method : POST
//Access : access with admin approval
//Description : reg admin api
adminCtrl.rgeAdmin = async (req, res) => {
    console.log(req.body);

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
        //sent verify email 
        await sentVerifyEmail(req.body.email)
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
//Description : login admin
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


        if (adminPasswordHash === null || adminPasswordHash === undefined) {
            return res.status(404).json({
                "success": false,
                "message": "admin not exit",
            })
        }

        //check user password valid or not
        const checkPassword = await bcrypt.compare(password, adminPasswordHash)

        //admin login
        if (checkPassword) {
            //create jwt token
            const jwtToken = await jwt.sign({ email: adminEmail }, process.env.SECRET_HASH, { expiresIn: 60 * 60 })

            //admin login successfully
            return res.status(200).json({
                "success": true,
                "message": "Login Successful",
                "accessToken": jwtToken
            })
        } else {
            //admin login error
            return res.status(401).json({
                "success": false,
                "message": "Wrong password!"
            });
        }

    } catch (error) {
        console.log("login admin", error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}


//API : /admin/login/access
//Method : PUT
//Access : admin access needed
//Description : give admin login permission
adminCtrl.giveAdminAccess = async (req, res) => {
    const { email } = req?.body || {}

    if (!email) {
        return res.status(400).json({
            "success": false,
            "message": "Invalid input!"
        });
    }

    try {
        const { email } = req?.body || {}
        const options = { new: true }
        const find = { email }
        const updateData = { status: true }

        const skipData = {
            password: 0,
            date: 0,
            __v: 0,
            _id: 0,
        }

        const result = await Admin.findOneAndUpdate(find, updateData, options).select(skipData)

        return res.status(200).json({
            "success": true,
            "message": "Make admin successfully!",
            result
        });

    } catch (error) {
        console.log("give admin login permission", error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}


//API : /admin/remove
//Method : DELETE
//Access : admin access needed
//Description : delete admin 
adminCtrl.removeAdmin = async (req, res) => {
    const { email } = req?.body || {}

    if (!email) {
        return res.status(400).json({
            "success": false,
            "message": "Invalid input!"
        });
    }

    try {
        const { email } = req?.body || {}
        const find = { email }

        const result = await Admin.deleteOne(find)

        const { acknowledged, deletedCount } = result || {}

        if (acknowledged && deletedCount) {
            return res.status(200).json({
                "success": true,
                "message": "delete admin successful!",
                result
            });
        }
        return res.status(404).json({
            "success": false,
            "message": "admin not exit!",
        });


    } catch (error) {
        console.log("remove admin", error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }
}


export default adminCtrl