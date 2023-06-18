"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _productCtrl = _interopRequireDefault(require("../controllers/productCtrl.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var productCtrl = new _productCtrl["default"]();
router.route('/addProduct').post(productCtrl.addProduct);
router.route('/updateProduct/:productId').put(productCtrl.updateProduct);
router.route('/deleteProduct/:productId')["delete"](productCtrl.deleteProducts);
router.route('/fetchProducts').get(productCtrl.getProducts);
router.route('/findManyById/:productArr').get(productCtrl.findManyById);
router.route('/findByProductCategory').get(productCtrl.findProductBiCategory);
router.route('/get-search-product/search').get(productCtrl.getSearchProduct);
router.route('/singleProduct/:productId').get(productCtrl.getSingleProducts);
router.route('/getSearchProduct/:search').get(productCtrl.getSearchProduct);
var _default = router;
exports["default"] = _default;