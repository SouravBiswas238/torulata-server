import express from 'express';
import ProductCtrl from '../controllers/productCtrl.js';

const router = express.Router();

const productCtrl = new ProductCtrl();

router.route('/addProduct').post(productCtrl.addProduct);
router.route('/deleteProduct/:productId').delete(productCtrl.deleteProducts);
router.route('/fetchProducts').get(productCtrl.getProducts);
router.route('/singleProduct/:id').get(productCtrl.getSingleProducts);
router.route('/getSearchProduct/search').get(productCtrl.getSearchProduct);

export default router;
