const express = require("express");
const router = express.Router();
const UserControler = require("../../controllers/user.controler.js");

router.post("/signUp", UserControler.createUser);
router.get("/:email", UserControler.getUser);

module.exports = router;
