import express from 'express';
import ProductCtrl from '../controllers/productCtrl.js';

const router = express.Router();

const productCtrl = new ProductCtrl();
router.route('/addProduct').post(productCtrl.addProduct);
router.route('/updateProduct/:productId').put(productCtrl.updateProduct);
router.route('/deleteProduct/:productId').delete(productCtrl.deleteProducts);
router.route('/fetchProducts').get(productCtrl.getProducts);
router.route('/related-product').get(productCtrl.getRelatedProduct);
router.route('/findManyById/:productArr').get(productCtrl.findManyById);
router.route('/findByProductCategory').get(productCtrl.findProductBiCategory);
router.route('/singleProduct/:productId').get(productCtrl.getSingleProducts);
router.route('/get-search-product/search').get(productCtrl.getSearchProduct);
// give a review
router.route('/addReview/:productId').put(productCtrl.addReviewSingleProduct);




export default router;
