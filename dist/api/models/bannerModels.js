"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var bannerSchema = new _mongoose["default"].Schema({
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var banner = _mongoose["default"].model("banner", bannerSchema);
var _default = banner;
exports["default"] = _default;