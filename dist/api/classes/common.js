"use strict";

exports.checkValidEmail = function (email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};