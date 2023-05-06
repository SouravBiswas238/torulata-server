// import createHash from "../../hooks/createHash.js";
import Admin from "../models/adminsModels.js";
import bcrypt from 'bcrypt'


let adminCtrl = {}

//API : /admin/register
//Method : POST
//Access : access with admin approval
//Description : reg now admin
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











export default adminCtrl