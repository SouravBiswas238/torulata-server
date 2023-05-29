"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var productSchema = new _mongoose["default"].Schema({
  product_title: {
    type: String,
    required: true
  },
  product_images: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  product_info: {
    product_details: {
      type: String,
      required: true
    },
    product_care: {
      type: String,
      required: true
    },
    product_care_video: {
      type: String,
      required: false
    }
  },
  product_category: {
    type: [String],
    // update to accept an array of strings
    required: true
  },
  product_tags_english: {
    type: [Object],
    required: true
  },
  product_tags_bangla: {
    type: [Object],
    required: true
  },
  product_discount: {
    type: Number,
    required: false
  }
});
var Product = _mongoose["default"].model("Product", productSchema);
var _default = Product;
exports["default"] = _default;