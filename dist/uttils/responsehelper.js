"use strict";

exports.OK = function (res, data, message) {
  var status = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  res.status(200).json({
    status: status,
    message: message || "OK",
    data: data
  });
};
exports.ERROR = function (res, data, message) {
  var status = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  res.status(500).json({
    status: status,
    message: message || "Internal Server Error",
    data: data
  });
};