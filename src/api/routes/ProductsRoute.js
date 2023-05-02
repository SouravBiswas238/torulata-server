import express from 'express';
import ProductCtrl from '../controllers/productCtrl.js';

const router = express.Router();

const productCtrl = new ProductCtrl();

router.route('/addProduct').post(productCtrl.addProduct);
router.route('/getProducts').post(productCtrl.getPrducts);

export default router;
