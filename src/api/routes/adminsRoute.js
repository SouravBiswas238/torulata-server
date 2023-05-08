import express from 'express';
import adminCtrl from '../controllers/adminCtrl.js';
import jwtVerify from '../../uttils/jwtVerify.js';

const router = express.Router();

router.route('/register').post(adminCtrl.rgeAdmin);
router.route('/login').get(adminCtrl.loginAdmin);
router.route('/give-admin-access').patch(adminCtrl.giveAdminAccess);
router.route('/remove').delete(jwtVerify, adminCtrl.removeAdmin);
router.route('/email-verify/:hash').patch(adminCtrl.verifyEmail);

export default router;
