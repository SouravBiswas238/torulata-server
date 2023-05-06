import express from 'express';
import adminCtrl from '../controllers/adminCtrl.js';

const router = express.Router();

router.route('/register').post(adminCtrl.rgeAdmin);

export default router;
