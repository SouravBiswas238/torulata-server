"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bannerCtrl = _interopRequireDefault(require("../controllers/bannerCtrl.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/add').post(_bannerCtrl["default"].addBanner);
router.route('/').get(_bannerCtrl["default"].getAllBanner);
router.route('/delete/:_id')["delete"](_bannerCtrl["default"].deleteBanner);
var _default = router;
exports["default"] = _default;