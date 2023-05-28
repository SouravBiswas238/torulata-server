import express from 'express';
import adminCtrl from '../controllers/adminCtrl.js';
import jwtVerify from '../../uttils/jwtVerify.js';

const router = express.Router();

router.route('/login').patch(adminCtrl.loginAdmin);
router.route('/register').post(adminCtrl.rgeAdmin);
router.route('/all-admin').get(adminCtrl.getAllAdmin);
router.route('/remove').delete(adminCtrl.removeAdmin);
router.route('/email-verify/:hash').patch(adminCtrl.verifyEmail);
router.route('/password-update').patch(adminCtrl.passwordUpdate);
router.route('/give-admin-access').patch(adminCtrl.giveAdminAccess);
router.route('/password-reset').patch(adminCtrl.passwordResetMailSent);
router.route('/password-reset-verify/:email/:otp').patch(adminCtrl.passwordResetMailVerify);

export default router;
