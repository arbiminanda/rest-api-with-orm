const express = require("express");
const router = express.Router();
const UserController = require("../../controller/users/users");

router.post("/register", UserController.createNewUser);

module.exports = router;
