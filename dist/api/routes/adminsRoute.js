"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminCtrl = _interopRequireDefault(require("../controllers/adminCtrl.js"));
var _jwtVerify = _interopRequireDefault(require("../../uttils/jwtVerify.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/login').patch(_adminCtrl["default"].loginAdmin);
router.route('/register').post(_adminCtrl["default"].rgeAdmin);
router.route('/remove')["delete"](_jwtVerify["default"], _adminCtrl["default"].removeAdmin);
router.route('/email-verify/:hash').patch(_adminCtrl["default"].verifyEmail);
router.route('/password-update').patch(_adminCtrl["default"].passwordUpdate);
router.route('/give-admin-access').patch(_adminCtrl["default"].giveAdminAccess);
router.route('/password-reset').patch(_adminCtrl["default"].passwordResetMailSent);
router.route('/password-reset-verify/:email/:otp').patch(_adminCtrl["default"].passwordResetMailVerify);
var _default = router;
exports["default"] = _default;