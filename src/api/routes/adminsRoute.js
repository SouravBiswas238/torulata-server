import express from 'express';
import adminCtrl from '../controllers/adminCtrl.js';
import jwtVerify from '../../uttils/jwtVerify.js';

const router = express.Router();

router.route('/login').get(adminCtrl.loginAdmin);
router.route('/register').post(adminCtrl.rgeAdmin);
router.route('/remove').delete(jwtVerify, adminCtrl.removeAdmin);
router.route('/email-verify/:hash').patch(adminCtrl.verifyEmail);
router.route('/password-update').patch(adminCtrl.passwordUpdate);
router.route('/give-admin-access').patch(adminCtrl.giveAdminAccess);
router.route('/password-reset-mail-sent').patch(adminCtrl.passwordResetMailSent);
router.route('/password-reset-mail-verify/:email/:otp').patch(adminCtrl.passwordResetMailVerify);

export default router;
