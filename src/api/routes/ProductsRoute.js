import express from 'express';
import ProductCtrl from '../controllers/productCtrl.js';

const router = express.Router();

const productCtrl = new ProductCtrl();

router.route('/addProduct').post(productCtrl.addProduct);
router.route('/deleteProduct/:productId').delete(productCtrl.deleteProducts);
router.route('/fetchProducts').get(productCtrl.getProducts);
<<<<<<< HEAD
router.route('/singleProduct/:productId').get(productCtrl.getSingleProducts);
=======
router.route('/singleProduct/:id').get(productCtrl.getSingleProducts);
>>>>>>> 28a8fcd9208578bd89b1f5fee0d7d401d7c1db89

export default router;
