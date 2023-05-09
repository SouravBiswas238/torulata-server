// import createHash from "../../hooks/createHash.js";
import Admin from "../models/adminsModels.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import sentEmail from "../../uttils/sentEmail.js";
import generateOTP from "../../uttils/generateOTP.js";
import sentVerifyMailFormate from "../../uttils/sentVerifyMailFormate.js";


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
        const mailVerifyHash = crypto.randomBytes(64).toString('hex')

        // sent data database object model

        const name = req?.body?.name
        const email = req?.body?.email

        const rgeData = {
            name,
            email,
            password: hash,
            mailVerifyHash
        }

        const newAdmin = await Admin.create(rgeData);

        await Admin.findOneAndUpdate({ email }, { resetPasswordOTP: null, isVerify: false })

        //sent verify email 
        await sentEmail(email, sentVerifyMailFormate(mailVerifyHash))


        return res.status(200).json({
            "success": true,
            "message": "registration successful",
            "adminId": newAdmin._id
        });

    } catch (error) {
        console.log(error.message);
        const userAlreadyExist = error.message.includes("email_1 dup key")
        if (userAlreadyExist) {
            return res.status(409).json({
                "success": false,
                "message": "Admin already exist"
            });
        }

        return res.status(500).json({
            "success": false,
            "message": "internal server error  t!"
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


//API : /admin/email-verify
//Method : patch
//Access : no access needed
//Description : email verify 
adminCtrl.verifyEmail = async (req, res) => {

    const mailVerifyHash = req?.params?.hash

    console.log("emailVerifyHash", mailVerifyHash);

    try {
        const query = { mailVerifyHash }
        const updateData = {
            isVerify: true,
            mailVerifyHash: "",
        }
        const skipDataInResult = {
            _id: 0,
            email: 0,
            password: 0,
            mailVerifyHash: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        }
        const emailVerifyResult = await Admin.findOneAndUpdate(query, updateData, { new: true }).select(skipDataInResult)

        if (emailVerifyResult !== null) {
            return res.status(200).json({
                "success": true,
                "message": "Email verify successful",
                result: emailVerifyResult
            });
        } else {
            return res.status(404).json({
                "success": false,
                "message": "Op's Email verify failed!"
            });
        }
    } catch (error) {
        console.log("email-verify", error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }


}


//API : /admin/password-reset-mail-sent
//Method : patch
//Access : no access needed
//Description : password reset email sent
adminCtrl.passwordResetMailSent = async (req, res) => {

    try {
        const resetPassEmail = req?.body?.email;

        // generate Otp 
        const OTP = Number(generateOTP())

        const find = { email: resetPassEmail }
        const resetPasswordOTP = { resetPasswordOTP: OTP }
        const options = { new: true }

        // check valid admin  
        const result = await Admin.findOneAndUpdate(find, resetPasswordOTP, options)

        if (result !== null) {
            console.log("result", result);
            await sentEmail(resetPassEmail, sentVerifyMailFormate(OTP))

            // password validity time 5 minute
            setTimeout(async () => {
                await Admin.findOneAndUpdate(find, { resetPasswordOTP: null })
            }, 300000);

            return res.status(200).json({
                "success": true,
                "message": "Reset mail sent",
                "exp": "5 minute"
            });
        }

        return res.status(404).json({
            "success": false,
            "message": "Wrong email try again"
        });

    } catch (error) {

        console.log("password reset || ", error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });

    }

}


//API : /admin/password-reset-mail-verify
//Method : patch
//Access : no access needed
//Description : password reset email verify
adminCtrl.passwordResetMailVerify = async (req, res) => {

    try {
        const { email, otp } = req?.params || {}

        const findAdmin = await Admin.findOne({ email })
        console.log(findAdmin);

        if (findAdmin !== null && otp == findAdmin?.resetPasswordOTP) {
            // admin find successfully

            // removed old otp in database
            await Admin.findOneAndUpdate({ email }, { resetPasswordOTP: null })

            return res.status(200).json({
                "success": true,
                "message": "otp is valid",
                "email": email
            });
        }

        // admin find error or something
        return res.status(404).json({
            "success": false,
            "message": "something wrong"
        });


    } catch (error) {
        console.log("otp verify || ", error.message);
        return res.status(500).json({
            "success": false,
            "message": "internal server error!"
        });
    }

}


export default adminCtrl