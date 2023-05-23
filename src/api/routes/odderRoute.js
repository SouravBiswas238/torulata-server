import express from "express"
import odderCtrl from '../controllers/odderCtrl.js';

const router = express.Router();

router.route('/new-odder').post(odderCtrl.addNewOdder);
router.route('/').get(odderCtrl.getAllOdder);



export default router;
