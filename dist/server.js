"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _db = _interopRequireDefault(require("../src/config/db.js"));
var _properties = _interopRequireDefault(require("../src/config/properties.js"));
var _ProductsRoute = _interopRequireDefault(require("../src/api/routes/ProductsRoute.js"));
var _adminsRoute = _interopRequireDefault(require("../src/api/routes/adminsRoute.js"));
var _odderRoute = _interopRequireDefault(require("../src/api/routes/odderRoute.js"));
var _bannerRoute = _interopRequireDefault(require("../src/api/routes/bannerRoute.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var port = _properties["default"].PORT;

// connecting to database
(0, _db["default"])(_properties["default"].MONGO_URI);
var allowed_origins = ["http://localhost:3001", "http://localhost:3000", "http://localhost:3002", "https://localhost:3001", "https://localhost:3002", "http://localhost:5173", "http://127.0.0.1:5173", process.env.NEW_ALLOWED_ORIGINS, "chrome-extension://pddljdmihkpdfpkgmbhdomeeifpklgnm"];
// express config
var app = (0, _express["default"])();
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: function origin(_origin, callback) {
    if (allowed_origins.indexOf(_origin) !== -1) {
      callback(null, _origin);
    } else if (!_origin) {
      callback(null, true);
    } else {
      callback(new Error("".concat(_origin, ": Not allowed by CORS")));
    }
  },
  credentials: true
}));
try {
  app.use("/static", _express["default"]["static"]("static"));
} catch (error) {
  console.log(error);
}
app.use("/api/v1/product", _ProductsRoute["default"]);
app.use("/admin", _adminsRoute["default"]);
app.use("/odder", _odderRoute["default"]);
app.use("/banner", _bannerRoute["default"]);
app.get("/", function (req, res) {
  return res.send("<h1>Running on Port : ".concat(port, "</h1>"));
});
app.listen(port, function () {
  console.log("Open in Browser : ".concat(port));
});