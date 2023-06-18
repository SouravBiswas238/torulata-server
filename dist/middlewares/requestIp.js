"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestIp = void 0;
var _geoipLite = _interopRequireDefault(require("geoip-lite"));
var _useragent = _interopRequireDefault(require("useragent"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var requestIp = function requestIp(req, res, next) {
  var ip = req.clientIp;
  var geo = _geoipLite["default"].lookup(ip);
  var agent = _useragent["default"].parse(req.headers['user-agent']);
  req.ipAddress = ip;
  req.deviceName = agent.device.toString();
  req.location = geo;
  next();
};
exports.requestIp = requestIp;