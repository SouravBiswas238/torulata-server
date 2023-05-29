"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var odderSchema = new _mongoose["default"].Schema({
  address: {
    name: {
      type: String
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    ipAddress: String,
    deviceName: String,
    location: String
  },
  products: [{
    quantity: Number,
    totalPrice: Number,
    _id: String,
    product_title: String,
    product_images: String,
    product_price: Number
  }],
  order_status: {
    type: String,
    "default": "panging"
  }
}, {
  timestamps: true
});
var Odder = _mongoose["default"].model("odder", odderSchema);
var _default = Odder;
exports["default"] = _default;