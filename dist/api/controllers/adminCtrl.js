"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _adminsModels = _interopRequireDefault(require("../models/adminsModels.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _crypto = _interopRequireDefault(require("crypto"));
var _sentEmail = _interopRequireDefault(require("../../uttils/sentEmail.js"));
var _generateOTP = _interopRequireDefault(require("../../uttils/generateOTP.js"));
var _verifyMailFormate = _interopRequireDefault(require("../../uttils/verifyMailFormate.js"));
var _resetMailFormate = _interopRequireDefault(require("../../uttils/resetMailFormate.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // import createHash from "../../hooks/createHash.js";
var saltRounds = 10;
var adminCtrl = {};

//API : /admin/register
//Method : POST
//Access : access with admin approval
//Description : reg admin api
adminCtrl.rgeAdmin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var bodyObject, _req$body, _req$body2, _req$body3, hash, mailVerifyHash, name, email, rgeData, newAdmin, userAlreadyExist;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          bodyObject = Object.keys(req.body);
          bodyObject.forEach(function (singleKey) {
            if (!req.body[singleKey]) {
              return res.status(400).json({
                "success": false,
                "message": "Invalid input!"
              });
            }
          });
          _context.prev = 2;
          _context.next = 5;
          return _bcrypt["default"].hash(req === null || req === void 0 ? void 0 : (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.password, saltRounds);
        case 5:
          hash = _context.sent;
          mailVerifyHash = _crypto["default"].randomBytes(64).toString('hex'); // sent data database object model
          name = req === null || req === void 0 ? void 0 : (_req$body2 = req.body) === null || _req$body2 === void 0 ? void 0 : _req$body2.name;
          email = req === null || req === void 0 ? void 0 : (_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.email;
          rgeData = {
            name: name,
            email: email,
            password: hash,
            mailVerifyHash: mailVerifyHash
          };
          _context.next = 12;
          return _adminsModels["default"].create(rgeData);
        case 12:
          newAdmin = _context.sent;
          _context.next = 15;
          return _adminsModels["default"].findOneAndUpdate({
            email: email
          }, {
            resetPasswordOTP: null,
            isVerify: false,
            passwordRest: false,
            isAdmin: false
          });
        case 15:
          _context.next = 17;
          return (0, _sentEmail["default"])(email, (0, _verifyMailFormate["default"])(mailVerifyHash));
        case 17:
          return _context.abrupt("return", res.status(200).json({
            "success": true,
            "message": "registration successful",
            "adminId": newAdmin._id
          }));
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](2);
          console.log(_context.t0.message);
          userAlreadyExist = _context.t0.message.includes("email_1 dup key");
          if (!userAlreadyExist) {
            _context.next = 26;
            break;
          }
          return _context.abrupt("return", res.status(409).json({
            "success": false,
            "message": "Admin already exist"
          }));
        case 26:
          return _context.abrupt("return", res.status(500).json({
            "success": false,
            "message": "internal server error  t!"
          }));
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 20]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//API : /admin/login
//Method : Get
//Access : no access needed
//Description : login admin
adminCtrl.loginAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _ref3, email, password, adminData, _ref4, adminEmail, adminPasswordHash, isVerify, name, isAdmin, checkPassword, jwtToken;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _ref3 = (req === null || req === void 0 ? void 0 : req.body) || {}, email = _ref3.email, password = _ref3.password;
          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            "success": false,
            "message": "Invalid input!"
          }));
        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return _adminsModels["default"].findOne({
            email: email
          });
        case 6:
          adminData = _context2.sent;
          _ref4 = adminData || {}, adminEmail = _ref4.email, adminPasswordHash = _ref4.password, isVerify = _ref4.isVerify, name = _ref4.name, isAdmin = _ref4.isAdmin;
          if (!(adminPasswordHash === null || adminPasswordHash === undefined)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            "success": false,
            "message": "admin not exit"
          }));
        case 10:
          if (isVerify) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            "success": false,
            "message": "Email not verify"
          }));
        case 12:
          if (isAdmin) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            "success": false,
            "message": "No admin access"
          }));
        case 14:
          _context2.next = 16;
          return _bcrypt["default"].compare(password, adminPasswordHash);
        case 16:
          checkPassword = _context2.sent;
          if (!checkPassword) {
            _context2.next = 24;
            break;
          }
          _context2.next = 20;
          return _jsonwebtoken["default"].sign({
            email: adminEmail
          }, process.env.SECRET_HASH, {
            expiresIn: 60 * 60
          });
        case 20:
          jwtToken = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            "success": true,
            "message": "Login Successful",
            "result": {
              "accessToken": jwtToken,
              "name": name,
              "email": adminEmail
            }
          }));
        case 24:
          return _context2.abrupt("return", res.status(401).json({
            "success": false,
            "message": "Wrong password!"
          }));
        case 25:
          _context2.next = 31;
          break;
        case 27:
          _context2.prev = 27;
          _context2.t0 = _context2["catch"](3);
          console.log("login admin", _context2.t0.message);
          return _context2.abrupt("return", res.status(500).json({
            "success": false,
            "message": "internal server error!"
          }));
        case 31:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 27]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

