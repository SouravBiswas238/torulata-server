"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var properties = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://torulota:Jl4N2Nyy2OZzNCPA@cluster0.ds6trld.mongodb.net/test",
  SERVER_URL: process.env.SERVER_URL || ""
};
var _default = properties;
exports["default"] = _default;