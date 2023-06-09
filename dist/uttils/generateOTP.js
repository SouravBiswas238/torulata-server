"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var generateOTP = function generateOTP() {
  var min = 100000;
  var max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var _default = generateOTP;
exports["default"] = _default;