//API : /admin/login/access
//Method : PUT
//Access : admin access needed
//Description : give admin login permission
adminCtrl.giveAdminAccess = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _ref6, email, _ref7, _email, options, find, updateData, skipData, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _ref6 = (req === null || req === void 0 ? void 0 : req.body) || {}, email = _ref6.email;
          if (email) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            "success": false,
            "message": "Invalid input!"
          }));
        case 3:
          _context3.prev = 3;
          _ref7 = (req === null || req === void 0 ? void 0 : req.body) || {}, _email = _ref7.email;
          options = {
            "new": true
          };
          find = {
            email: _email
          };
          updateData = {
            isAdmin: true
          };
          skipData = {
            password: 0,
            date: 0,
            __v: 0,
            _id: 0
          };
          _context3.next = 11;
          return _adminsModels["default"].findOneAndUpdate(find, updateData, options).select(skipData);
        case 11:
          result = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            "success": true,
            "message": "Make admin successfully!",
            result: result
          }));
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](3);
          console.log("give admin login permission", _context3.t0.message);
          return _context3.abrupt("return", res.status(500).json({
            "success": false,
            "message": "internal server error!"
          }));
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 15]]);
  }));
  return function (_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

//API : /admin/remove
//Method : DELETE
//Access : admin access needed
//Description : delete admin 
adminCtrl.removeAdmin = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _ref9, email, _ref10, _email2, find, result, _ref11, acknowledged, deletedCount;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _ref9 = (req === null || req === void 0 ? void 0 : req.body) || {}, email = _ref9.email;
          if (email) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            "success": false,
            "message": "Invalid input!"
          }));
        case 3:
          _context4.prev = 3;
          _ref10 = (req === null || req === void 0 ? void 0 : req.body) || {}, _email2 = _ref10.email;
          find = {
            email: _email2
          };
          _context4.next = 8;
          return _adminsModels["default"].deleteOne(find);
        case 8:
          result = _context4.sent;
          _ref11 = result || {}, acknowledged = _ref11.acknowledged, deletedCount = _ref11.deletedCount;
          if (!(acknowledged && deletedCount)) {
            _context4.next = 12;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            "success": true,
            "message": "delete admin successful!",
            result: result
          }));
        case 12:
          return _context4.abrupt("return", res.status(404).json({
            "success": false,
            "message": "admin not exit!"
          }));
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](3);
          console.log("remove admin", _context4.t0.message);
          return _context4.abrupt("return", res.status(500).json({
            "success": false,
            "message": "internal server error!"
          }));
        case 19:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 15]]);
  }));
  return function (_x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}();

//API : /admin/email-verify
//Method : patch
//Access : no access needed
//Description : email verify 
adminCtrl.verifyEmail = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$params;
    var mailVerifyHash, query, updateData, skipDataInResult, emailVerifyResult;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          mailVerifyHash = req === null || req === void 0 ? void 0 : (_req$params = req.params) === null || _req$params === void 0 ? void 0 : _req$params.hash;
          console.log("emailVerifyHash", mailVerifyHash);
          _context5.prev = 2;
          query = {
            mailVerifyHash: mailVerifyHash
          };
          updateData = {
            isVerify: true,
            mailVerifyHash: ""
          };
          skipDataInResult = {
            _id: 0,
            email: 0,
            password: 0,
            mailVerifyHash: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0
          };
          _context5.next = 8;
          return _adminsModels["default"].findOneAndUpdate(query, updateData, {
            "new": true
          }).select(skipDataInResult);
        case 8:
          emailVerifyResult = _context5.sent;
          if (!(emailVerifyResult !== null)) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            "success": true,
            "message": "Email verify successful",
            result: emailVerifyResult
          }));
        case 13:
          return _context5.abrupt("return", res.status(404).json({
            "success": false,
            "message": "Op's Email verify failed!"
          }));
        case 14:
          _context5.next = 20;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](2);
          console.log("email-verify", _context5.t0.message);
          return _context5.abrupt("return", res.status(500).json({
            "success": false,
            "message": "internal server error!"
          }));
        case 20:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 16]]);
  }));
  return function (_x9, _x10) {
    return _ref12.apply(this, arguments);
  };
}();

