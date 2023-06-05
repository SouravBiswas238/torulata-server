import express from "express"
import odderCtrl from '../controllers/odderCtrl.js';
const orderCtrl = new odderCtrl();
const router = express.Router();

router.route('/new-odder').post(orderCtrl.addNewOdder);
router.route('/').get(orderCtrl.getAllOdder);



export default router;
