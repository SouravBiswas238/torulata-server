import express from 'express'
import bannerCtrl from '../controllers/bannerCtrl.js';

const router = express.Router();

router.route('/add').post(bannerCtrl.addBanner);
router.route('/').get(bannerCtrl.getAllBanner);
router.route('/delete/:_id').delete(bannerCtrl.deleteBanner);

export default router;
