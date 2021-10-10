const express = require("express");
const router = express.Router();
const userApi = require("./user.api");

// user apis
router.use("/user", userApi);

module.exports = router;
