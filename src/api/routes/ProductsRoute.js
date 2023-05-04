import express from 'express';
import ProductCtrl from '../controllers/productCtrl.js';

const router = express.Router();

const productCtrl = new ProductCtrl();

router.route('/addProduct').post(productCtrl.addProduct);
router.route('/deleteProduct').delete(productCtrl.deleteProducts);
router.route('/fetchProducts').get(productCtrl.getProducts);

export default router;
