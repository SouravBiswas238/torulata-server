import express from 'express';
import ProductCtrl from '../controllers/productCtrl.js';

const router = express.Router();

const productCtrl = new ProductCtrl();

router.route('/addProduct').post(productCtrl.addProduct);
router.route('/updateProduct/:productId').put(productCtrl.updateProduct);
router.route('/deleteProduct/:productId').delete(productCtrl.deleteProducts);
router.route('/fetchProducts').get(productCtrl.getProducts);
router.route('/findManyById/:productArr').get(productCtrl.findManyById);

router.route('/get-search-product/search').get(productCtrl.getSearchProduct);

router.route('/singleProduct/:productId').get(productCtrl.getSingleProducts);
router.route('/getSearchProduct/:search').get(productCtrl.getSearchProduct);



export default router;
