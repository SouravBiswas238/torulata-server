"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _odderCtrl = _interopRequireDefault(require("../controllers/odderCtrl.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/new-odder').post(_odderCtrl["default"].addNewOdder);
router.route('/').get(_odderCtrl["default"].getAllOdder);
var _default = router;
exports["default"] = _default;