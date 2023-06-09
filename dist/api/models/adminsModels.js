"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var adminsSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isVerify: {
    type: Boolean,
    "default": false
  },
  mailVerifyHash: {
    type: String,
    "default": null
  },
  resetPasswordOTP: {
    type: Number,
    "default": null
  },
  passwordRest: {
    type: Boolean,
    "default": false
  },
  isAdmin: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var admin = _mongoose["default"].model("admin", adminsSchema);
var _default = admin;
exports["default"] = _default;