//API : /admin/password-reset-mail-sent
//Method : patch
//Access : no access needed
//Description : password reset email sent
adminCtrl.passwordResetMailSent = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body4, resetPassEmail, OTP, find, resetPasswordOTP, options, result;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          resetPassEmail = req === null || req === void 0 ? void 0 : (_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.email;
          console.log(resetPassEmail);

          // generate Otp 
          OTP = Number((0, _generateOTP["default"])());
          find = {
            email: resetPassEmail
          };
          resetPasswordOTP = {
            resetPasswordOTP: OTP
          };
          options = {
            "new": true
          }; // check valid admin  
          _context7.next = 9;
          return _adminsModels["default"].findOneAndUpdate(find, resetPasswordOTP, options);
        case 9:
          result = _context7.sent;
          if (!(result !== null)) {
            _context7.next = 15;
            break;
          }
          _context7.next = 13;
          return (0, _sentEmail["default"])(resetPassEmail, (0, _resetMailFormate["default"])(OTP));
        case 13:
          // password validity time 5 minute
          setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return _adminsModels["default"].findOneAndUpdate(find, {
                    resetPasswordOTP: null
                  });
                case 2:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          })), 300000);
          return _context7.abrupt("return", res.status(200).json({
            "success": true,
            "message": "Reset mail sent",
            "exp": "5 minute"
          }));
        case 15:
          return _context7.abrupt("return", res.status(404).json({
            "success": false,
            "message": "Wrong email try again"
          }));
        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          console.log("password reset || ", _context7.t0.message);
          return _context7.abrupt("return", res.status(500).json({
            "success": false,
            "message": "internal server error!"
          }));
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return function (_x11, _x12) {
    return _ref13.apply(this, arguments);
  };
}();

//API : /admin/password-reset-mail-verify
//Method : patch
//Access : no access needed
//Description : password reset email verify
adminCtrl.passwordResetMailVerify = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _ref16, email, otp, findAdmin;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _ref16 = (req === null || req === void 0 ? void 0 : req.params) || {}, email = _ref16.email, otp = _ref16.otp;
          _context8.next = 4;
          return _adminsModels["default"].findOne({
            email: email
          });
        case 4:
          findAdmin = _context8.sent;
          console.log(findAdmin);
          if (!(findAdmin !== null && otp == (findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.resetPasswordOTP))) {
            _context8.next = 12;
            break;
          }
          _context8.next = 9;
          return _adminsModels["default"].findOneAndUpdate({
            email: email
          }, {
            resetPasswordOTP: null,
            passwordRest: true
          });
        case 9:
          return _context8.abrupt("return", res.status(200).json({
            "success": true,
            "message": "otp is valid",
            "email": email
          }));
        case 12:
          return _context8.abrupt("return", res.status(404).json({
            "success": false,
            "message": "OTP time expired"
          }));
        case 13:
          return _context8.abrupt("return", res.status(404).json({
            "success": false,
            "message": "something wrong"
          }));
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          console.log("otp verify || ", _context8.t0.message);
          return _context8.abrupt("return", res.status(500).json({
            "success": false,
            "message": "internal server error!"
          }));
        case 20:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 16]]);
  }));
  return function (_x13, _x14) {
    return _ref15.apply(this, arguments);
  };
}();

//API : /admin/password-update
//Method : patch
//Access : no access needed
//Description : password update
adminCtrl.passwordUpdate = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var _req$body5, password, email, hash, findAdmin;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$body5 = req === null || req === void 0 ? void 0 : req.body, password = _req$body5.password, email = _req$body5.email;
          _context9.next = 4;
          return _bcrypt["default"].hash(password, saltRounds);
        case 4:
          hash = _context9.sent;
          _context9.next = 7;
          return _adminsModels["default"].findOne({
            email: email
          });
        case 7:
          findAdmin = _context9.sent;
          if (!(findAdmin !== null && findAdmin !== null && findAdmin !== void 0 && findAdmin.passwordRest)) {
            _context9.next = 12;
            break;
          }
          _context9.next = 11;
          return _adminsModels["default"].findOneAndUpdate({
            email: email
          }, {
            password: hash,
            passwordRest: false
          });
        case 11:
          return _context9.abrupt("return", res.status(200).json({
            "success": true,
            "message": "update password successful"
          }));
        case 12:
          return _context9.abrupt("return", res.status(500).json({
            "success": false,
            "message": "smutting is wrong"
          }));
        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", res.status(500).json({
            "success": false,
            "message": "internal server error!"
          }));
        case 18:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 15]]);
  }));
  return function (_x15, _x16) {
    return _ref17.apply(this, arguments);
  };
}();
var _default = adminCtrl;
exports["default"] = _default;