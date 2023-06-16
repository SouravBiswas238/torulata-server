import express from "express"
import userControl from "../controllers/userCtrl.js";

const userCtrl = new userControl();
const router = express.Router();

router.route('/createUser').post(userCtrl.createUser);
router.route('/get-all').get(userCtrl.getAllUser);
router.route('/get/:userId').get(userCtrl.getSingUser);




export default router;
